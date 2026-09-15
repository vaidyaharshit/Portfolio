/* ==========================================================================
   GITHUB SERVICE — API Layer with Caching, Dedupe & Graceful Degradation
   ========================================================================== */

const GITHUB_USERNAME = 'vaidyaharshit';
const BASE_URL = 'https://api.github.com';

const CACHE_VERSION = 'v2';
const CACHE_KEY_PREFIX = `gh_${CACHE_VERSION}_`;
const COOLDOWN_KEY = `gh_${CACHE_VERSION}_cooldown_until`;

/* Profile & repos change slowly -> long TTL. Events change often -> short TTL. */
const FRESH_TTL_PRIMARY = 30 * 60 * 1000; /* 30 min */
const FRESH_TTL_EVENTS = 5 * 60 * 1000;   /* 5 min */

/* After a failure, wait before touching the network again (prevents spam). */
const DEFAULT_COOLDOWN_MS = 2 * 60 * 1000;       /* transient failures */
const RATE_LIMIT_COOLDOWN_MS = 10 * 60 * 1000;   /* rate-limited */
const MAX_COOLDOWN_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;

let inflight = null;

/* ---------------------------- storage helpers ---------------------------- */
function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function getCached(key, ttl) {
  const raw = storageGet(CACHE_KEY_PREFIX + key);
  if (!raw) return null;
  try {
    const { data, ts } = JSON.parse(raw);
    if (!data || typeof ts !== 'number') return null;
    if (Date.now() - ts > ttl) return null;
    return data;
  } catch { return null; }
}

function setCached(key, data) {
  storageSet(CACHE_KEY_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
}

/* ------------------------------- cooldown -------------------------------- */
export function getCooldownRemainingMs() {
  const until = parseInt(storageGet(COOLDOWN_KEY) || '0', 10);
  if (isNaN(until)) return 0;
  return Math.max(until - Date.now(), 0);
}

function setCooldown(ms) {
  storageSet(COOLDOWN_KEY, String(Date.now() + Math.min(ms, MAX_COOLDOWN_MS)));
}

function clearCooldown() {
  try { localStorage.removeItem(COOLDOWN_KEY); } catch {}
}

/* ------------------------------ fetch core ------------------------------- */
async function fetchJSON(url) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (typeof window !== 'undefined' && window.GITHUB_TOKEN) {
    headers['Authorization'] = 'Bearer ' + window.GITHUB_TOKEN;
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS) : null;

  try {
    const res = await fetch(url, { headers, signal: controller ? controller.signal : undefined });

    if (res.status === 403 || res.status === 429) {
      const reset = res.headers.get('X-RateLimit-Reset');
      let waitMs = RATE_LIMIT_COOLDOWN_MS;
      if (reset) {
        const parsed = parseInt(reset, 10) * 1000 - Date.now();
        if (!isNaN(parsed)) waitMs = parsed;
      }
      const err = new Error('RATE_LIMITED');
      err.code = 'RATE_LIMITED';
      err.cooldownMs = Math.min(Math.max(waitMs, RATE_LIMIT_COOLDOWN_MS), MAX_COOLDOWN_MS);
      throw err;
    }
    if (!res.ok) {
      const err = new Error('HTTP_' + res.status);
      err.code = 'HTTP_' + res.status;
      throw err;
    }
    return await res.json();
  } catch (e) {
    if (e && e.code) throw e;
    const err = new Error('NETWORK');
    err.code = 'NETWORK';
    throw err;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/* ------------------------------- endpoints ------------------------------- */
async function fetchProfile() {
  const cached = getCached('profile', FRESH_TTL_PRIMARY);
  if (cached) return cached;
  const data = await fetchJSON(`${BASE_URL}/users/${GITHUB_USERNAME}`);
  const profile = {
    name: data.name || data.login,
    username: data.login,
    avatar: data.avatar_url,
    bio: data.bio || '',
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    url: data.html_url,
  };
  setCached('profile', profile);
  return profile;
}

async function fetchRepositories() {
  const cached = getCached('repos', FRESH_TTL_PRIMARY);
  if (cached) return cached;
  let repos = [];
  let page = 1;
  while (true) {
    const batch = await fetchJSON(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`);
    repos = repos.concat(batch);
    if (!Array.isArray(batch) || batch.length < 100) break;
    page++;
    if (page > 5) break;
  }
  setCached('repos', repos);
  return repos;
}

async function fetchEvents() {
  const cached = getCached('events', FRESH_TTL_EVENTS);
  if (cached) return cached;
  let events = [];
  let page = 1;
  while (page <= 5) {
    let batch;
    try {
      batch = await fetchJSON(`${BASE_URL}/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`);
    } catch (err) {
      /* First page failing means we have no real data — propagate.
         Later pages failing keeps the partial real data we already have. */
      if (page === 1) throw err;
      break;
    }
    events = events.concat(batch);
    if (!Array.isArray(batch) || batch.length < 100) break;
    page++;
  }
  setCached('events', events);
  return events;
}

/* ------------------------------- derived --------------------------------- */
function calculateLanguages(repos) {
  const langMap = {};
  repos.forEach(r => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
  });
  const sorted = Object.entries(langMap).sort((a, b) => b[1] - a[1]);
  return {
    total: sorted.length,
    primary: sorted.slice(0, 6).map(([name, count]) => ({ name, count })),
  };
}

function calculateContributions(events) {
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  const totalPushes = pushEvents.reduce((sum, e) => sum + (e.payload.commits ? e.payload.commits.length : 0), 0);
  const commitsFromOtherEvents = events.filter(e =>
    e.type === 'CreateEvent' || e.type === 'DeleteEvent'
  ).length;
  return totalPushes + commitsFromOtherEvents;
}

function buildContributionCalendar(events, year) {
  const now = new Date();
  const targetYear = year || now.getFullYear();
  const startDate = new Date(targetYear, 0, 1);
  const endDate = targetYear === now.getFullYear() ? now : new Date(targetYear, 11, 31);

  const dayMap = {};
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  pushEvents.forEach(e => {
    const d = new Date(e.created_at);
    if (d.getFullYear() === targetYear) {
      const key = d.toISOString().slice(0, 10);
      const count = e.payload.commits ? e.payload.commits.length : 0;
      dayMap[key] = (dayMap[key] || 0) + count;
    }
  });

  events.filter(e => e.type === 'CreateEvent' || e.type === 'DeleteEvent').forEach(e => {
    const d = new Date(e.created_at);
    if (d.getFullYear() === targetYear) {
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = (dayMap[key] || 0) + 1;
    }
  });

  const weeks = [];
  let currentWeek = [];
  const dayOfWeek = startDate.getDay();
  for (let i = 0; i < dayOfWeek; i++) {
    currentWeek.push(null);
  }

  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    const key = cursor.toISOString().slice(0, 10);
    currentWeek.push({
      date: key,
      count: dayMap[key] || 0,
      dateObj: new Date(cursor),
    });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const totalContributions = Object.values(dayMap).reduce((s, v) => s + v, 0);
  return { weeks, totalContributions, year: targetYear };
}

function getAvailableYears(events) {
  const years = new Set();
  events.forEach(e => {
    years.add(new Date(e.created_at).getFullYear());
  });
  years.add(new Date().getFullYear());
  return Array.from(years).sort((a, b) => b - a);
}

/* ------------------------------ public API ------------------------------- */
/**
 * Fetches all GitHub data. Never fabricates data: on failure it throws and
 * starts a cooldown so repeated calls don't hammer the API.
 * @param {{ force?: boolean }} [options] force bypasses an active cooldown
 *   (used only by an explicit user action such as the Retry button).
 */
export async function fetchAll(options = {}) {
  const force = !!(options && options.force);

  if (!force && getCooldownRemainingMs() > 0) {
    const err = new Error('COOLDOWN_ACTIVE');
    err.code = 'COOLDOWN';
    err.cooldownMs = getCooldownRemainingMs();
    throw err;
  }

  /* Dedupe concurrent calls into a single network round-trip. */
  if (inflight && !force) return inflight;

  const task = (async () => {
    try {
      const [profile, repos, events] = await Promise.all([
        fetchProfile(),
        fetchRepositories(),
        fetchEvents(),
      ]);
      clearCooldown();
      const languages = calculateLanguages(repos);
      const contributions = calculateContributions(events);
      const calendar = buildContributionCalendar(events);
      const availableYears = getAvailableYears(events);
      return { profile, repos, events, languages, contributions, calendar, availableYears };
    } catch (err) {
      setCooldown((err && err.cooldownMs) || DEFAULT_COOLDOWN_MS);
      throw err;
    }
  })();

  inflight = task;
  try {
    return await task;
  } finally {
    if (inflight === task) inflight = null;
  }
}

export { buildContributionCalendar, getAvailableYears, GITHUB_USERNAME };

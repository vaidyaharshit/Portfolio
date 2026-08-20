/* ==========================================================================
   GITHUB SERVICE — API Layer with Caching & Rate-Limit Handling
   ========================================================================== */

var GitHubService = (() => {
  const GITHUB_USERNAME = 'vaidyaharshit';
  const BASE_URL = 'https://api.github.com';
  const CACHE_KEY_PREFIX = 'gh_cache_';
  const CACHE_TTL = 5 * 60 * 1000;

  function getCached(key) {
    try {
      const raw = localStorage.getItem(CACHE_KEY_PREFIX + key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) {
        localStorage.removeItem(CACHE_KEY_PREFIX + key);
        return null;
      }
      return data;
    } catch { return null; }
  }

  function setCache(key, data) {
    try {
      localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
    } catch {}
  }

  async function fetchJSON(url) {
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    const token = typeof GITHUB_TOKEN !== 'undefined' ? GITHUB_TOKEN : null;
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const res = await fetch(url, { headers });
    if (res.status === 403) {
      const reset = res.headers.get('X-RateLimit-Reset');
      const waitMs = reset ? (parseInt(reset) * 1000 - Date.now()) : 60000;
      throw new Error('RATE_LIMITED:' + Math.max(waitMs, 0));
    }
    if (!res.ok) throw new Error('HTTP_' + res.status);
    return res.json();
  }

  async function fetchProfile() {
    const cached = getCached('profile');
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
    setCache('profile', profile);
    return profile;
  }

  async function fetchRepositories() {
    const cached = getCached('repos');
    if (cached) return cached;
    let repos = [];
    let page = 1;
    while (true) {
      const batch = await fetchJSON(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`);
      repos = repos.concat(batch);
      if (batch.length < 100) break;
      page++;
      if (page > 5) break;
    }
    setCache('repos', repos);
    return repos;
  }

  async function fetchEvents() {
    const cached = getCached('events');
    if (cached) return cached;
    let events = [];
    let page = 1;
    while (page <= 5) {
      try {
        const batch = await fetchJSON(`${BASE_URL}/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`);
        events = events.concat(batch);
        if (batch.length < 100) break;
        page++;
      } catch {
        break;
      }
    }
    setCache('events', events);
    return events;
  }

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

  async function fetchAll() {
    const [profile, repos, events] = await Promise.all([
      fetchProfile(),
      fetchRepositories(),
      fetchEvents(),
    ]);
    const languages = calculateLanguages(repos);
    const contributions = calculateContributions(events);
    const calendar = buildContributionCalendar(events);
    const availableYears = getAvailableYears(events);
    return { profile, repos, events, languages, contributions, calendar, availableYears };
  }

  return {
    GITHUB_USERNAME,
    fetchAll,
    fetchProfile,
    fetchRepositories,
    fetchEvents,
    calculateLanguages,
    calculateContributions,
    buildContributionCalendar,
    getAvailableYears,
  };
})();

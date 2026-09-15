import { icons } from '../components/icons.js';

export function renderGitHub() {
  return `
    <section id="building-public" class="section github-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">[ FILE_07 ]</span>
          <span class="section-index">07 / BUILDING IN PUBLIC</span>
          <h2 class="section-title">Building in <span class="text-gradient">Public</span></h2>
          <p class="section-sub">Tracking code contributions, projects, and continuous learning journey on GitHub.</p>
        </div>

        <div class="github-container glass-card reveal-item" id="githubContainer">
          <div class="github-loading" id="githubLoading">
            <div class="github-loading-scan"></div>
            <div class="github-loading-icon">${icons.ghLogo}</div>
            <div class="github-loading-text">RETRIEVING GITHUB DATA<span class="github-loading-dots">...</span></div>
            <div class="github-loading-bar"><div class="github-loading-bar-fill"></div></div>
          </div>

          <div class="github-fallback" id="githubFallback" style="display:none;">
            <div class="fallback-scanline"></div>
            <span class="fallback-tag">[ SIGNAL INTERRUPTED ]</span>
            <div class="fallback-icon">${icons.satellite}</div>
            <h3 class="fallback-title">Live feed reconnecting</h3>
            <p class="fallback-text">
              This dossier syncs directly with GitHub, and the live metrics are momentarily
              out of reach. The full mission log stays open — explore it on GitHub anytime.
            </p>
            <div class="fallback-actions">
              <a href="https://github.com/vaidyaharshit" target="_blank" rel="noopener" class="btn btn-glow btn-sm">
                <span>View GitHub Profile</span>
                ${icons.externalLinkLarge}
              </a>
              <button class="btn btn-outline btn-sm" id="githubRetryBtn">
                ${icons.refresh}
                <span>Retry Sync</span>
              </button>
            </div>
          </div>

          <div class="github-data" id="githubData" style="display:none;">
            <div class="github-live-indicator">
              <span class="github-live-dot"></span>
              <span>LIVE</span>
            </div>

            <div class="github-metrics" id="githubMetrics">
              <div class="metric">
                <span class="metric-number" id="metricRepos">0</span>
                <span class="metric-label">Repositories</span>
              </div>
              <div class="metric">
                <span class="metric-number" id="metricContributions">0</span>
                <span class="metric-label">Contributions</span>
              </div>
              <div class="metric">
                <span class="metric-number" id="metricProjects">0</span>
                <span class="metric-label">Projects</span>
              </div>
              <div class="metric">
                <span class="metric-number" id="metricLanguages">0</span>
                <span class="metric-label">Primary Languages</span>
              </div>
            </div>

            <div class="github-activity">
              <div class="activity-header">
                <span class="activity-dot"></span>
                <span>Contribution Activity</span>
                <div class="year-selector" id="yearSelector"></div>
              </div>
              <div class="contribution-graph" id="contributionGraph">
                <div class="contribution-months" id="contributionMonths"></div>
                <div class="contribution-wrapper">
                  <div class="contribution-days">
                    <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
                  </div>
                  <div class="contribution-grid" id="contributionGrid"></div>
                </div>
                <div class="contribution-legend">
                  <span class="legend-label">Less</span>
                  <div class="legend-cell level-0"></div>
                  <div class="legend-cell level-1"></div>
                  <div class="legend-cell level-2"></div>
                  <div class="legend-cell level-3"></div>
                  <div class="legend-cell level-4"></div>
                  <span class="legend-label">More</span>
                </div>
              </div>
              <div class="contribution-total" id="contributionTotal"></div>
            </div>

            <div class="github-languages-section" id="languagesSection">
              <div class="activity-header">
                <span class="activity-dot"></span>
                <span>Top Languages</span>
              </div>
              <div class="languages-list" id="languagesList"></div>
            </div>

            <a href="https://github.com/vaidyaharshit" target="_blank" rel="noopener" class="btn btn-glow btn-lg" id="githubProfileLink">
              <span>View GitHub Profile</span>
              ${icons.externalLinkLarge}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

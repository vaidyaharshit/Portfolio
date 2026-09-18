import { icons } from '../components/icons.js';

export function renderGitHub() {
  return `
    <section id="building-public" class="section github-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">Building in Public</h2>
          <div class="section-title-line"></div>
          <p class="section-sub">Tracking code contributions, repositories, and open source projects on GitHub.</p>
        </div>

        <div class="github-container" id="githubContainer">
          <div class="github-metrics" id="githubMetrics">
            <div class="metric-card">
              <div class="metric-val" id="metricRepos">0</div>
              <div class="metric-lbl">Repositories</div>
            </div>
            <div class="metric-card">
              <div class="metric-val" id="metricContributions">0</div>
              <div class="metric-lbl">Contributions</div>
            </div>
            <div class="metric-card">
              <div class="metric-val" id="metricProjects">4</div>
              <div class="metric-lbl">Key Projects</div>
            </div>
            <div class="metric-card">
              <div class="metric-val" id="metricLanguages">4</div>
              <div class="metric-lbl">Primary Languages</div>
            </div>
          </div>

          <div class="github-fallback" id="githubFallback" style="display:none; text-align: center; padding: 20px;">
            <p style="margin-bottom: 16px; color: var(--text-secondary);">
              Synced directly with GitHub. View full repositories and contribution history on GitHub.
            </p>
            <a href="https://github.com/vaidyaharshit" target="_blank" rel="noopener" class="btn btn-primary">
              View GitHub Profile
            </a>
          </div>

          <div class="github-data" id="githubData" style="display:none;">
            <div class="contribution-graph" id="contributionGraph">
              <div class="contribution-months" id="contributionMonths"></div>
              <div class="contribution-wrapper">
                <div class="contribution-days">
                  <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
                </div>
                <div class="contribution-grid" id="contributionGrid"></div>
              </div>
            </div>
            <div class="contribution-total" id="contributionTotal" style="margin-top: 16px; text-align: center; font-weight: 600;"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

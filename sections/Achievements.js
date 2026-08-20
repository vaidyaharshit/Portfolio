import { achievementsData } from '../data/achievementsData.js';

export function renderAchievements() {
  const d = achievementsData;
  return `
    <section id="achievements" class="section achievements-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="achievements-grid">
          ${d.items.map(item => `
            <div class="achievement-card glass-card reveal-item" data-reveal-direction="up" data-scan="true">
              <div class="achieve-scan-line"></div>
              <div class="achieve-icon">${item.icon}</div>
              <h3 class="achieve-title">${item.title}</h3>
              <p class="achieve-desc">${item.desc}</p>
              <span class="achieve-badge">${item.badge}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

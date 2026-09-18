import { aboutData } from '../data/aboutData.js';

export function renderAbout() {
  const d = aboutData;
  return `
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">About Me</h2>
          <div class="section-title-line"></div>
          <p class="section-sub">A brief overview of my background, focus areas, and development approach.</p>
        </div>

        <div class="about-grid">
          <div class="about-text">
            ${d.paragraphs.map(p => `<p>${p}</p>`).join('')}
          </div>

          <div class="about-stats">
            ${d.stats.map(stat => `
              <div class="stat-card">
                <div class="stat-number">${stat.target}${stat.suffix || ''}</div>
                <div class="stat-label">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

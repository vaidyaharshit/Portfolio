import { educationData } from '../data/educationData.js';
import { icons } from '../components/icons.js';

export function renderEducation() {
  const d = educationData;
  const gradSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="VAR_COLOR" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>`;

  return `
    <section id="education" class="section education-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
        </div>

        <div class="education-list">
          ${d.items.map(item => `
            <div class="education-card glass-card reveal-item" data-reveal-direction="${item.direction}">
              <div class="edu-icon">
                ${gradSvg.replace('VAR_COLOR', item.iconColor)}
              </div>
              <div class="edu-details">
                <span class="edu-year">${item.year}</span>
                <h3 class="edu-degree">${item.degree}</h3>
                <p class="edu-college">${item.college}</p>
                <p class="edu-desc">${item.desc}</p>
                <div class="edu-tags">
                  ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

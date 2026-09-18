import { experienceData } from '../data/experienceData.js';

export function renderExperience() {
  const d = experienceData;
  return `
    <section id="education" class="section education-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">${d.title}</h2>
          <div class="section-title-line"></div>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="education-grid">
          ${d.items.map((item) => `
            <div class="education-card">
              <div class="education-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <span class="education-duration">${item.duration}</span>
              <h3 class="education-degree">${item.degree}</h3>
              <p class="education-institution">${item.institution}</p>
              ${item.details ? `<p class="education-details">${item.details}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

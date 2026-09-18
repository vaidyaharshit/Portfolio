import { skillsData } from '../data/skillsData.js';
import { icons } from '../components/icons.js';

export function renderSkills() {
  const d = skillsData;
  return `
    <section id="skills" class="section skills-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">${d.title} ${d.titleGradient}</h2>
          <div class="section-title-line"></div>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="skills-grid">
          ${d.categories.map(cat => `
            <div class="skill-card">
              <div class="skill-card-header">
                <div class="skill-card-icon">${icons[cat.icon] || ''}</div>
                <h3 class="skill-card-title">${cat.title}</h3>
              </div>
              <div class="skill-tags">
                ${cat.skills.map(skill => `
                  <span class="tag">${skill.name}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

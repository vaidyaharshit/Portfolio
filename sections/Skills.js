import { skillsData } from '../data/skillsData.js';
import { icons } from '../components/icons.js';

export function renderSkills() {
  const d = skillsData;
  return `
    <section id="skills" class="section skills-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="skills-grid">
          ${d.categories.map(cat => `
            <div class="skill-category glass-card reveal-item" data-reveal-direction="${cat.direction}" data-stagger="${cat.stagger}">
              <div class="category-header">
                <div class="category-icon">${icons[cat.icon]}</div>
                <h3>${cat.title}</h3>
              </div>
              <div class="skills-list">
                ${cat.skills.map(skill => `
                  <div class="skill-item">
                    <div class="skill-meta"><span class="skill-name">${skill.name}</span><span class="skill-desc">${skill.desc}</span></div>
                    <div class="skill-bar">
                      <div class="skill-fill" data-width="${skill.width}"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

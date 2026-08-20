import { projectsData } from '../data/projectsData.js';
import { icons } from '../components/icons.js';

export function renderProjects() {
  const d = projectsData;
  return `
    <section id="projects" class="section projects-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="project-filters reveal-item">
          ${d.filters.map(f => `
            <button class="filter-btn${f.value === 'all' ? ' active' : ''}" data-filter="${f.value}">${f.label}</button>
          `).join('')}
        </div>

        <div class="projects-grid">
          ${d.projects.map(p => `
            <article class="project-card glass-card reveal-item" data-category="${p.category}" data-cursor="VIEW">
              <div class="project-visual">
                <div class="project-img ${p.bgClass}">
                  <span class="project-emoji">${p.emoji}</span>
                  <span class="project-type-tag">${p.typeTag}</span>
                </div>
                <div class="project-overlay">
                  <button class="project-expand-btn" data-project="${p.id}" aria-label="View project details">
                    ${icons.magnify}
                  </button>
                </div>
              </div>
              <div class="project-info">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-tags">
                  ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                  <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
                    ${icons.githubSmall}
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>

        <div class="projects-cta reveal-item">
          <a href="${d.githubCtaUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-lg">
            <span>${d.githubCtaText}</span>
            ${icons.arrowRight}
          </a>
        </div>
      </div>
    </section>
  `;
}

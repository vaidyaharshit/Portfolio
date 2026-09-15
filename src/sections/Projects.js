import { projectsData } from '../data/projectsData.js';
import { icons } from '../components/icons.js';

export function renderProjects() {
  const d = projectsData;
  const featuredProject = d.projects.find(p => p.featured) || d.projects[0];
  const regularProjects = d.projects.filter(p => p.id !== (featuredProject ? featuredProject.id : null));

  return `
    <section id="projects" class="section projects-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <!-- Project Category Filters -->
        <div class="project-filters-wrapper reveal-item" data-reveal-direction="up">
          <div class="project-filters">
            ${d.filters.map((f, i) => `
              <button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${f.value}">
                <span class="filter-bracket">[</span>
                <span>${f.label}</span>
                <span class="filter-bracket">]</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${featuredProject ? `
          <!-- Featured Project Highlight -->
          <div class="featured-project-container reveal-item" data-reveal-direction="up">
            <article class="featured-project-card glass-card project-card" data-category="${featuredProject.category}" data-cursor="VIEW">
              <div class="featured-visual">
                <div class="featured-img-wrapper">
                  <img 
                    src="${featuredProject.image}" 
                    alt="${featuredProject.title}" 
                    class="featured-project-img" 
                    loading="lazy"
                    onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'project-img-placeholder\'><span>${featuredProject.title}</span></div>';"
                  />
                  <div class="featured-img-overlay"></div>
                </div>
              </div>

              <div class="featured-info">
                <div class="featured-meta">
                  <span class="project-badge category-badge">[ ${featuredProject.categoryLabel || 'FEATURED'} ]</span>
                  ${featuredProject.status ? `<span class="project-badge status-badge">[ ${featuredProject.status} ]</span>` : ''}
                </div>

                <h3 class="featured-title">${featuredProject.title}</h3>
                <p class="featured-desc">${featuredProject.description}</p>

                <div class="featured-tags project-tags">
                  ${featuredProject.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>

                <div class="featured-actions project-links">
                  <button class="btn btn-primary project-expand-btn" data-project="${featuredProject.id}">
                    <span>View Project</span>
                    ${icons.arrowRight}
                  </button>
                  ${featuredProject.github ? `
                    <a href="${featuredProject.github}" target="_blank" rel="noopener" class="btn btn-outline">
                      ${icons.githubSmall}
                      <span>Code</span>
                    </a>
                  ` : ''}
                </div>
              </div>
            </article>
          </div>
        ` : ''}

        <!-- Regular Projects Grid -->
        <div class="projects-grid-container reveal-item" data-reveal-direction="up">
          <div class="projects-grid">
            ${regularProjects.map(p => `
              <article class="project-card glass-card" data-category="${p.category}" data-cursor="VIEW">
                <div class="project-card-visual">
                  <img 
                    src="${p.image}" 
                    alt="${p.title}" 
                    class="project-card-img" 
                    loading="lazy"
                    onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'project-img-placeholder\'><span>${p.title}</span></div>';"
                  />
                  <div class="project-card-overlay">
                    <span class="project-badge category-badge">[ ${p.categoryLabel || p.typeTag} ]</span>
                  </div>
                </div>

                <div class="project-card-info">
                  <h3 class="project-card-title">${p.title}</h3>
                  <p class="project-card-desc">${p.description}</p>

                  <div class="project-card-tags project-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                  </div>

                  <div class="project-card-actions project-links">
                    <button class="btn btn-sm btn-primary project-expand-btn" data-project="${p.id}">
                      <span>View Details</span>
                    </button>
                    ${p.github ? `
                      <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
                        ${icons.githubSmall}
                        <span>Code</span>
                      </a>
                    ` : ''}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>

        <!-- Bottom GitHub CTA -->
        <div class="projects-archive-cta reveal-item" data-reveal-direction="up">
          <div class="cta-inner glass-card">
            <div class="cta-content">
              <h3 class="cta-title">${d.githubCtaTitle}</h3>
              <p class="cta-sub">${d.githubCtaSub}</p>
            </div>
            <a href="${d.githubCtaUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-lg cta-btn">
              <span>View GitHub</span>
              ${icons.arrowRight}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

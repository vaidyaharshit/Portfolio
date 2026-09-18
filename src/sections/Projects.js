import { projectsData } from '../data/projectsData.js';
import { icons } from '../components/icons.js';

export function renderProjects() {
  const d = projectsData;
  const fp = d.featuredProject;
  const gridProjects = d.gridProjects;

  return `
    <section id="projects" class="section projects-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">${d.title}</h2>
          <div class="section-title-line"></div>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <!-- MAIN FEATURED PROJECT CARD -->
        <div class="featured-project-wrapper">
          <article class="featured-project-card">
            <div class="featured-media">
              <img 
                src="${fp.image}" 
                alt="${fp.title}" 
                class="featured-img"
                loading="lazy"
                onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'project-placeholder-img\'><span>${fp.title}</span></div>';"
              />
            </div>
            <div class="featured-content">
              <span class="project-category-badge">${fp.categoryLabel}</span>
              <h3 class="featured-title">${fp.title}</h3>
              <p class="featured-desc">${fp.description}</p>
              
              <div class="project-tech-badges">
                ${fp.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
              </div>

              <div class="project-card-actions">
                <a href="${fp.github}" target="_blank" rel="noopener" class="btn btn-primary">
                  View Project
                </a>
                <a href="${fp.github}" target="_blank" rel="noopener" class="btn btn-secondary">
                  ${icons.githubSmall || ''} GitHub
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- 3-COLUMN PROJECTS GRID -->
        <div class="projects-grid">
          ${gridProjects.map(p => `
            <article class="project-grid-card">
              <div class="project-grid-media">
                <img 
                  src="${p.image}" 
                  alt="${p.title}" 
                  class="project-grid-img"
                  loading="lazy"
                  onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'project-placeholder-img\'><span>${p.title}</span></div>';"
                />
              </div>
              <div class="project-grid-content">
                <span class="project-category-badge">${p.categoryLabel}</span>
                <h4 class="project-grid-title">${p.title}</h4>
                <p class="project-grid-desc">${p.description}</p>

                <div class="project-tech-badges">
                  ${p.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>

                <div class="project-card-actions">
                  <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                    View Project
                  </a>
                  <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

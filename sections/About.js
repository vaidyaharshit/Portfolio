import { aboutData } from '../data/aboutData.js';

export function renderAbout() {
  const d = aboutData;
  return `
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="left">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span>.</h2>
        </div>

        <div class="about-grid">
          <div class="about-text reveal-item" data-reveal-direction="left">
            ${d.paragraphs.map(p => `<p${p.startsWith('<strong') ? ' class="lead-text"' : ''}>${p}</p>`).join('')}

            <div class="workflow">
              <h4 class="workflow-title">${d.workflowTitle}</h4>
              <div class="workflow-steps">
                ${d.workflowSteps.map((step, i) => {
                  let html = `<div class="workflow-step"><span class="ws-num">${step.num}</span><span class="ws-name">${step.name}</span></div>`;
                  if (i < d.workflowSteps.length - 1) {
                    html += `<span class="ws-arrow">&rarr;</span>`;
                  }
                  return html;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="about-stats reveal-item" data-reveal-direction="right">
            ${d.stats.map(stat => {
              if (stat.isInfinity) {
                return `
                  <div class="stat-card glass-card">
                    <div class="stat-number-inf">&infin;</div>
                    <div class="stat-label">${stat.label}</div>
                  </div>
                `;
              }
              return `
                <div class="stat-card glass-card">
                  <div class="stat-number" data-target="${stat.target}">0</div>
                  <div class="stat-plus">${stat.suffix}</div>
                  <div class="stat-label">${stat.label}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

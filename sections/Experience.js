import { experienceData } from '../data/experienceData.js';

export function renderExperience() {
  const d = experienceData;
  return `
    <section id="experience" class="section experience-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="timeline">
          <div class="timeline-track" id="timelineTrack">
            <div class="timeline-track-fill" id="timelineTrackFill"></div>
          </div>

          ${d.items.map((item, i) => `
            <div class="timeline-item reveal-item" data-timeline="${i}">
              <div class="timeline-dot"></div>
              <div class="timeline-card glass-card">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-org">${item.org}</p>
                ${item.desc ? `<p class="timeline-desc">${item.desc}</p>` : ''}
                <div class="timeline-tags">
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

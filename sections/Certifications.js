import { certificationsData } from '../data/certificationsData.js';
import { icons } from '../components/icons.js';

export function renderCertifications() {
  const d = certificationsData;
  const rocketSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="VAR_COLOR" stroke-width="2"><path d="M12 15l-2 5l9-9l-9-9l2 5l-8 4z" /></svg>`;

  return `
    <section id="certifications" class="section certifications-section">
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span></h2>
        </div>

        <div class="certifications-grid">
          ${d.items.map((item, i) => `
            <div class="cert-card glass-card reveal-item" data-reveal-direction="${item.direction}" data-cert="${i}" data-cursor="VIEW">
              <div class="cert-header">
                ${rocketSvg.replace('VAR_COLOR', i === 0 ? 'var(--accent-violet)' : 'var(--accent-cyan)')}
                <span class="cert-date">${item.date}</span>
              </div>
              <h3 class="cert-name">${item.name}</h3>
              <p class="cert-org">Issued by ${item.org}</p>
              <div class="cert-actions">
                <button class="btn btn-sm btn-outline cert-preview-btn">
                  <span>Preview</span>
                  ${icons.eye}
                </button>
                <a href="${item.certLink}" target="_blank" rel="noopener" class="btn btn-sm btn-outline cert-link">
                  <span>View Certificate</span>
                  ${icons.externalLink}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

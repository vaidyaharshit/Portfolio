import { contactData } from '../data/contactData.js';

export function renderContact() {
  const d = contactData;

  return `
    <section id="contact" class="section contact-section">
      <div class="contact-glow-bg"></div>
      <div class="contact-grid-overlay"></div>
      <div class="container contact-container">
        <div class="contact-cta-wrapper glass-card reveal-item" data-reveal-direction="up">
          <!-- Ambient Corner Brackets for Developer HUD Look -->
          <div class="cta-bracket cta-bracket-tl"></div>
          <div class="cta-bracket cta-bracket-tr"></div>
          <div class="cta-bracket cta-bracket-bl"></div>
          <div class="cta-bracket cta-bracket-br"></div>

          <!-- Status Indicator -->
          <div class="cta-status-badge reveal-item" data-reveal-direction="up">
            <span class="status-dot"></span>
            <span class="status-text">${d.status}</span>
          </div>

          <!-- Developer Headline -->
          <h2 class="cta-headline reveal-item" data-reveal-direction="up">
            <span class="cta-line">${d.headline.line1}</span>
            <span class="cta-line cta-headline-gradient">${d.headline.highlight}</span>
            <span class="cta-line">${d.headline.line3}</span>
          </h2>

          <!-- Subtitle / Tags -->
          <div class="cta-tags reveal-item" data-reveal-direction="up">
            ${d.tags}
          </div>

          <!-- Quote / Description -->
          <p class="cta-description reveal-item" data-reveal-direction="up">
            ${d.description}
          </p>

          <!-- Large CTA Main Button -->
          <div class="cta-main-wrapper reveal-item" data-reveal-direction="up">
            <a href="mailto:${d.email}" class="cta-main-btn">
              <span class="cta-btn-prompt">$</span>
              <span class="cta-btn-cmd">connect --with-harshit</span>
              <span class="cta-btn-arrow">&rarr;</span>
            </a>
          </div>

          <!-- 3 Minimal Buttons -->
          <div class="cta-social-group reveal-item" data-reveal-direction="up">
            <a href="${d.github}" target="_blank" rel="noopener" class="cta-social-btn">
              <span>GitHub</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
            <a href="${d.linkedin}" target="_blank" rel="noopener" class="cta-social-btn">
              <span>LinkedIn</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
            <a href="mailto:${d.email}" class="cta-social-btn">
              <span>Email</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
          </div>

          <!-- Bottom Divider -->
          <div class="cta-divider"></div>

          <!-- Mission Complete / Footer Block -->
          <div class="cta-mission-block reveal-item" data-reveal-direction="up">
            <span class="mission-tag">${d.bottom.tag}</span>
            <p class="mission-quote">${d.bottom.quote}</p>
            <div class="mission-author">${d.bottom.name}</div>
            <div class="mission-roles">${d.bottom.roles}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

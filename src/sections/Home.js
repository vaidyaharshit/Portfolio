import { homeData } from '../data/homeData.js';
import { icons } from '../components/icons.js';

export function renderHome() {
  const d = homeData;
  return `
    <section id="home" class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-badge hero-reveal" data-reveal="0">
            <span class="pulse-dot"></span>
            <span>${d.badge}</span>
          </div>

          <h1 class="hero-title hero-reveal" data-reveal="1">
            ${d.greeting} <span class="text-gradient">${d.name}</span>.
          </h1>

          <div class="hero-role hero-reveal" data-reveal="2">
            <span class="role-static">I am a</span>
            <span class="role-dynamic" id="roleText"></span>
            <span class="role-cursor">|</span>
          </div>

          <p class="hero-desc hero-reveal" data-reveal="3">
            ${d.description}
          </p>

          <div class="hero-ctas hero-reveal" data-reveal="4">
            ${d.ctas.map(cta => {
              if (cta.hasArrow) {
                return `<a href="${cta.href}" class="btn btn-${cta.type} magnetic-btn"><span>${cta.text}</span>${icons.arrowRight}</a>`;
              }
              return `<a href="${cta.href}" class="btn btn-${cta.type} magnetic-btn"><span>${cta.text}</span></a>`;
            }).join('')}
          </div>

          <div class="hero-socials hero-reveal" data-reveal="5">
            <span class="socials-label">Connect:</span>
            ${d.socials.map(s => `
              <a href="${s.href}" target="_blank" rel="noopener" class="social-link" aria-label="${s.label}">
                ${icons[s.icon]}
              </a>
            `).join('')}
          </div>
        </div>

        <div class="hero-visual hero-reveal" data-reveal="3">
          <div class="avatar-card">
            <div class="avatar-ring"></div>
            <div class="avatar-ring-2"></div>
            <div class="avatar-orbit avatar-orbit-1"></div>
            <div class="avatar-orbit avatar-orbit-2"></div>

            <div class="avatar-graphic">
              <img 
                src="/profile/profile-photo.png" 
                alt="${d.name}" 
                class="hero-profile-img"
                onerror="this.onerror=null;this.src='/public/profile/profile-photo.png';"
              />
              <div class="avatar-overlay-glow"></div>
            </div>

            ${d.floatingBadges.map((b, i) => `
              <div class="floating-badge fb-${i + 1}">
                <span class="fb-icon">${b.icon}</span>
                <div><span class="fb-title">${b.title}</span><span class="fb-sub">${b.sub}</span></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <a href="#about" class="scroll-indicator" aria-label="Scroll down">
        <span class="scroll-text">${d.scrollText}</span>
        ${icons.scrollArrow}
      </a>
    </section>
  `;
}

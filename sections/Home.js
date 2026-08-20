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
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" fill="url(#aBg)" stroke="rgba(0,243,255,0.3)" stroke-width="2" />
                <path d="M30 100 H170 M100 30 V170 M50 50 L150 150 M150 50 L50 150" stroke="rgba(112,0,255,0.15)" stroke-width="1.5" stroke-dasharray="4 4" />
                <circle cx="100" cy="70" r="30" fill="url(#aHead)" stroke="#00f3ff" stroke-width="2" />
                <path d="M50 160 C50 120 70 115 100 115 C130 115 150 120 150 160 Z" fill="url(#aBody)" stroke="#7000ff" stroke-width="2" />
                <rect x="80" y="62" width="40" height="10" rx="5" fill="#00f3ff" filter="drop-shadow(0 0 8px #00f3ff)" />
                <text x="100" y="145" text-anchor="middle" fill="#00f3ff" font-family="Space Grotesk" font-size="12" font-weight="bold" letter-spacing="2">&lt;HV /&gt;</text>
                <defs>
                  <radialGradient id="aBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(90)">
                    <stop stop-color="#0d1124" />
                    <stop offset="1" stop-color="#050710" />
                  </radialGradient>
                  <linearGradient id="aHead" x1="70" y1="40" x2="130" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#182348" />
                    <stop offset="1" stop-color="#0a0e1a" />
                  </linearGradient>
                  <linearGradient id="aBody" x1="50" y1="115" x2="150" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#241545" />
                    <stop offset="1" stop-color="#090614" />
                  </linearGradient>
                </defs>
              </svg>
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

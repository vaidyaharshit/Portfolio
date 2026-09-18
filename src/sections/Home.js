import { homeData } from '../data/homeData.js';
import { icons } from '../components/icons.js';

export function renderHome() {
  const d = homeData;
  return `
    <section id="home" class="hero-section">
      <div class="container hero-container">
        <div class="hero-profile-col">
          <div class="hero-avatar-wrapper">
            <img 
              src="${d.profileImage}" 
              alt="${d.name}" 
              class="hero-profile-img"
              onerror="this.onerror=null;this.src='/profile/profile-photo.png';"
            />
          </div>
        </div>

        <div class="hero-text-col">
          <span class="hero-intro-label">${d.introLabel}</span>
          <h1 class="hero-name">${d.name}</h1>
          <h2 class="hero-subtitle">${d.roleSubtitle}</h2>

          <p class="hero-bio">
            ${d.bio}
          </p>

          <div class="hero-socials">
            ${d.socials.map(s => `
              <a href="${s.href}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="${s.label}">
                ${icons[s.icon] || s.label}
              </a>
            `).join('')}
          </div>

          <div class="hero-actions">
            ${d.ctas.map(cta => `
              <a href="${cta.href}" class="btn btn-${cta.type}">
                ${cta.text}
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

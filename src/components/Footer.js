import { footerData } from '../data/footerData.js';

export function renderFooter() {
  const d = footerData;
  return `
    <footer class="footer">
      <div class="footer-glow-line"></div>
      <div class="container footer-inner">
        <div class="footer-top">
          <a href="#home" class="nav-logo">
            <span class="logo-bracket">&lt;</span><span class="logo-text">HV</span> <span class="logo-slash">/</span><span class="logo-bracket">&gt;</span>
          </a>
          <div class="footer-desc">${d.description}</div>
          <div class="footer-nav">
            ${d.navLinks.map(link => `<a href="${link.href}">${link.text}</a>`).join('')}
          </div>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-bottom">
          <p class="copyright">&copy; <span id="currentYear">2026</span> Designed & Built with <span class="heart-accent">${d.copyright.heartIcon}</span> by <strong>${d.copyright.name}</strong>.</p>
          <div class="footer-socials">
            ${d.socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener">${s.text}</a>`).join('')}
          </div>
        </div>
      </div>
    </footer>
  `;
}

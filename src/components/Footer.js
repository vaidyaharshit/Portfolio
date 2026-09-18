import { footerData } from '../data/footerData.js';

export function renderFooter() {
  const d = footerData;
  return `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a href="#home" class="nav-logo" aria-label="Harshit Vaidya Home">
            <span class="logo-badge">HV</span>
            <span class="logo-name">Harshit Vaidya</span>
          </a>
        </div>

        <div class="footer-socials">
          ${d.socials.map(s => `
            <a href="${s.href}" target="_blank" rel="noopener" class="footer-social-link">
              ${s.text}
            </a>
          `).join('')}
        </div>

        <div class="copyright">
          &copy; <span id="currentYear">2026</span> Harshit Vaidya
        </div>
      </div>
    </footer>
  `;
}

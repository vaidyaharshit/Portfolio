import { icons } from './icons.js';

const navLinks = [
  { text: 'Home', href: '#home' },
  { text: 'About', href: '#about' },
  { text: 'Skills', href: '#skills' },
  { text: 'Projects', href: '#projects' },
  { text: 'Experience', href: '#experience' },
  { text: 'Achievements', href: '#achievements' },
  { text: 'Contact', href: '#contact' },
];

export function renderNavbar() {
  return `
    <header class="navbar" id="navbar">
      <nav class="navbar-inner">
        <a href="#home" class="nav-logo" aria-label="Home">
          <span class="logo-bracket">&lt;</span><span class="logo-text">HV</span> <span class="logo-slash">/</span><span class="logo-bracket">&gt;</span>
        </a>

        <ul class="nav-links" id="navLinks">
          ${navLinks.map((link, i) => `
            <li><a href="${link.href}" class="nav-link${i === 0 ? ' active' : ''}">${link.text}</a></li>
          `).join('')}
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
            ${icons.sun}
            ${icons.moon}
          </button>

          <a href="#contact" class="btn btn-glow btn-sm nav-cta">Let's Connect</a>

          <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  `;
}

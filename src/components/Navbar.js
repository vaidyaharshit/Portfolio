const navLinks = [
  { text: 'Home', href: '#home' },
  { text: 'About', href: '#about' },
  { text: 'Skills', href: '#skills' },
  { text: 'Projects', href: '#projects' },
  { text: 'Education', href: '#education' },
  { text: 'Achievements', href: '#achievements' },
  { text: 'Contact', href: '#contact' },
];

export function renderNavbar() {
  return `
    <header class="navbar" id="navbar">
      <nav class="navbar-inner container">
        <a href="#home" class="nav-logo" aria-label="Harshit Vaidya Home">
          <span class="logo-badge">HV</span>
          <span class="logo-name">Harshit Vaidya</span>
        </a>

        <ul class="nav-links" id="navLinks">
          ${navLinks.map((link, i) => `
            <li><a href="${link.href}" class="nav-link${i === 0 ? ' active' : ''}">${link.text}</a></li>
          `).join('')}
        </ul>

        <div class="nav-actions">
          <a href="#contact" class="btn btn-secondary btn-sm nav-resume-btn">
            Resume
          </a>

          <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  `;
}

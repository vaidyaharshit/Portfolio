/* ==========================================================================
   HARSHIT VAIDYA — PORTFOLIO APP ENTRY POINT
   White + Maroon Modern Design System
   ========================================================================== */

import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderModals } from './components/Modals.js';
import { renderHome } from './sections/Home.js';
import { renderAbout } from './sections/About.js';
import { renderSkills } from './sections/Skills.js';
import { renderProjects } from './sections/Projects.js';
import { renderExperience } from './sections/Experience.js';
import { renderAchievements, initAchievementsAlbum } from './sections/Achievements.js';
import { renderGitHub } from './sections/GitHub.js';
import { renderContact } from './sections/Contact.js';
import { fetchAll } from './githubService.js';

/* -----------------------------------------------------------------------
   RENDER ALL SECTIONS
   ----------------------------------------------------------------------- */
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderHome()}
      ${renderAbout()}
      ${renderSkills()}
      ${renderProjects()}
      ${renderExperience()}
      ${renderAchievements()}
      ${renderGitHub()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    ${renderModals()}
  `;
}

renderApp();

/* -----------------------------------------------------------------------
   INITIALIZE INTERACTIVE BEHAVIOR
   ----------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Achievements Album
  initAchievementsAlbum();

  // Mobile Navigation Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // Load GitHub stats asynchronously
  fetchAll()
    .then(data => {
      const metricRepos = document.getElementById('metricRepos');
      const metricContribs = document.getElementById('metricContributions');
      if (metricRepos && data.profile) {
        metricRepos.textContent = data.profile.public_repos || '0';
      }
      if (metricContribs && data.totalContributions) {
        metricContribs.textContent = data.totalContributions || '0';
      }
    })
    .catch(() => {
      const fallback = document.getElementById('githubFallback');
      if (fallback) fallback.style.display = 'block';
    });
});

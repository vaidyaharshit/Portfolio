/* ==========================================================================
   HV FUTURISTIC AI/ML DEVELOPER PORTFOLIO - JAVASCRIPT CONTROLLER
   Target: Harshit (B.Tech AI & ML Student / Developer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. PRELOADER & INITIALIZATION
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loaderBar');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 25) + 10;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
        }
        // Initialize animated components after load
        initScrollReveal();
        initStatsCounter();
      }, 400);
    }
    if (loaderBar) {
      loaderBar.style.width = `${loadProgress}%`;
    }
  }, 120);

  /* ------------------------------------------------------------------------
     2. DYNAMIC HERO ROLE TYPING ANIMATION
     ------------------------------------------------------------------------ */
  const roleTextElem = document.getElementById('roleText');
  const roles = [
    'AI/ML Student',
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRoleEffect() {
    if (!roleTextElem) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleTextElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleTextElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(typeRoleEffect, typingSpeed);
  }

  typeRoleEffect();

  /* ------------------------------------------------------------------------
     3. STICKY NAVBAR & MOBILE NAVIGATION
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll navbar styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
    handleBackToTopVisibility();
  });

  // Mobile menu toggle
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinkItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinkItems.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. CUSTOM CURSOR GLOW TRACKER
     ------------------------------------------------------------------------ */
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ------------------------------------------------------------------------
     5. 3D CARD TILT EFFECT
     ------------------------------------------------------------------------ */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  /* ------------------------------------------------------------------------
     6. MAGNETIC CTA BUTTON EFFECT
     ------------------------------------------------------------------------ */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  /* ------------------------------------------------------------------------
     7. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.section-header, .about-grid, .skill-category-card, .project-card, .timeline-item, .education-card, .achievement-card, .cert-card, .github-stats-container, .contact-grid'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     8. ANIMATED STATS COUNTER
     ------------------------------------------------------------------------ */
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number, .metric-number');

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          countUp(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
  }

  function countUp(element, target) {
    let current = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      current += 1;
      element.textContent = current;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, Math.max(stepTime, 30));
  }

  /* ------------------------------------------------------------------------
     9. PROJECT FILTERING SYSTEM
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     10. GITHUB ACTIVITY HEAT GRID GENERATOR
     ------------------------------------------------------------------------ */
  const heatGrid = document.getElementById('heatGrid');

  if (heatGrid) {
    const totalCols = window.innerWidth < 480 ? 20 : 45;
    const rows = 5;

    for (let c = 0; c < totalCols; c++) {
      const colDiv = document.createElement('div');
      colDiv.style.display = 'flex';
      colDiv.style.flexDirection = 'column';
      colDiv.style.gap = '4px';

      for (let r = 0; r < rows; r++) {
        const cell = document.createElement('div');
        cell.classList.add('heat-cell');

        const rand = Math.random();
        if (rand > 0.85) cell.classList.add('level-4');
        else if (rand > 0.7) cell.classList.add('level-3');
        else if (rand > 0.5) cell.classList.add('level-2');
        else if (rand > 0.3) cell.classList.add('level-1');

        colDiv.appendChild(cell);
      }
      heatGrid.appendChild(colDiv);
    }
  }

  /* ------------------------------------------------------------------------
     11. CONTACT FORM INTERACTIVE SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show interactive feedback toast
      formToast.classList.add('show');

      // Reset form fields
      contactForm.reset();

      // Hide toast after 5 seconds
      setTimeout(() => {
        formToast.classList.remove('show');
      }, 5000);
    });
  }

  /* ------------------------------------------------------------------------
     12. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     13. UPDATE FOOTER YEAR
     ------------------------------------------------------------------------ */
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

});

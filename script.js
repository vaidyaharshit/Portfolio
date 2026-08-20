/* ==========================================================================
   HV PORTFOLIO — CINEMATIC INTERACTIVE CONTROLLER v2
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const isMobile = window.innerWidth < 768;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     1. HEIST CINEMATIC INTRO SEQUENCE (5 PHASES — NO COUNTDOWN)
     ----------------------------------------------------------------------- */
  const heistIntro = document.getElementById('heistIntro');
  const phase1 = document.getElementById('heistPhase1');
  const phase2 = document.getElementById('heistPhase2');
  const phase3 = document.getElementById('heistPhase3');
  const phase4 = document.getElementById('heistPhase4');
  const phase5 = document.getElementById('heistPhase5');

  const heistLines = [
    { id: 'heistType1', text: 'SECURE CHANNEL ESTABLISHED' },
    { id: 'heistType2', text: 'ACCESSING DIGITAL ARCHIVE...' },
    { id: 'heistType3', text: 'PORTFOLIO DATABASE FOUND' }
  ];

  function heistTypeLine(lineObj, callback) {
    const el = document.getElementById(lineObj.id);
    if (!el) { if (callback) callback(); return; }
    const parent = el.closest('.heist-term-line');
    if (parent) parent.classList.add('visible');
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = lineObj.text.substring(0, i + 1);
      i++;
      if (i >= lineObj.text.length) {
        clearInterval(interval);
        setTimeout(callback || (() => {}), 300);
      }
    }, 30);
  }

  function runHeistSequence() {
    let lineIdx = 0;
    function nextLine() {
      if (lineIdx < heistLines.length) {
        heistTypeLine(heistLines[lineIdx], () => { lineIdx++; nextLine(); });
      } else {
        setTimeout(() => heistShowPhase2(), 500);
      }
    }
    nextLine();
  }

  function heistShowPhase2() {
    if (phase1) phase1.classList.remove('active');
    if (phase2) phase2.classList.add('active');
    setTimeout(() => heistShowPhase3(), 2000);
  }

  function heistShowPhase3() {
    if (phase2) phase2.classList.remove('active');
    if (phase3) phase3.classList.add('active');
    setTimeout(() => heistShowPhase4(), 1500);
  }

  function heistShowPhase4() {
    if (phase3) phase3.classList.remove('active');
    if (phase4) phase4.classList.add('active');
    setTimeout(() => heistShowPhase5(), 1400);
  }

  function heistShowPhase5() {
    if (phase4) phase4.classList.remove('active');
    if (phase5) phase5.classList.add('active');
    setTimeout(() => heistFinish(), 600);
  }

  function heistFinish() {
    if (heistIntro) heistIntro.classList.add('done');
    animateHeroEntrance();
    initParticles();
  }

  if (prefersReducedMotion) {
    setTimeout(() => {
      if (heistIntro) heistIntro.classList.add('done');
      animateHeroEntrance();
      initParticles();
    }, 100);
  } else {
    setTimeout(runHeistSequence, 300);
  }

  /* -----------------------------------------------------------------------
     2. HERO ENTRANCE ANIMATION
     ----------------------------------------------------------------------- */
  function animateHeroEntrance() {
    const els = [
      { el: document.querySelector('.hero-badge'), delay: 100 },
      { el: document.querySelector('.hero-title'), delay: 250 },
      { el: document.querySelector('.hero-role'), delay: 400 },
      { el: document.querySelector('.hero-desc'), delay: 550 },
      { el: document.querySelector('.hero-ctas'), delay: 700 },
      { el: document.querySelector('.hero-socials'), delay: 850 },
      { el: document.querySelector('.hero-visual'), delay: 400 },
    ];
    els.forEach(({ el, delay }) => {
      if (el) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, delay);
      }
    });
  }

  /* -----------------------------------------------------------------------
     3. TYPEWRITER ROLE ANIMATION
     ----------------------------------------------------------------------- */
  const roleTextElem = document.getElementById('roleText');
  const roles = ['Problem Solver', 'AI/ML Enthusiast', 'Web Developer', 'Creative Developer', 'Tech Explorer'];
  let roleIdx = 0, charIdx = 0, isDeleting = false, typeSpeed = 100;

  function typeRole() {
    if (!roleTextElem) return;
    const current = roles[roleIdx];
    if (isDeleting) {
      roleTextElem.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 50;
    } else {
      roleTextElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 120;
    }
    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }
    setTimeout(typeRole, typeSpeed);
  }
  typeRole();

  /* -----------------------------------------------------------------------
     4. THEME TOGGLE + TRANSITION
     ----------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeTransition = document.getElementById('themeTransition');

  function setTheme(theme, withTransition) {
    if (withTransition && themeTransition) {
      const rect = themeToggle.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      themeTransition.style.left = x + 'px';
      themeTransition.style.top = y + 'px';
      themeTransition.style.background = theme === 'dark' ? 'radial-gradient(circle, #020408 0%, #060814 100%)' : 'radial-gradient(circle, #F5F0E8 0%, #EDE6D8 100%)';
      themeTransition.classList.remove('active');
      void themeTransition.offsetWidth;
      themeTransition.classList.add('active');
      setTimeout(() => themeTransition.classList.remove('active'), 650);
    }
    html.setAttribute('data-theme', theme);
    localStorage.setItem('hv-theme', theme);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#060814' : '#F5F0E8');
  }

  const savedTheme = localStorage.getItem('hv-theme');
  if (savedTheme) setTheme(savedTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* -----------------------------------------------------------------------
     5. SCROLL PROGRESS (VERTICAL)
     ----------------------------------------------------------------------- */
  const scrollProgressFill = document.getElementById('scrollProgressFill');
  const scrollProgressDot = document.getElementById('scrollProgressDot');
  const scrollProgressPercent = document.getElementById('scrollProgressPercent');
  const scrollProgressV = document.getElementById('scrollProgressV');

  /* -----------------------------------------------------------------------
     6. NAVBAR SCROLL & ACTIVE SECTION
     ----------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);

    if (scrollProgressFill) scrollProgressFill.style.height = pct + '%';
    if (scrollProgressDot) scrollProgressDot.style.top = pct + '%';
    if (scrollProgressPercent) scrollProgressPercent.textContent = Math.round(pct) + '%';
    if (scrollProgressV) scrollProgressV.classList.toggle('visible', scrollY > 300);

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          navLinkItems.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });

    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', scrollY > 400);

    updateTimelineTrack();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* -----------------------------------------------------------------------
     7. MOBILE MENU
     ----------------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinkItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* -----------------------------------------------------------------------
     8. CUSTOM CURSOR (TECH HUD)
     ----------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorLabel = document.getElementById('cursorLabel');

  if (cursorDot && cursorRing && isFinePointer && !prefersReducedMotion) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top = my + 'px';
    });

    function animateCursor() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .glass-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorLabel) {
          cursorLabel.textContent = el.getAttribute('data-cursor');
          cursorLabel.classList.add('active');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorLabel) cursorLabel.classList.remove('active');
      });
    });

    document.addEventListener('mousemove', e => {
      if (cursorLabel && cursorLabel.classList.contains('active')) {
        cursorLabel.style.left = (e.clientX + 20) + 'px';
        cursorLabel.style.top = e.clientY + 'px';
      }
    });
  }

  /* -----------------------------------------------------------------------
     9. CURSOR TRAIL (GPU-friendly, desktop only)
     ----------------------------------------------------------------------- */
  if (isFinePointer && !prefersReducedMotion && !isMobile) {
    const trailCanvas = document.getElementById('cursorTrail');
    if (trailCanvas) {
      const tCtx = trailCanvas.getContext('2d');
      let trailPoints = [];
      const maxTrail = 12;

      function resizeTrail() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
      }
      resizeTrail();
      window.addEventListener('resize', resizeTrail);

      document.addEventListener('mousemove', e => {
        trailPoints.push({ x: e.clientX, y: e.clientY, life: 1, size: 2.5 });
        if (trailPoints.length > maxTrail) trailPoints.shift();
      });

      function drawTrail() {
        tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = trailPoints.length - 1; i >= 0; i--) {
          const p = trailPoints[i];
          p.life -= 0.08;
          if (p.life <= 0) { trailPoints.splice(i, 1); continue; }
          tCtx.beginPath();
          tCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          tCtx.fillStyle = `rgba(0, 243, 255, ${p.life * 0.4})`;
          tCtx.fill();
        }
        requestAnimationFrame(drawTrail);
      }
      drawTrail();
    }
  }

  /* -----------------------------------------------------------------------
     10. MOUSE GLOW FOLLOW
     ----------------------------------------------------------------------- */
  const bgGlow = document.getElementById('bgGlow');
  if (bgGlow && isFinePointer) {
    document.addEventListener('mousemove', e => {
      bgGlow.style.left = e.clientX + 'px';
      bgGlow.style.top = e.clientY + 'px';
    });
  }

  /* -----------------------------------------------------------------------
     10b. HEIST MOUSE-REACTIVE ATMOSPHERIC GLOWS
     ----------------------------------------------------------------------- */
  if (isFinePointer && !prefersReducedMotion) {
    const atmoRed = document.querySelector('.atmospheric-red');
    const atmoCyan = document.querySelector('.atmospheric-cyan');
    const atmoPurple = document.querySelector('.atmospheric-purple');
    document.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 40;
      const cy = (e.clientY / window.innerHeight - 0.5) * 40;
      if (atmoRed) atmoRed.style.transform = `translate(${cx * 0.6}px, ${cy * 0.6}px)`;
      if (atmoCyan) atmoCyan.style.transform = `translate(${-cx * 0.5}px, ${-cy * 0.5}px)`;
      if (atmoPurple) atmoPurple.style.transform = `translate(${cx * 0.3}px, ${-cy * 0.3}px)`;
    });
  }

  /* -----------------------------------------------------------------------
     10c. HEIST SCROLL-REACTIVE SECTION ATMOSPHERE
     ----------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const sectionAtmospheres = [
      { selector: '#hero',    color: 'rgba(255,45,45,0.08)',   mix: 'normal' },
      { selector: '#about',   color: 'rgba(112,0,255,0.06)',   mix: 'normal' },
      { selector: '#skills',  color: 'rgba(0,102,255,0.05)',   mix: 'normal' },
      { selector: '#projects', color: 'rgba(0,243,255,0.05)',  mix: 'normal' },
      { selector: '#experience', color: 'rgba(255,45,45,0.04)', mix: 'normal' },
      { selector: '#contact', color: 'rgba(255,45,45,0.07)',   mix: 'normal' }
    ];
    const scanningLaser = document.getElementById('scanningLaser');
    const classifyMetas = document.querySelectorAll('.classified-meta');

    function updateScrollAtmosphere() {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const currentTheme = document.documentElement.getAttribute('data-theme');

      if (scanningLaser && currentTheme === 'dark') {
        const speed = Math.min(1 + Math.abs(scrollY) * 0.0005, 3);
        scanningLaser.style.animationDuration = (12 / speed) + 's';
      }

      classifyMetas.forEach(meta => {
        const rect = meta.getBoundingClientRect();
        if (rect.top < viewH && rect.bottom > 0) {
          const progress = 1 - (rect.top / viewH);
          const opacity = 0.15 + Math.min(progress, 1) * 0.2;
          meta.style.opacity = opacity;
        }
      });
    }

    window.addEventListener('scroll', updateScrollAtmosphere, { passive: true });
  }

  /* -----------------------------------------------------------------------
     11. 3D TILT ON CARDS
     ----------------------------------------------------------------------- */
  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -4;
        const ry = ((x - cx) / cx) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* -----------------------------------------------------------------------
     12. PROJECT CARD MOUSE PARALLAX
     ----------------------------------------------------------------------- */
  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.project-card').forEach(card => {
      const img = card.querySelector('.project-img');
      if (!img) return;
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
      });
      card.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    });
  }

  /* -----------------------------------------------------------------------
     13. MAGNETIC BUTTONS
     ----------------------------------------------------------------------- */
  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* -----------------------------------------------------------------------
     14. SCROLL REVEAL (INTERSECTION OBSERVER — DIRECTIONAL)
     ----------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------------------------------
     15. SKILL BAR ANIMATION
     ----------------------------------------------------------------------- */
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

  /* -----------------------------------------------------------------------
     16. STATS COUNTER
     ----------------------------------------------------------------------- */
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        if (!isNaN(target)) countUp(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number, .metric-number').forEach(el => statsObserver.observe(el));

  function countUp(el, target) {
    let current = 0;
    const step = Math.max(Math.floor(1500 / target), 30);
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
    }, step);
  }

  /* -----------------------------------------------------------------------
     17. TIMELINE TRACK FILL + DRAWING
     ----------------------------------------------------------------------- */
  const timelineTrackFill = document.getElementById('timelineTrackFill');
  const timelineTrack = document.getElementById('timelineTrack');

  function updateTimelineTrack() {
    if (!timelineTrackFill || !timelineTrack) return;
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    const trackRect = timelineTrack.getBoundingClientRect();
    const trackTop = trackRect.top;
    const trackHeight = trackRect.height;

    let lastRevealedBottom = 0;
    items.forEach(item => {
      if (item.classList.contains('revealed')) {
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          const dotRect = dot.getBoundingClientRect();
          const dotCenter = dotRect.top + dotRect.height / 2 - trackTop;
          if (dotCenter > lastRevealedBottom) lastRevealedBottom = dotCenter;
        }
      }
    });

    const fillPct = trackHeight > 0 ? (lastRevealedBottom / trackHeight) * 100 : 0;
    timelineTrackFill.style.height = Math.min(fillPct, 100) + '%';
  }

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateTimelineTrack();
      }
    });
  }, { threshold: 0.1 });

  if (timelineTrack) timelineObserver.observe(timelineTrack);

  /* -----------------------------------------------------------------------
     18. PROJECT FILTERS
     ----------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('hidden-card');
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden-card'), 300);
        }
      });
    });
  });

  /* -----------------------------------------------------------------------
     19. HEAT GRID
     ----------------------------------------------------------------------- */
  const heatGrid = document.getElementById('heatGrid');
  if (heatGrid) {
    const cols = window.innerWidth < 480 ? 20 : 45;
    for (let c = 0; c < cols; c++) {
      const col = document.createElement('div');
      col.style.display = 'flex';
      col.style.flexDirection = 'column';
      col.style.gap = '4px';
      for (let r = 0; r < 5; r++) {
        const cell = document.createElement('div');
        cell.classList.add('heat-cell');
        const rand = Math.random();
        if (rand > 0.85) cell.classList.add('l4');
        else if (rand > 0.7) cell.classList.add('l3');
        else if (rand > 0.5) cell.classList.add('l2');
        else if (rand > 0.3) cell.classList.add('l1');
        col.appendChild(cell);
      }
      heatGrid.appendChild(col);
    }
  }

  /* -----------------------------------------------------------------------
     20. CONTACT FORM
     ----------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      formToast.classList.add('show');
      contactForm.reset();
      setTimeout(() => formToast.classList.remove('show'), 5000);
    });
  }

  /* -----------------------------------------------------------------------
     21. PROJECT MODAL
     ----------------------------------------------------------------------- */
  const projectData = {
    agrient: {
      title: 'AgriRent',
      type: 'Web Platform',
      description: 'Agricultural Equipment Rental System designed for farmers to search, compare, and reserve heavy farming machinery online easily. Built with responsive layout and modern design principles.',
      problem: 'Farmers often struggle to access expensive farming equipment. AgriRent provides a digital marketplace connecting equipment owners with farmers who need temporary access.',
      solution: 'Built a responsive web platform with search, filtering, and booking capabilities using modern HTML, CSS, and JavaScript.',
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
      features: ['Responsive Design', 'Equipment Search & Filter', 'Modern UI/UX', 'Mobile-First Approach'],
      github: 'https://github.com/vaidyaharshit'
    },
    hotel: {
      title: 'Hotel Room Booking Interface',
      type: 'Web Interface',
      description: 'A modern hotel booking website interface that allows users to easily explore hotels, check room availability, view prices and amenities, and make bookings through a clean, responsive, and user-friendly design.',
      problem: 'Creating an intuitive hotel booking experience that handles complex room data while remaining visually appealing and easy to navigate.',
      solution: 'Designed and built a clean, responsive booking interface with modern UI patterns and smooth interactions.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Room Availability Display', 'Price Comparison', 'Amenity Listings', 'Responsive Layout'],
      github: 'https://github.com/vaidyaharshit/hotel-room-booking-interface-.git'
    },
    portfolio: {
      title: 'HV CyberPortfolio',
      type: 'Developer Portfolio',
      description: 'A high-end, futuristic developer portfolio website built with pure vanilla tech, glassmorphism, responsive grid layouts, custom cursor glow, and scroll animation mechanics.',
      problem: 'Need a premium, interactive portfolio that showcases technical skills while maintaining performance and accessibility.',
      solution: 'Built a fully animated, theme-switchable portfolio using only vanilla HTML, CSS, and JavaScript with no framework dependencies.',
      technologies: ['HTML5', 'CSS3', 'Vanilla JS', 'Glassmorphism', 'Canvas'],
      features: ['Dark/Light Theme', 'Custom Cursor', 'Scroll Animations', 'Particle Effects', 'Cinematic Intro', 'Responsive Design'],
      github: 'https://github.com/vaidyaharshit'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectData[key];
      if (!data || !modalBody) return;

      modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <span class="modal-type">${data.type}</span>
        <p>${data.description}</p>
        <h4>Problem</h4>
        <p>${data.problem}</p>
        <h4>Solution</h4>
        <p>${data.solution}</p>
        <h4>Key Features</h4>
        <div class="modal-tags">${data.features.map(f => `<span class="tag">${f}</span>`).join('')}</div>
        <h4>Technologies</h4>
        <div class="modal-tags">${data.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="modal-links">
          <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>View Code</span>
          </a>
        </div>
      `;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (projectModal) projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', e => {
      if (e.target === projectModal) closeModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeCertModal(); }
  });

  /* -----------------------------------------------------------------------
     22. CERTIFICATE MODAL
     ----------------------------------------------------------------------- */
  const certData = [
    { name: 'AI & Machine Learning Fundamentals', org: 'YOUR_ORGANIZATION', date: '2026', note: 'This certificate covers fundamental concepts in artificial intelligence and machine learning, including supervised learning, neural networks, and data analysis techniques.' },
    { name: 'Modern Web Development', org: 'YOUR_ORGANIZATION', date: '2026', note: 'This certification validates skills in modern web development including HTML5, CSS3, responsive design, and interactive JavaScript programming.' }
  ];

  const certModal = document.getElementById('certModal');
  const certModalBody = document.getElementById('certModalBody');
  const certModalClose = document.getElementById('certModalClose');

  document.querySelectorAll('.cert-card').forEach((card, idx) => {
    const previewBtn = card.querySelector('.cert-preview-btn');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        const data = certData[idx];
        if (!data || !certModalBody) return;
        certModalBody.innerHTML = `
          <div class="cert-preview-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
              <path d="M12 15l-2 5l9-9l-9-9l2 5l-8 4z"/>
            </svg>
          </div>
          <h3>${data.name}</h3>
          <p class="cert-modal-org">Issued by ${data.org}</p>
          <span class="cert-modal-date">${data.date}</span>
          <div class="cert-modal-note">${data.note}</div>
        `;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  function closeCertModal() {
    if (certModal) certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', e => {
      if (e.target === certModal) closeCertModal();
    });
  }

  /* -----------------------------------------------------------------------
     23. BACK TO TOP
     ----------------------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------------------------------
     24. FOOTER YEAR
     ----------------------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------------------------------
     25. PARTICLES CANVAS (Theme-aware)
     ----------------------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = isMobile ? 20 : 45;
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1
      });
    }

    function getColor() {
      return html.getAttribute('data-theme') === 'dark' ? '0, 243, 255' : '8, 145, 178';
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const c = getColor();
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c}, ${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${c}, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    if (!prefersReducedMotion) draw();
  }

  /* -----------------------------------------------------------------------
     26. SMOOTH SCROLL FOR NAV LINKS
     ----------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* -----------------------------------------------------------------------
     27. CONTACT SECTION CINEMATIC PARTICLES
     ----------------------------------------------------------------------- */
  function initContactParticles() {
    if (isMobile || prefersReducedMotion) return;
    const container = document.getElementById('contactParticles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: var(--accent-cyan);
        border-radius: 50%;
        opacity: ${Math.random() * 0.25 + 0.05};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: contactFloat ${Math.random() * 15 + 10}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * -10}s;
      `;
      container.appendChild(dot);
    }

    const style = document.createElement('style');
    style.textContent = '@keyframes contactFloat { 0% { transform: translate(0, 0); } 100% { transform: translate(' + (Math.random() > 0.5 ? '' : '-') + '30px, ' + (Math.random() > 0.5 ? '' : '-') + '40px); } }';
    document.head.appendChild(style);
  }
  initContactParticles();

});

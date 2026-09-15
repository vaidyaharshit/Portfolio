import { achievementCategories, initialPhotos, loadAchievementsPhotos, normalizePath } from '../data/achievementsPhotoData.js';

export function renderAchievements() {
  return `
    <section id="achievements" class="section achievements-section photo-album-section">
      <div class="album-bg-glow glow-1"></div>
      <div class="album-bg-glow glow-2"></div>
      <div class="album-grid-overlay"></div>

      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">[ FILE_05 // ACHIEVEMENT VAULT ]</span>
          <span class="section-index">05 / ACHIEVEMENTS &amp; CERTIFICATIONS</span>
          <h2 class="section-title">Achievements &amp; <span class="text-gradient">Certifications</span></h2>
          <p class="section-sub">Certificates, achievements, events and milestones.</p>
        </div>

        <!-- Filter Buttons -->
        <div class="album-filter-wrapper reveal-item" data-reveal-direction="up">
          <div class="album-filters" id="albumFilters">
            ${achievementCategories.map((cat, i) => `
              <button class="album-filter-btn${i === 0 ? ' active' : ''}" data-category="${cat.id}">
                <span class="filter-bracket">[</span>
                <span class="filter-label">${cat.label}</span>
                <span class="filter-bracket">]</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Single Horizontal Row Gallery -->
      <div class="album-marquee-container reveal-item" data-reveal-direction="up">
        <div class="album-marquee-row row-single" id="albumRowSingle">
          <div class="album-marquee-track" id="albumTrack"></div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div class="album-lightbox" id="albumLightbox" aria-hidden="true" role="dialog">
      <div class="lightbox-overlay" id="lightboxOverlay"></div>
      <div class="lightbox-content glass-card">
        <button class="lightbox-close" id="lightboxClose" aria-label="Close modal">&times;</button>
        <button class="lightbox-nav nav-prev" id="lightboxPrev" aria-label="Previous photo">&larr;</button>
        <button class="lightbox-nav nav-next" id="lightboxNext" aria-label="Next photo">&rarr;</button>
        
        <div class="lightbox-body">
          <div class="lightbox-media-wrapper">
            <img src="" alt="" id="lightboxImg" class="lightbox-img" />
            <div class="lightbox-scanline"></div>
          </div>
          <div class="lightbox-details">
            <div class="lightbox-tag" id="lightboxTag">[ CERT_01 ]</div>
            <h3 class="lightbox-title" id="lightboxTitle"></h3>
            <div class="lightbox-meta">
              <span class="lightbox-org" id="lightboxOrg"></span> &bull; 
              <span class="lightbox-date" id="lightboxDate"></span>
            </div>
            <p class="lightbox-desc" id="lightboxDesc"></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initializes interactive album marquee filtering, single-row track, and lightbox
 */
export async function initAchievementsAlbum() {
  const photos = await loadAchievementsPhotos();
  let currentCategory = 'all';
  let activePhotosList = [...photos];
  let lightboxIndex = 0;

  const filterBtns = document.querySelectorAll('.album-filter-btn');
  const track = document.getElementById('albumTrack');
  const lightbox = document.getElementById('albumLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxOrg = document.getElementById('lightboxOrg');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTag = document.getElementById('lightboxTag');

  if (!track) return;

  function renderPhotoCard(photo, index) {
    const imgSrc = normalizePath(photo.image || photo.src);
    const tag = photo.tag || (photo.category ? `[ ${photo.category.toUpperCase().slice(0, 4)} ]` : '[ ACH ]');
    const title = photo.title || 'Achievement';
    const org = photo.organization || photo.org || '';
    const fallbackSrc = imgSrc.startsWith('/public/') ? imgSrc : `/public${imgSrc}`;
    const fallbackSvg = `if(!this.dataset.retried){this.dataset.retried=true;this.src='${fallbackSrc}';}`;

    return `
      <div class="photo-card glass-card" data-index="${index}" data-cursor="VIEW">
        <div class="photo-card-inner">
          <img src="${imgSrc}" alt="${title}" class="photo-card-img" loading="lazy" onerror="${fallbackSvg}" />
          <div class="photo-card-overlay">
            <span class="photo-card-tag">${tag}</span>
            <div class="photo-card-view-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>VIEW</span>
            </div>
            <div class="photo-card-info">
              <div class="photo-card-title">${title}</div>
              <div class="photo-card-sub">${org}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function updateTracks(filteredList) {
    if (!filteredList || !filteredList.length) {
      const emptyMsg = currentCategory === 'internship'
        ? 'No internship achievements added yet.'
        : `Upload photos to public/${currentCategory}/ and add them to achievementsPhotoData.js`;
      track.innerHTML = `
        <div class="album-empty-msg glass-card">
          <span class="empty-tag">[ NO PHOTOS IN THIS CATEGORY ]</span>
          <p class="empty-sub">${emptyMsg}</p>
        </div>
      `;
      return;
    }
    activePhotosList = filteredList;

    let trackHtml = '';
    if (currentCategory === 'internship' || currentCategory === 'certificates' || filteredList.length <= 3) {
      trackHtml = filteredList.map((p, i) => renderPhotoCard(p, i)).join('');
    } else {
      // Ensure enough items in the track for smooth continuous infinite marquee
      let list = [...filteredList];
      while (list.length < 8) {
        list = list.concat(filteredList);
      }

      // Duplicate list items once for seamless 0% -> -50% infinite loop
      trackHtml = list.map((p, i) => renderPhotoCard(p, i % filteredList.length)).join('') +
        list.map((p, i) => renderPhotoCard(p, i % filteredList.length)).join('');
    }

    track.innerHTML = trackHtml;
    attachCardClickListeners();
  }

  function attachCardClickListeners() {
    track.querySelectorAll('.photo-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(idx) && activePhotosList[idx]) {
          openLightbox(idx);
        }
      });
    });
  }

  function openLightbox(index) {
    lightboxIndex = index;
    const photo = activePhotosList[lightboxIndex];
    if (!photo || !lightbox) return;

    lightboxImg.src = normalizePath(photo.image || photo.src);
    lightboxImg.alt = photo.title || 'Achievement';
    lightboxTitle.textContent = photo.title || '';
    lightboxOrg.textContent = photo.organization || photo.org || '';
    lightboxDate.textContent = photo.date || '';
    lightboxDesc.textContent = photo.desc || '';
    lightboxTag.textContent = photo.tag || '[ CERT ]';

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextPhoto() {
    lightboxIndex = (lightboxIndex + 1) % activePhotosList.length;
    openLightbox(lightboxIndex);
  }

  function showPrevPhoto() {
    lightboxIndex = (lightboxIndex - 1 + activePhotosList.length) % activePhotosList.length;
    openLightbox(lightboxIndex);
  }

  // Filter Button click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.getAttribute('data-category');
      const filtered = currentCategory === 'all'
        ? photos
        : photos.filter(p => (p.category || '').toLowerCase() === (currentCategory || '').toLowerCase());

      updateTracks(filtered);
    });
  });

  // Lightbox controls
  const closeBtn = document.getElementById('lightboxClose');
  const overlay = document.getElementById('lightboxOverlay');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (overlay) overlay.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', showNextPhoto);

  window.addEventListener('keydown', e => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();
    }
  });

  // Initial render of track
  updateTracks(photos);
}

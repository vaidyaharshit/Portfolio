import { icons } from './icons.js';

export function renderModals() {
  return `
    <div class="modal-overlay" id="projectModal">
      <div class="modal-content glass-card">
        <button class="modal-close" id="modalClose" aria-label="Close modal">
          ${icons.close}
        </button>
        <div class="modal-body" id="modalBody"></div>
      </div>
    </div>

    <div class="cert-modal-overlay" id="certModal">
      <div class="cert-modal-content glass-card">
        <button class="cert-modal-close" id="certModalClose" aria-label="Close certificate modal">
          ${icons.close}
        </button>
        <div class="cert-modal-body" id="certModalBody"></div>
      </div>
    </div>

    <button class="back-to-top" id="backToTop" aria-label="Back to top">
      ${icons.chevronUp}
    </button>
  `;
}

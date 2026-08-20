import { contactData } from '../data/contactData.js';
import { icons } from '../components/icons.js';

export function renderContact() {
  const d = contactData;
  const methodIcons = {
    email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${d.methods[0].iconColor}" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>`,
    github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${d.methods[1].iconColor}" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
    linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${d.methods[2].iconColor}" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${d.methods[3].iconColor}" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>`,
  };

  return `
    <section id="contact" class="section contact-section">
      <div class="contact-glow-bg"></div>
      <div class="contact-particles" id="contactParticles"></div>
      <div class="container">
        <div class="section-header reveal-item" data-reveal-direction="up">
          <span class="section-tag">${d.tag}</span>
          <span class="section-index">${d.index}</span>
          <h2 class="section-title">${d.title} <span class="text-gradient">${d.titleGradient}</span>.</h2>
          <p class="section-sub">${d.subtitle}</p>
        </div>

        <div class="contact-grid">
          <div class="contact-info reveal-item" data-reveal-direction="left">
            <div class="contact-card glass-card">
              <h3>${d.cardTitle}</h3>
              <p>${d.cardDescription}</p>

              <div class="contact-methods">
                ${d.methods.map(m => `
                  <a href="${m.href}" class="contact-method" ${m.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                    <div class="cm-icon">${methodIcons[m.icon]}</div>
                    <div class="cm-details">
                      <span class="cm-label">${m.label}</span>
                      <span class="cm-value">${m.value}</span>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="contact-form-col reveal-item" data-reveal-direction="right">
            <form class="contact-form glass-card" id="contactForm">
              <div class="form-group">
                <label for="name">${d.form.nameLabel}</label>
                <input type="text" id="name" name="name" placeholder="${d.form.namePlaceholder}" required>
              </div>
              <div class="form-group">
                <label for="email">${d.form.emailLabel}</label>
                <input type="email" id="email" name="email" placeholder="${d.form.emailPlaceholder}" required>
              </div>
              <div class="form-group">
                <label for="subject">${d.form.subjectLabel}</label>
                <input type="text" id="subject" name="subject" placeholder="${d.form.subjectPlaceholder}" required>
              </div>
              <div class="form-group">
                <label for="message">${d.form.messageLabel}</label>
                <textarea id="message" name="message" rows="5" placeholder="${d.form.messagePlaceholder}" required></textarea>
              </div>
              <button type="submit" class="btn btn-glow btn-block">
                <span>${d.form.submitText}</span>
                ${icons.send}
              </button>
            </form>
            <div class="form-toast" id="formToast">
              <span class="toast-icon">${d.toast.icon}</span>
              <div class="toast-text"><strong>${d.toast.title}</strong><span>${d.toast.message}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

import { contactData } from '../data/contactData.js';

export function renderContact() {
  const d = contactData;

  return `
    <section id="contact" class="section contact-section">
      <div class="container">
        <div class="contact-card">
          <h2 class="contact-title">Let's Connect</h2>
          <p class="contact-desc">
            I am always open to discussing new projects, internship opportunities, technical collaborations, or answering your questions.
          </p>

          <div class="contact-links-grid">
            <a href="mailto:${d.email}" class="btn btn-primary">
              Send Email
            </a>
            <a href="${d.github}" target="_blank" rel="noopener" class="btn btn-secondary">
              GitHub Profile
            </a>
            <a href="${d.linkedin}" target="_blank" rel="noopener" class="btn btn-secondary">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

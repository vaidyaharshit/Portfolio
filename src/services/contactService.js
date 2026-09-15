/* ==========================================================================
   CONTACT SERVICE — real email delivery via Web3Forms
   --------------------------------------------------------------------------
   POSTs the visitor's message to https://api.web3forms.com/submit, which
   forwards it to the inbox configured by WEB3FORMS_ACCESS_KEY (src/env.js).

   Success is ONLY reported when the API itself responds { success: true }.
   Any failure (network, timeout, non-2xx, success:false) throws so the UI
   can show a retry state instead of a fake confirmation.
   ========================================================================== */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const REQUEST_TIMEOUT_MS = 20000;

/* Development-only verbose logging: active on localhost, silent in production.
   Never prints the Access Key itself — only its presence and length. */
const DEBUG_CONTACT = typeof location !== 'undefined'
  && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
function dbg(label, details) {
  if (!DEBUG_CONTACT) return;
  console.log(`[Web3Forms] ${label}`, details !== undefined ? details : '');
}

export class ContactDeliveryError extends Error {
  constructor(code, details) {
    super(code);
    this.name = 'ContactDeliveryError';
    this.code = code;
    this.details = details;
  }
}

function getEnv() {
  const env = (typeof window !== 'undefined' && window.__ENV__) || {};
  return {
    accessKey: env.WEB3FORMS_ACCESS_KEY || '',
    captchaEnabled: /^(1|true|yes|on)$/i.test(String(env.WEB3FORMS_CAPTCHA || '').trim()),
  };
}

export function isContactConfigured() {
  return getEnv().accessKey.trim().length > 0;
}

export function hasContactCaptcha() {
  return getEnv().captchaEnabled;
}

/**
 * Sends a contact message. Resolves only on confirmed delivery.
 * @param {FormData} formData - fields collected from #contactForm
 *   (name, email, subject, message + any captcha fields).
 * @throws {ContactDeliveryError} on timeout / network / rejected submission
 */
export async function sendContactMessage(formData) {
  const { accessKey } = getEnv();

  if (!accessKey) {
    throw new ContactDeliveryError('NOT_CONFIGURED',
      'WEB3FORMS_ACCESS_KEY is empty in src/env.js -> open https://web3forms.com , enter your inbox address, and paste the Access Key they email you into src/env.js');
  }
  dbg('Request started | access key present: true | key length:', accessKey.length);

  const subject = String(formData.get('subject') || '').trim();
  const payload = {
    access_key: accessKey,
    from_name: 'Portfolio Contact Form',
    subject: `Portfolio Contact: ${subject}`,
  };

  /* Merge real form fields (skips honeypot + fields already set above);
     also carries the h-captcha-response field when captcha is enabled. */
  for (const [key, value] of formData.entries()) {
    if (key === 'botcheck' || key === 'access_key' || key === 'subject') continue;
    if (typeof value === 'string') payload[key] = value;
  }
  dbg('Payload fields:', Object.keys(payload).join(', '));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    let response;
    try {
      response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err) {
      if (err && err.name === 'AbortError') {
        throw new ContactDeliveryError('TIMEOUT', `Request exceeded ${REQUEST_TIMEOUT_MS}ms`);
      }
      throw new ContactDeliveryError('NETWORK', err);
    }

    let body = null;
    try { body = await response.json(); } catch { /* non-JSON body handled below */ }

    dbg(`HTTP status: ${response.status}`);
    dbg('Response:', JSON.stringify(body));
    dbg('success value:', body ? body.success : '(no JSON body)');

    if (!response.ok || !body || body.success !== true) {
      throw new ContactDeliveryError('REJECTED', {
        status: response.status,
        apiMessage: body ? (body.message || (body.body && body.body.message)) : '(non-JSON response)',
      });
    }

    dbg('Result: SUCCESS — Web3Forms confirmed the submission');
    return body;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Optionally loads the Web3Forms hCaptcha client script (only when
 * WEB3FORMS_CAPTCHA is enabled in src/env.js). Safe to call unconditionally.
 * Also enable "Block Spam -> hCaptcha" in your web3forms.com dashboard.
 */
export function initContactCaptcha() {
  if (!hasContactCaptcha()) return;
  if (!document.querySelector('.h-captcha')) return;
  if (document.querySelector('script[data-web3forms-client]')) return;
  const s = document.createElement('script');
  s.src = 'https://web3forms.com/client/script.js';
  s.defer = true;
  s.setAttribute('data-web3forms-client', '');
  document.head.appendChild(s);
}

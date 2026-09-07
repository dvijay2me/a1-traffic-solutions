// A1 Traffic Solutions — site script

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Contact form — normal Formspree POST in a hidden iframe so Formspree CAPTCHA works
  // without navigating the visitor away from the Contact page.
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');
    var frameName = form.getAttribute('target');
    var frame = frameName ? document.querySelector('iframe[name="' + frameName + '"]') : null;
    var submitting = false;

    form.addEventListener('submit', function () {
      // Let the browser/Formspree handle the actual POST and CAPTCHA.
      if (submitting) return;
      submitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      showStatus(statusEl, 'ok', 'Sending your message…');
    });

    if (frame) {
      frame.addEventListener('load', function () {
        if (!submitting) return;

        // Formspree redirects to the Contact page with ?sent=1 after success.
        // The redirected page is same-origin, so its URL can be inspected safely.
        try {
          var url = frame.contentWindow.location.href;
          if (url.indexOf('sent=1') !== -1) {
            form.reset();
            showContactSuccessPopup();
            showStatus(statusEl, 'ok', 'Thanks — your message has been sent. We’ll reply within 24 hours.');
            submitting = false;
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
          }
        } catch (err) {
          // Cross-origin Formspree/CAPTCHA intermediate pages are expected.
          // Wait for the final redirect back to our same-origin Contact page.
        }
      });
    }
  });

  function showContactSuccessPopup() {
    var existing = document.getElementById('contact-success-popup');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'contact-success-popup';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<div class="contact-success-dialog">' +
        '<button type="button" class="contact-success-close" aria-label="Close">&times;</button>' +
        '<div class="contact-success-icon">✓</div>' +
        '<h3>Message sent successfully</h3>' +
        '<p>Thank you for contacting A1 Traffic Solutions. We have received your message and will get back to you within 24 hours.</p>' +
        '<button type="button" class="btn btn-primary contact-success-ok">OK</button>' +
      '</div>';

    document.body.appendChild(overlay);
    var close = function () { overlay.remove(); };
    overlay.querySelector('.contact-success-close').addEventListener('click', close);
    overlay.querySelector('.contact-success-ok').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  }

  function showStatus(el, kind, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('ok', 'err');
    el.classList.add('show', kind);
  }

  function openMailtoFallback(form) {
    var name = (form.querySelector('[name="name"]') || {}).value || '';
    var email = (form.querySelector('[name="email"]') || {}).value || '';
    var messageField = form.querySelector('[name="message"]') || {};
    var message = messageField.value || '';
    var subjectField = form.querySelector('[name="subject"]');
    var subject = subjectField ? subjectField.value : 'Website enquiry';

    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    var mailto = 'mailto:info@a1traffic-solutions.com'
      + '?subject=' + encodeURIComponent(subject || 'Website enquiry')
      + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
  }

});

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

  // Contact form — submit directly to Formspree.
  // Do NOT intercept this submission with fetch(): Formspree's managed CAPTCHA
  // flow needs the normal browser form POST/redirect.
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function () {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      showStatus(statusEl, 'ok', 'Sending your message…');
      // Intentionally no preventDefault(): the browser posts to Formspree
      // so Formspree can perform its configured CAPTCHA/spam checks.
    });
  });

  // If Formspree is configured to redirect back to the site with ?sent=1,
  // show a confirmation message without interfering with the form POST.
  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    var sentStatus = document.querySelector('[data-contact-form] .form-status');
    showStatus(sentStatus, 'ok', 'Thanks — your message has been sent. We’ll reply within 24 hours.');
  }

  function showStatus(el, kind, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('ok', 'err');
    el.classList.add('show', kind);
  }


});

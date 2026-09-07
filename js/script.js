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

  // Contact form(s) — works with any form marked data-contact-form
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = form.getAttribute('action') || '';
      var placeholder = action.indexOf('YOUR_FORM_ID') !== -1;

      if (placeholder) {
        // Formspree endpoint hasn't been configured yet — fall back to a mailto draft
        // so the message is never silently lost. See README.md, "Activate the contact form".
        openMailtoFallback(form);
        showStatus(statusEl, 'err',
          'Online sending isn\u2019t set up yet, so we\u2019ve opened your email app instead. ' +
          'See README.md to enable direct sending.');
        return;
      }

      var data = new FormData(form);
      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          showStatus(statusEl, 'ok', 'Thanks — your message has been sent. We\u2019ll reply within 24 hours.');
          form.reset();
        } else {
          return response.json().then(function (json) {
            throw new Error((json && json.errors) ? json.errors.map(function (er) { return er.message; }).join(', ') : 'Send failed');
          });
        }
      }).catch(function () {
        openMailtoFallback(form);
        showStatus(statusEl, 'err', 'We couldn\u2019t send that automatically, so we\u2019ve opened your email app instead.');
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      });
    });
  });

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

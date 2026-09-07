// A1 Traffic Solutions — site script
(function () {
  'use strict';

  /* =========================================================
     Tawk.to — site-wide live chat
     ========================================================= */
  if (!window.__A1_TAWK_LOADED__) {
    window.__A1_TAWK_LOADED__ = true;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    var tawkScript = document.createElement('script');
    var firstScript = document.getElementsByTagName('script')[0];

    tawkScript.async = true;
    tawkScript.src = 'https://embed.tawk.to/67f75d916fa3fa190f6e21fa/1iof4b1a5';
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');

    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tawkScript, firstScript);
    } else {
      document.head.appendChild(tawkScript);
    }
  }

  /* =========================================================
     Formspree AJAX — contact form
     Uses Formspree's official AJAX library instead of a
     custom fetch() implementation, so Formspree CAPTCHA/
     spam protection can be handled correctly.
     ========================================================= */
  function loadFormspree() {
    var forms = document.querySelectorAll('[data-contact-form]');
    if (!forms.length) return;

    var form = forms[0];

    // Give the existing form a stable ID for Formspree AJAX.
    if (!form.id) {
      form.id = 'contact-form';
    }

    // Remove the old custom submit handler marker behavior.
    form.removeAttribute('novalidate');

    // Initialize Formspree's official AJAX loader queue.
    window.formspree = window.formspree || function () {
      (window.formspree.q = window.formspree.q || []).push(arguments);
    };

    window.formspree('initForm', {
      formElement: '#' + form.id,
      formId: 'xoeqkqnl',

      onInit: function () {
        var button = form.querySelector('button[type="submit"]');
        if (button) button.dataset.originalText = button.textContent;
      },

      onSubmit: function () {
        var button = form.querySelector('button[type="submit"]');
        if (button) {
          button.disabled = true;
          button.textContent = 'Sending…';
        }
      },

      onSuccess: function () {
        var button = form.querySelector('button[type="submit"]');
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'Send Message';
        }

        form.reset();
        showSuccessPopup();
      },

      onError: function (context, error) {
        var button = form.querySelector('button[type="submit"]');
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'Send Message';
        }

        showFormError(form, getFormErrorMessage(error));
      },

      onFailure: function (context, error) {
        var button = form.querySelector('button[type="submit"]');
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'Send Message';
        }

        showFormError(
          form,
          'We could not send your message right now. Please try again in a moment.'
        );
      }
    });

    // Load Formspree's official AJAX library once.
    if (!document.querySelector('script[data-formspree-ajax]')) {
      var fsScript = document.createElement('script');
      fsScript.src = 'https://unpkg.com/@formspree/ajax@1';
      fsScript.defer = true;
      fsScript.setAttribute('data-formspree-ajax', 'true');
      document.head.appendChild(fsScript);
    }
  }

  function getFormErrorMessage(error) {
    if (error && error.errors && error.errors.length) {
      return error.errors.map(function (item) {
        return item.message || 'Please check the form and try again.';
      }).join(' ');
    }

    if (error && error.message) {
      return error.message;
    }

    return 'Please check the form and try again.';
  }

  function showFormError(form, message) {
    var status = form.querySelector('.form-status');

    if (status) {
      status.textContent = message;
      status.classList.remove('ok');
      status.classList.add('show', 'err');
      return;
    }

    alert(message);
  }

  function showSuccessPopup() {
    var existing = document.getElementById('a1-form-success-popup');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'a1-form-success-popup';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'a1-form-success-title');

    overlay.innerHTML =
      '<div class="a1-success-popup-backdrop"></div>' +
      '<div class="a1-success-popup-box">' +
        '<button type="button" class="a1-success-popup-close" aria-label="Close">×</button>' +
        '<div class="a1-success-popup-icon">✓</div>' +
        '<h3 id="a1-form-success-title">Message Sent Successfully</h3>' +
        '<p>Thank you for contacting A1 Traffic Solutions. Your message has been received successfully. We will get back to you soon.</p>' +
        '<button type="button" class="a1-success-popup-ok">OK</button>' +
      '</div>';

    var style = document.createElement('style');
    style.id = 'a1-form-success-popup-style';
    style.textContent =
      '#a1-form-success-popup{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px}' +
      '.a1-success-popup-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.62);backdrop-filter:blur(3px)}' +
      '.a1-success-popup-box{position:relative;z-index:1;width:min(460px,100%);background:#fff;border-radius:18px;padding:36px 30px 30px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.28);font-family:inherit}' +
      '.a1-success-popup-icon{width:64px;height:64px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e9f8ef;color:#16834b;font-size:34px;font-weight:700}' +
      '.a1-success-popup-box h3{margin:0 0 10px;font-size:24px;color:#162033}' +
      '.a1-success-popup-box p{margin:0 auto 24px;line-height:1.6;color:#5b6575;font-size:15px}' +
      '.a1-success-popup-ok{border:0;border-radius:8px;padding:11px 30px;background:#1b5cff;color:#fff;font-weight:600;cursor:pointer;font-size:15px}' +
      '.a1-success-popup-close{position:absolute;right:14px;top:10px;border:0;background:transparent;color:#6b7280;font-size:28px;line-height:1;cursor:pointer}';

    if (!document.getElementById('a1-form-success-popup-style')) {
      document.head.appendChild(style);
    }

    document.body.appendChild(overlay);

    function closePopup() {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }

    function escHandler(event) {
      if (event.key === 'Escape') closePopup();
    }

    overlay.querySelector('.a1-success-popup-close').addEventListener('click', closePopup);
    overlay.querySelector('.a1-success-popup-ok').addEventListener('click', closePopup);
    overlay.querySelector('.a1-success-popup-backdrop').addEventListener('click', closePopup);
    document.addEventListener('keydown', escHandler);

    setTimeout(function () {
      var ok = overlay.querySelector('.a1-success-popup-ok');
      if (ok) ok.focus();
    }, 50);
  }

  /* =========================================================
     Mobile navigation
     ========================================================= */
  function setupMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function init() {
    setupMobileNav();
    loadFormspree();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

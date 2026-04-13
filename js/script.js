(() => {
  const doc = document;
  const body = doc.body;
  const year = doc.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const storage = {
    get(key, fallback) {
      try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch {}
    }
  };

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storage.get('myvisitself-theme', prefersDark ? 'dark' : 'light');
  body.dataset.theme = initialTheme;

  const themeBtn = doc.querySelector('[data-theme-toggle]');
  const themeLabel = doc.querySelector('[data-theme-label]');
  const themeTexts = {
    dark: themeBtn?.dataset.labelDark || 'Dark',
    light: themeBtn?.dataset.labelLight || 'Light'
  };

  function syncThemeLabel() {
    if (!themeBtn) return;
    const currentTheme = body.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (themeLabel) themeLabel.textContent = themeTexts[nextTheme] || themeTexts.light;
    themeBtn.setAttribute('aria-label', themeBtn.dataset.aria || 'Toggle theme');
    themeBtn.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  }

  syncThemeLabel();

  themeBtn?.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    storage.set('myvisitself-theme', body.dataset.theme);
    syncThemeLabel();
  });

  const mobileToggle = doc.querySelector('[data-mobile-toggle]');
  const mobileMenu = doc.querySelector('[data-mobile-menu]');
  mobileToggle?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  doc.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('[data-mobile-menu] a');
    if (link && mobileMenu?.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const decorNoSelect = '.brand, .nav, .lang-switch, .icon-btn, .mobile-menu, .kicker, .primary-btn, .secondary-btn, .visual-card, .visual-pill, .tech-pill, .section__eyebrow, .contact-chip, .payment-chip, .socials a, .visual-portrait, .payments img';
  doc.addEventListener('selectstart', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(decorNoSelect)) event.preventDefault();
  });

  doc.addEventListener('dragstart', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(decorNoSelect)) event.preventDefault();
  });

  const sections = [...doc.querySelectorAll('main section[id]')];
  const navLinks = [...doc.querySelectorAll('[data-nav-link]')];
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveLink(visible.target.id);
    }, {
      rootMargin: '-30% 0px -45% 0px',
      threshold: [0.15, 0.3, 0.5, 0.8]
    });
    sections.forEach((section) => observer.observe(section));
  }

  const revealNodes = [...doc.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && revealNodes.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
    revealNodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index * 40, 220)}ms`;
      revealObserver.observe(node);
    });
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  const tiltCard = doc.querySelector('[data-tilt-card]');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (tiltCard && !prefersReduced) {
    const reset = () => { tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0,0,0)'; };
    tiltCard.addEventListener('pointermove', (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 10;
      const ry = (px - 0.5) * 12;
      tiltCard.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(0,-2px,0)`;
    });
    tiltCard.addEventListener('pointerleave', reset);
    tiltCard.addEventListener('pointercancel', reset);
  }

  const copyBtn = doc.querySelector('[data-copy-message]');
  const copyStatus = doc.querySelector('[data-copy-status]');
  copyBtn?.addEventListener('click', async () => {
    const message = copyBtn.dataset.copyText || '';
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      if (copyStatus) copyStatus.textContent = copyBtn.dataset.success || 'Copied';
      window.setTimeout(() => { if (copyStatus) copyStatus.textContent = ''; }, 2200);
    } catch {
      if (copyStatus) copyStatus.textContent = copyBtn.dataset.fail || 'Copy failed';
      window.setTimeout(() => { if (copyStatus) copyStatus.textContent = ''; }, 2200);
    }
  });

  const accentRange = doc.querySelector('[data-accent-range]');
  const accentValue = doc.querySelector('[data-accent-value]');
  const rootStyle = doc.documentElement.style;
  const initialAccent = storage.get('myvisitself-accent', '176');
  if (accentRange instanceof HTMLInputElement) {
    accentRange.value = initialAccent;
    rootStyle.setProperty('--accent', `hsl(${initialAccent} 60% 55%)`);
    if (accentValue) accentValue.textContent = `${initialAccent}°`;
    accentRange.addEventListener('input', () => {
      const value = accentRange.value;
      rootStyle.setProperty('--accent', `hsl(${value} 60% 55%)`);
      if (accentValue) accentValue.textContent = `${value}°`;
      storage.set('myvisitself-accent', value);
    });
  }

  const METRICA_ID = 107723810;
  let metricaLoaded = false;
  function loadMetrica() {
    if (metricaLoaded || doc.querySelector(`script[src*="mc.yandex.ru/metrika/tag.js"]`)) return;
    metricaLoaded = true;
    window.ym = window.ym || function() { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = 1 * new Date();
    const script = doc.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    const firstScript = doc.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else doc.head.appendChild(script);
    window.ym(METRICA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,
    });
  }

  const cookieBanner = doc.querySelector('[data-cookie-banner]');
  const cookieAccept = doc.querySelector('[data-cookie-accept]');
  const cookieDecline = doc.querySelector('[data-cookie-decline]');
  const cookieSettingsBtns = [...doc.querySelectorAll('[data-open-cookie-settings]')];
  const consentState = storage.get('myvisitself-cookie-consent', 'pending');

  function showCookieBanner() {
    if (cookieBanner) cookieBanner.hidden = false;
  }
  function hideCookieBanner() {
    if (cookieBanner) cookieBanner.hidden = true;
  }
  function applyConsent(value) {
    storage.set('myvisitself-cookie-consent', value);
    if (value === 'accepted') loadMetrica();
    hideCookieBanner();
  }

  if (consentState === 'accepted') loadMetrica();
  if (consentState === 'pending' && cookieBanner) showCookieBanner();

  cookieAccept?.addEventListener('click', () => applyConsent('accepted'));
  cookieDecline?.addEventListener('click', () => applyConsent('rejected'));
  cookieSettingsBtns.forEach((btn) => btn.addEventListener('click', () => showCookieBanner()));

  const form = doc.querySelector('[data-contact-form]');
  const formStatus = doc.querySelector('[data-form-status]');
  const submitBtn = doc.querySelector('[data-submit-button]');
  const formStartedAt = doc.querySelector('[data-form-started-at]');

  function resetFormStartedAt() {
    if (formStartedAt instanceof HTMLInputElement) formStartedAt.value = String(Date.now());
  }

  resetFormStartedAt();

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.reportValidity()) return;

    const action = form.getAttribute('action');
    if (!action) return;
    const data = new FormData(form);

    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = true;
      submitBtn.dataset.original = submitBtn.textContent || '';
      submitBtn.textContent = submitBtn.dataset.sending || 'Sending…';
    }

    if (formStatus) {
      formStatus.textContent = '';
      formStatus.classList.remove('is-error', 'is-success');
    }

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        body: data,
      });

      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'request failed');
      }

      form.reset();
      resetFormStartedAt();

      if (formStatus) {
        formStatus.textContent = result.message || formStatus.dataset.success || 'Sent successfully';
        formStatus.classList.add('is-success');
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = error instanceof Error && error.message
          ? error.message
          : (formStatus.dataset.error || 'Failed to send');
        formStatus.classList.add('is-error');
      }
      resetFormStartedAt();
    } finally {
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.original || submitBtn.textContent || 'Send';
      }
    }
  });
})();

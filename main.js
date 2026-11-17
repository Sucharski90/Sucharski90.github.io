(() => {
  'use strict';
  function initializePortfolio() {
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('site-nav');
    const copyButton = document.getElementById('copy-email');
    const year = document.getElementById('copyright-year');
    const progressFill = document.getElementById('scroll-progress-fill');
    if (year) year.textContent = String(new Date().getFullYear());

    const closeMenu = () => {
      if (!nav || !navToggle) return;
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    };
    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const open = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
      window.addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); }, { passive: true });
    }

    if (copyButton) {
      copyButton.addEventListener('click', async () => {
        const address = 'mvsucharski@gmail.com';
        let didCopy = false;
        try {
          if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(address); didCopy = true; }
        } catch (e) { /* File URLs can block clipboard permissions. */ }
        if (!didCopy) {
          const field = document.createElement('textarea');
          field.value = address;
          field.style.position = 'fixed'; field.style.opacity = '0';
          document.body.appendChild(field); field.focus(); field.select();
          try { didCopy = document.execCommand('copy'); } catch (e) { didCopy = false; }
          field.remove();
        }
        const original = copyButton.innerHTML;
        copyButton.textContent = didCopy ? 'Email copied ✓' : address;
        window.setTimeout(() => { copyButton.innerHTML = original; }, 2400);
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        if (progressFill) progressFill.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / max))})`;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 900) {
          const shift = Math.min(18, window.scrollY * .035);
          doc.style.setProperty('--hero-shift', `${shift}px`);
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const elements = document.querySelectorAll('.case, .email-card, .mini-card, .skill-panel, .systems-diagram');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
      elements.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 60}ms`);
        observer.observe(el);
      });
      document.documentElement.classList.add('scroll-animated');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializePortfolio);
  else initializePortfolio();
})();

(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const nav = document.querySelector('nav, header, .navbar');
      const offset = nav ? nav.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });

  if (!reducedMotion) {
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
      const siblings = [...el.parentElement.querySelectorAll(':scope > .fade-in, :scope > .slide-up')];
      const i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty('--i', i);
    });

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
      el.classList.add('active');
    });
  }

  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  }
})();
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;

  const selector = [
    '.section-title-wrap', '.message-text > *', '.works-item', '.btn-wrap',
    '.skills-lead', '.skills-heading-wrapper', '.skills-card',
    '.about-image', '.about-content', '.contact-lead', '.form-group',
    '.form-agreement', '.form-submit-area', '.footer',
    '.section-header-aboutme', '.profile-card', '.history-title',
    '.timeline-item', '.sub-card', '.strengths-header', '.strength-card',
    '.belief-panel', '.detail-title', '.detail-tags', '.detail-main-img',
    '.detail-summary-box', '.detail-toc-box', '.detail-section > *',
    '.point-block', '.section-title-privacy', '.privacy-content > *'
  ].join(',');
  // Animate each block only once; do not stack effects on nested targets.
  const targets = [...document.querySelectorAll(selector)].filter(
    element => !element.parentElement.closest(selector)
  );
  const reveal = element => {
    element.classList.remove('scroll-reveal-pending');
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target);
    });
  }, { rootMargin: '0px 0px -32px 0px', threshold: 0 });

  targets.forEach(element => {
    // Preserve the initial view, including restored scroll and anchor positions.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('scroll-reveal', 'scroll-reveal-pending');
    observer.observe(element);
  });

  // Keyboard navigation must never land on an invisible control.
  document.addEventListener('focusin', event => {
    const element = event.target.closest('.scroll-reveal-pending');
    if (element) reveal(element);
  });
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    targets.forEach(reveal);
    observer.disconnect();
  });
})();

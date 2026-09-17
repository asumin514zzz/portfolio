(() => {
  const button = document.querySelector('#js-hamburger');
  const nav = document.querySelector('#js-nav');
  if (!button || !nav) return;
  const mobile = window.matchMedia('(max-width: 1024px)');
  // Keep the fixed menu outside animated or clipped page containers.
  document.body.append(button, nav);
  const setOpen = (open, restoreFocus = false) => {
    open = mobile.matches && open;
    button.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.inert = mobile.matches && !open;
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) button.focus();
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') || event.target === nav) setOpen(false, mobile.matches);
  });
  document.addEventListener('keydown', (event) => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setOpen(false, true);
    if (event.key === 'Tab') {
      const items = [button, ...nav.querySelectorAll('a[href]')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
  setOpen(false);
})();

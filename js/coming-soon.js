(() => {
  const trigger = document.querySelector('#works-more');
  const dialog = document.querySelector('#coming-soon');
  if (!trigger || !dialog) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
  dialog.querySelector('.coming-soon__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    trigger.focus({ preventScroll: true });
  });
})();

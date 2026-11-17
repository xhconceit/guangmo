/* Shared progressive theme transition; storage and accessible labels stay with each page. */
window.animateTheme = async function (button, apply) {
  if (button.dataset.themeBusy) return;
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply();
    return;
  }
  button.dataset.themeBusy = 'true';
  const bounds = button.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(apply);
  try {
    await transition.ready;
    const style = getComputedStyle(document.documentElement);
    await document.documentElement.animate({
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
    }, {
      duration: parseFloat(style.getPropertyValue('--duration-theme')),
      easing: style.getPropertyValue('--ease-theme').trim(),
      pseudoElement: '::view-transition-new(root)',
    }).finished;
  } catch {
    // A skipped/interrupted transition still commits the requested theme.
  } finally {
    delete button.dataset.themeBusy;
  }
};

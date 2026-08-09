/**
 * Diwali Sale Banner — lightweight init
 * Adds loaded state and randomizes particle timing for organic feel.
 */
(function initDiwaliBanner() {
  const banner = document.getElementById('diwali-sale-banner');
  if (!banner) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    banner.classList.add('dsb-reduced-motion', 'dsb-loaded');
    return;
  }

  /* Stagger particle positions slightly via JS for natural variation */
  banner.querySelectorAll('.dsb-particles span').forEach((particle) => {
    const offset = (Math.random() - 0.5) * 8;
    const baseLeft = parseFloat(particle.style.left) || 0;
    if (!particle.style.left) {
      const computed = getComputedStyle(particle).left;
      if (computed && computed !== 'auto') {
        particle.style.left = `calc(${computed} + ${offset}px)`;
      }
    }
    particle.style.animationDuration = `${5 + Math.random() * 4}s`;
  });

  requestAnimationFrame(() => {
    banner.classList.add('dsb-loaded');
  });
})();

/**
 * Diwali Sale Banner — init loaded state, parallax & reduced-motion support
 */
(function initDiwaliBanner() {
  const banner = document.getElementById('diwali-sale-banner');
  if (!banner) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    banner.classList.add('dsb-reduced-motion', 'dsb-loaded');
    return;
  }

  banner.querySelectorAll('.dsb-particles span').forEach((particle) => {
    particle.style.animationDuration = `${5 + Math.random() * 4}s`;
  });

  const sweep = banner.querySelector('.dsb-panel-sweep');
  if (sweep) {
    sweep.style.animationDuration = `${5 + Math.random() * 2}s`;
  }

  let parallaxRaf = null;
  const resetParallax = () => {
    banner.style.setProperty('--parallax-x', '0px');
    banner.style.setProperty('--parallax-y', '0px');
  };

  const handlePointerMove = (event) => {
    if (parallaxRaf) return;
    parallaxRaf = requestAnimationFrame(() => {
      const rect = banner.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      banner.style.setProperty('--parallax-x', `${x * 12}px`);
      banner.style.setProperty('--parallax-y', `${y * 8}px`);
      parallaxRaf = null;
    });
  };

  banner.addEventListener('mousemove', handlePointerMove);
  banner.addEventListener('mouseleave', resetParallax);

  requestAnimationFrame(() => banner.classList.add('dsb-loaded'));
})();

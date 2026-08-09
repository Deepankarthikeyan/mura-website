document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initProductTabs();
  initCountdown();
  initTestimonialSlider();
});

function initHeroSlider() {
  if (typeof Swiper === 'undefined' || !document.querySelector('.hero-swiper')) return;
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: {
      nextEl: '.hero-swiper .swiper-button-next',
      prevEl: '.hero-swiper .swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
  });
}

function initProductTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  const panes = document.querySelectorAll('.tab-pane');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

function initCountdown() {
  const end = new Date();
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 0);

  function update() {
    const now = new Date();
    const diff = Math.max(0, end - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };
    set('cd-days', days);
    set('cd-hours', hours);
    set('cd-mins', mins);
    set('cd-secs', secs);
  }

  update();
  setInterval(update, 1000);
}

function initTestimonialSlider() {
  if (typeof Swiper === 'undefined' || !document.querySelector('.testimonial-swiper')) return;

  new Swiper('.testimonial-swiper', {
    loop: true,
    speed: 700,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: { delay: 5500, disableOnInteraction: false },
    pagination: { el: '.testimonial-swiper .swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.testimonial-swiper .swiper-button-next',
      prevEl: '.testimonial-swiper .swiper-button-prev',
    },
    slidesPerView: 1,
  });
}


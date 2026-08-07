document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initShopFilters();
  initForms();
  initProductActions();
});

function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

function initShopFilters() {
  const categoryLinks = document.querySelectorAll('.sidebar-list a[data-category]');
  const products = document.querySelectorAll('.shop-products .product-card');
  const resultsText = document.querySelector('.shop-results');

  if (!categoryLinks.length || !products.length) return;

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const category = link.dataset.category;
      let visible = 0;

      products.forEach(product => {
        const match = category === 'all' || product.dataset.category === category;
        product.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      if (resultsText) {
        resultsText.textContent = `Showing ${visible} result${visible !== 1 ? 's' : ''}`;
      }
    });
  });

  const sortSelect = document.querySelector('.shop-sort select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const grid = document.querySelector('.shop-products');
      const cards = Array.from(grid.querySelectorAll('.product-card'));

      cards.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);

        switch (sortSelect.value) {
          case 'price-low': return priceA - priceB;
          case 'price-high': return priceB - priceA;
          case 'name': return a.dataset.name.localeCompare(b.dataset.name);
          default: return 0;
        }
      });

      cards.forEach(card => grid.appendChild(card));
    });
  }

  const filterBtn = document.querySelector('.price-filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const min = parseFloat(document.getElementById('price-min')?.value) || 0;
      const max = parseFloat(document.getElementById('price-max')?.value) || Infinity;
      let visible = 0;

      products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        const match = price >= min && price <= max;
        product.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      if (resultsText) {
        resultsText.textContent = `Showing ${visible} result${visible !== 1 ? 's' : ''}`;
      }
    });
  }
}

function initForms() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Welcome back! Login successful.');
      loginForm.reset();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Thank you! Your message has been sent.');
      contactForm.reset();
    });
  }

  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('You have been subscribed to our newsletter!');
      form.reset();
    });
  });
}

function initProductActions() {
  let cartCount = 0;
  const cartBadge = document.querySelector('.cart-count');

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = 'flex';
      }
      const card = btn.closest('.product-card, .suruchi-product');
      const name = card?.querySelector('.product-name, .suruchi-product-name')?.textContent?.trim() || 'Saree';
      showNotification(`${name} added to cart!`);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      showNotification(btn.classList.contains('active') ? 'Added to wishlist!' : 'Removed from wishlist.');
    });
  });
}

function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: '#903233',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(144,50,51,0.3)',
    zIndex: '10000',
    fontSize: '14px',
    fontWeight: '500',
    animation: 'slideIn 0.3s ease',
    maxWidth: '320px',
  });

  if (!document.getElementById('notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

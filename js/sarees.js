// Shared saree product data — sale sarees only (local images)
const IMG = 'images/sarees';

function sareeProductCard(s, style = 'shop') {
  const badge = s.badge || 'Sale';
  const actions = style === 'bestseller' ? '' : `<div class="suruchi-product-actions">
          <button class="suruchi-action-btn primary add-to-cart" type="button">+ Add to cart</button>
          <button class="suruchi-action-btn wishlist-btn" type="button">♡</button>
        </div>`;
  if (style === 'home' || style === 'bestseller') {
    return `<div class="suruchi-product">
      <div class="suruchi-product-img">
        <a href="shop.html"><img class="img-main" src="${s.img}" alt="${s.name}" loading="lazy"><img class="img-hover" src="${s.img2 || s.img}" alt="${s.name}" loading="lazy"></a>
        <span class="suruchi-product-badge">${badge}</span>
      </div>
      <div class="suruchi-product-info">
        <span class="suruchi-product-cat">${s.cat}</span>
        <h3 class="suruchi-product-name"><a href="shop.html">${s.name}</a></h3>
        <div class="suruchi-product-price"><span class="current">₹${s.price.toLocaleString('en-IN')}</span><span class="old">₹${s.old.toLocaleString('en-IN')}</span></div>
        <div class="suruchi-stars">★★★★★</div>
        ${actions}
      </div>
    </div>`;
  }
  return `<div class="product-card" data-category="${s.category}" data-price="${s.price}" data-name="${s.name}">
    <div class="product-image">
      <img src="${s.img}" alt="${s.name}" loading="lazy">
      <span class="product-badge">${badge}</span>
      <div class="product-actions">
        <button class="product-action-btn wishlist-btn" type="button" aria-label="Wishlist"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg></button>
        <button class="product-action-btn add-to-cart" type="button" aria-label="Add to cart"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"/></svg></button>
      </div>
    </div>
    <div class="product-info">
      <p class="product-category">${s.cat}</p>
      <h3 class="product-name">${s.name}</h3>
      <div class="product-price"><span class="price-current">₹${s.price.toLocaleString('en-IN')}</span><span class="price-original">₹${s.old.toLocaleString('en-IN')}</span></div>
    </div>
  </div>`;
}

const ALL_SAREES = [
  { name: 'Banarasi Silk Saree', cat: 'Silk Saree', category: 'silk', price: 3599, old: 5999, img: `${IMG}/banarasi.jpg`, img2: `${IMG}/paithani.jpg` },
  { name: 'Kanjivaram Silk Saree', cat: 'Kanjivaram', category: 'kanjivaram', price: 4999, old: 7999, img: `${IMG}/kanjivaram.jpg`, img2: `${IMG}/kanchipuram.jpg` },
  { name: 'Cotton Block Print Saree', cat: 'Cotton Saree', category: 'cotton', price: 899, old: 1499, img: `${IMG}/cotton-block.jpg`, img2: `${IMG}/kalamkari.jpg` },
  { name: 'Georgette Party Saree', cat: 'Party Wear', category: 'party', price: 1299, old: 2199, img: `${IMG}/georgette-party.jpg`, img2: `${IMG}/net-party.jpg` },
  { name: 'Chiffon Embroidered Saree', cat: 'Designer Saree', category: 'party', price: 1599, old: 2499, img: `${IMG}/chiffon.jpg`, img2: `${IMG}/organza.jpg` },
  { name: 'Tussar Silk Saree', cat: 'Silk Saree', category: 'silk', price: 2199, old: 3499, img: `${IMG}/tussar.jpg`, img2: `${IMG}/mysore.jpg` },
  { name: 'Patola Silk Saree', cat: 'Silk Saree', category: 'silk', price: 5499, old: 8999, img: `${IMG}/patola.jpg`, img2: `${IMG}/bandhani.jpg` },
  { name: 'Linen Cotton Saree', cat: 'Cotton Saree', category: 'cotton', price: 1099, old: 1799, img: `${IMG}/linen-cotton.jpg`, img2: `${IMG}/cotton-block.jpg` },
  { name: 'Organza Designer Saree', cat: 'Designer Saree', category: 'party', price: 1899, old: 2999, img: `${IMG}/organza.jpg`, img2: `${IMG}/chiffon.jpg` },
  { name: 'Bandhani Silk Saree', cat: 'Silk Saree', category: 'silk', price: 1799, old: 2799, img: `${IMG}/bandhani.jpg`, img2: `${IMG}/patola.jpg` },
  { name: 'Paithani Silk Saree', cat: 'Silk Saree', category: 'silk', price: 6499, old: 9999, img: `${IMG}/paithani.jpg`, img2: `${IMG}/banarasi.jpg`, badge: 'Hot' },
  { name: 'Mysore Silk Saree', cat: 'Silk Saree', category: 'silk', price: 3999, old: 5999, img: `${IMG}/mysore.jpg`, img2: `${IMG}/tussar.jpg` },
  { name: 'Kalamkari Cotton Saree', cat: 'Cotton Saree', category: 'cotton', price: 999, old: 1599, img: `${IMG}/kalamkari.jpg`, img2: `${IMG}/linen-cotton.jpg` },
  { name: 'Net Party Wear Saree', cat: 'Party Wear', category: 'party', price: 1499, old: 2299, img: `${IMG}/net-party.jpg`, img2: `${IMG}/georgette-party.jpg` },
  { name: 'Kanchipuram Silk Saree', cat: 'Kanjivaram', category: 'kanjivaram', price: 5999, old: 8999, img: `${IMG}/kanchipuram.jpg`, img2: `${IMG}/kanjivaram.jpg` },
];

function renderSarees() {
  const shopGrid = document.querySelector('.shop-products[data-render="sarees"]');
  if (shopGrid) {
    shopGrid.innerHTML = ALL_SAREES.map((s) => sareeProductCard(s, 'shop')).join('');
    const results = document.querySelector('.shop-results');
    if (results) results.textContent = `Showing ${ALL_SAREES.length} sarees on sale`;
  }

  const featured = document.getElementById('sarees-featured');
  const trending = document.getElementById('sarees-trending');
  const newArrival = document.getElementById('sarees-newarrival');
  const bestseller = document.getElementById('sarees-bestseller');

  if (featured) featured.innerHTML = ALL_SAREES.filter((s) => s.category === 'silk').map((s) => sareeProductCard(s, 'home')).join('');
  if (trending) trending.innerHTML = ALL_SAREES.filter((s) => s.category === 'cotton').map((s) => sareeProductCard(s, 'home')).join('');
  if (newArrival) newArrival.innerHTML = ALL_SAREES.filter((s) => s.category === 'party' || s.category === 'kanjivaram').map((s) => sareeProductCard(s, 'home')).join('');
  if (bestseller) bestseller.innerHTML = ALL_SAREES.slice(0, 4).map((s) => sareeProductCard(s, 'bestseller')).join('');

  const dealImg = document.querySelector('.deals-product-img img');
  if (dealImg) {
    dealImg.src = ALL_SAREES[0].img;
    dealImg.alt = ALL_SAREES[0].name;
  }

  window.dispatchEvent(new CustomEvent('sarees:ready'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSarees);
} else {
  renderSarees();
}

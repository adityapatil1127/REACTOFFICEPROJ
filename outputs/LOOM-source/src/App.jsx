import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import ProductModal from './components/ProductModal.jsx';
import SubmittedBy from './components/SubmittedBy.jsx';
import Footer from './components/Footer.jsx';
import { products } from './data/products.js';

export default function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('filter');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [cartBusy, setCartBusy] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setPageLoading(false), 1750);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [category, productsLoading, wishlistOnly, query]);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All'
      || product.category === category
      || product.collection === category
      || (category === 'Sale' && product.salePrice);
    const matchesSearch = !query || `${product.name} ${product.category} ${product.collection}`.toLowerCase().includes(query.toLowerCase());
    const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
    return matchesCategory && matchesSearch && matchesWishlist;
  }), [category, query, wishlist, wishlistOnly]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function filterBy(nextCategory) {
    setLoadingType('filter');
    setCategory(nextCategory);
    setQuery('');
    setWishlistOnly(false);
    setProductsLoading(true);
    window.setTimeout(() => setProductsLoading(false), 700);
    window.setTimeout(() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }), 40);
  }

  function searchProducts(searchQuery) {
    setLoadingType('search');
    setCategory('All');
    setWishlistOnly(false);
    setQuery(searchQuery);
    setProductsLoading(true);
    window.setTimeout(() => setProductsLoading(false), 620);
    window.setTimeout(() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }), 40);
  }

  function addToCart(product, size = product.sizes[0]) {
    setCartBusy(true);
    setCart((current) => {
      const match = current.find((item) => item.product.id === product.id && item.size === size);
      return match
        ? current.map((item) => item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, size, quantity: 1 }];
    });
    setAddedId(product.id);
    window.setTimeout(() => { setAddedId(null); setCartBusy(false); }, 850);
  }

  function changeQuantity(productId, size, amount) {
    setCartBusy(true);
    setCart((current) => current
      .map((item) => item.product.id === productId && item.size === size ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
    window.setTimeout(() => setCartBusy(false), 330);
  }

  function toggleWishlist(productId) {
    setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }

  return <>
    {pageLoading && <Loader />}
    <Navbar cartCount={cartCount} wishlistCount={wishlist.length} onCartClick={() => setCartOpen(true)} onWishlistClick={() => { setWishlistOnly((current) => !current); setCategory('All'); setQuery(''); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }); }} onSearch={searchProducts} onNavigateCategory={filterBy} />
    <main>
      <Hero onNewArrivals={() => filterBy('New Arrivals')} />
      <Categories onSelect={filterBy} />
      <section className="shop-section" id="shop">
        <div className="wrap">
          <div className="shop-heading reveal"><div><span className="eyebrow">THE LOOM EDIT</span><h2>{wishlistOnly ? 'Your wishlist' : query ? `Search: “${query}”` : category === 'All' ? 'Everyday, considered' : category}<span className="accent-dot">.</span></h2><p>Thoughtful essentials. Made to move with you.</p></div><span className="section-count">{productsLoading ? 'LOADING' : `${visibleProducts.length} PIECES`}</span></div>
          <div className="shop-toolbar"><div className="filter-list">{['All', 'Men', 'Women', 'New Arrivals', 'Sale'].map((filter) => <button type="button" className={category === filter && !wishlistOnly ? 'filter-chip active' : 'filter-chip'} key={filter} onClick={() => filterBy(filter)}>{filter}</button>)}</div>{productsLoading && <span className="filter-spinner" aria-label="Loading filtered products" />}</div>
          <ProductGrid products={visibleProducts} loading={productsLoading} loadingType={loadingType} wishlist={wishlist} onWishlist={toggleWishlist} onAdd={addToCart} onDetails={setActiveProduct} addedId={addedId} />
        </div>
      </section>
      <section className="promise-band"><div className="wrap promise-inner"><span>MADE WITH INTENTION</span><i>✳</i><span>BUILT TO BE WORN</span><i>✳</i><span>DESIGNED FOR REAL LIFE</span></div></section>
      <SubmittedBy />
    </main>
    <Footer />
    {cartOpen && <CartDrawer items={cart} busy={cartBusy} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} />}
    {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onAdd={addToCart} addedId={addedId} />}
  </>;
}

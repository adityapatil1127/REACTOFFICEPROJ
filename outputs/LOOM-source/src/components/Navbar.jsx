import { useEffect, useState } from 'react';
import SearchBar from './SearchBar.jsx';

export default function Navbar({ cartCount, wishlistCount, onCartClick, onWishlistClick, onSearch, onNavigateCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="navbar wrap" aria-label="Main navigation">
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <a className="brand" href="#home" aria-label="LOOM home">LOOM<span className="brand-mark">.</span></a>
      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <button onClick={() => { onNavigateCategory('Men'); setMenuOpen(false); }}>Men</button>
        <button onClick={() => { onNavigateCategory('Women'); setMenuOpen(false); }}>Women</button>
        <button onClick={() => { onNavigateCategory('New Arrivals'); setMenuOpen(false); }}>New Arrivals</button>
        <button onClick={() => { onNavigateCategory('Sale'); setMenuOpen(false); }}>Sale</button>
      </div>
      <div className="nav-actions">
        <SearchBar onSearch={onSearch} />
        <button className={`header-icon ${wishlistCount ? 'has-items' : ''}`} type="button" onClick={onWishlistClick} aria-label={`Wishlist, ${wishlistCount} saved`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" /></svg>{wishlistCount > 0 && <span className="icon-count">{wishlistCount}</span>}</button>
        <button className="header-icon cart-icon" type="button" onClick={onCartClick} aria-label={`Shopping bag, ${cartCount} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>{cartCount > 0 && <span className="icon-count cart-count">{cartCount}</span>}</button>
      </div>
    </nav>
  </header>;
}

import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductCard({ product, index, isWishlisted, onWishlist, onAdd, onDetails, addedId }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  function handleAdd(event) {
    event.stopPropagation();
    setAdding(true);
    window.setTimeout(() => {
      onAdd(product);
      setAdding(false);
    }, 420);
  }

  return <article className="product-card reveal" style={{ '--reveal-delay': `${(index % 4) * 65}ms` }}>
    <div className={`product-image tone-${product.tone}`} onClick={() => onDetails(product)}>
      {!imageLoaded && <span className="image-skeleton"><span className="loader-ring" /></span>}
      <img className={imageLoaded ? 'loaded' : ''} src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=85`} alt={product.name} loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
      {product.salePrice ? <span className="product-badge sale-badge">SALE</span> : product.collection === 'New Arrivals' && <span className="product-badge">NEW</span>}
      <button className={`wishlist-button ${isWishlisted ? 'is-wishlisted' : ''}`} type="button" aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={(event) => { event.stopPropagation(); onWishlist(product.id); }}><span>{isWishlisted ? '♥' : '♡'}</span></button>
      <button className={`add-button ${addedId === product.id ? 'is-added' : ''}`} type="button" onClick={handleAdd} disabled={adding}>
        {adding ? <><span className="mini-spinner" /> Adding</> : addedId === product.id ? <>Added to bag <span>✓</span></> : <>Add to bag <span>+</span></>}
      </button>
    </div>
    <button className="product-details" type="button" onClick={() => onDetails(product)}><div><h3>{product.name}</h3><span>{product.category} · <span className="rating">★ {product.rating}</span></span></div><strong>{product.salePrice ? <><span className="sale-price">{formatCurrency(product.salePrice)}</span> <del>{formatCurrency(product.price)}</del></> : formatCurrency(product.price)}</strong></button>
  </article>;
}

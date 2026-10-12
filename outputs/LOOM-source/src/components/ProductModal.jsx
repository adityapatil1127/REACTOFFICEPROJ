import { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductModal({ product, onClose, onAdd, addedId }) {
  const [size, setSize] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('drawer-open');
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('drawer-open'); };
  }, [onClose]);

  return <div className="modal-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="product-modal" aria-label={`${product.name} details`} aria-modal="true" role="dialog">
      <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close product details">×</button>
      <div className={`modal-image tone-${product.tone}`}>
        {!imageLoaded && <span className="image-skeleton"><span className="loader-ring" /></span>}
        <img className={imageLoaded ? 'loaded' : ''} src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1000&q=90`} alt={product.name} onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
      </div>
      <div className="modal-copy"><span className="eyebrow">{product.category} · ★ {product.rating}</span><h2>{product.name}</h2><strong className="modal-price">{formatCurrency(product.salePrice || product.price)} {product.salePrice && <del>{formatCurrency(product.price)}</del>}</strong><p>{product.description}</p>
        <div className="size-heading"><span>Select a size</span><button type="button">Size guide</button></div>
        <div className="size-options">{product.sizes.map((option) => <button type="button" key={option} className={size === option ? 'selected' : ''} onClick={() => setSize(option)}>{option}</button>)}</div>
        <button className="button button-dark modal-add" type="button" disabled={!size} onClick={() => { onAdd(product, size); onClose(); }}>{addedId === product.id ? 'Added ✓' : size ? 'Add to cart' : 'Select a size'} <span>↗</span></button>
        <span className="modal-note">Free shipping on orders over ₹5,000</span>
      </div>
    </section>
  </div>;
}

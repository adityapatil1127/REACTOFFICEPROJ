import { useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function CartDrawer({ items, busy, onClose, onQuantity }) {
  const total = items.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('drawer-open');
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('drawer-open'); };
  }, [onClose]);

  return <div className="cart-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <aside className="cart-drawer" aria-label="Shopping cart" aria-modal="true" role="dialog">
      <div className="cart-heading"><div><span className="eyebrow">LOOM GOODS, YOUR WAY</span><h2>Your Cart <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div><div className="cart-heading-actions">{busy && <span className="cart-sync" role="status"><i /><i /><i /> Updating</span>}<button className="icon-button" type="button" onClick={onClose} aria-label="Close cart">×</button></div></div>
      <div className={`cart-progress ${busy ? 'is-busy' : ''}`}><span /></div>
      {items.length === 0 ? <div className="cart-empty"><span className="empty-bag">LOOM</span><h3>Your next favourite is out there.</h3><p>Take a look through the latest pieces.</p><button className="button button-dark" type="button" onClick={onClose}>Explore the collection <span>↘</span></button></div> : <>
        <div className="cart-items">{items.map(({ product, size, quantity }, index) => <article className="cart-item" style={{ '--item-delay': `${index * 55}ms` }} key={`${product.id}-${size}`}>
          <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=180&q=80`} alt="" />
          <div className="cart-item-copy"><h3>{product.name}</h3><span>Size {size}</span><div className="quantity-control"><button type="button" onClick={() => onQuantity(product.id, size, -1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button type="button" onClick={() => onQuantity(product.id, size, 1)} aria-label={`Add one ${product.name}`}>+</button></div></div>
          <strong>{formatCurrency((product.salePrice || product.price) * quantity)}</strong>
        </article>)}</div>
        <div className="cart-summary"><p><span>Subtotal {busy && <i className="cart-mini-loader" aria-label="Updating subtotal" />}</span><strong className={busy ? 'total-pulse' : ''}>{formatCurrency(total)}</strong></p><small>Shipping and taxes calculated at checkout.</small><button className="button button-dark checkout-button" type="button" onClick={onClose}>Continue shopping <span>↗</span></button><span className="demo-checkout">Checkout is not enabled in this demo.</span></div>
      </>}
    </aside>
  </div>;
}

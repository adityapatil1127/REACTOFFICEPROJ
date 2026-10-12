import ProductCard from './ProductCard.jsx';
import ProductSkeleton from './ProductSkeleton.jsx';

export default function ProductGrid({ products, loading, loadingType, wishlist, onWishlist, onAdd, onDetails, addedId }) {
  if (loading) return <ProductSkeleton count={6} type={loadingType} />;
  if (!products.length) return <div className="no-products"><span>Nothing on this rack just yet.</span><span>Try another category or search.</span></div>;
  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} isWishlisted={wishlist.includes(product.id)} onWishlist={onWishlist} onAdd={onAdd} onDetails={onDetails} addedId={addedId} />)}</div>;
}

export default function ProductSkeleton({ count = 6, type = 'filter' }) {
  const loaders = ['loader-ring', 'loader-dots', 'loader-wave', 'loader-bounce', 'loader-bars', 'loader-sweep'];
  return <div className={`skeleton-wrap loading-${type}`} aria-label="Loading products" aria-live="polite">
    <div className="loading-message"><span className="loading-message-mark">{type === 'search' ? '⌕' : '↻'}</span><span>{type === 'search' ? 'Finding your pieces' : 'Refreshing the edit'}</span><i className="loading-message-dots"><b /><b /><b /></i></div>
    <div className="product-grid skeleton-grid">
    {Array.from({ length: count }, (_, index) => <article className="skeleton-card" key={index}>
      <div className="skeleton-image"><span className={loaders[index % loaders.length]}>{index === 0 ? null : <><i /><i /><i /></>}</span></div>
      <div className="skeleton-lines"><span /><span /><span /></div>
    </article>)}
    </div>
    <div className="loading-progress"><span /></div>
  </div>;
}

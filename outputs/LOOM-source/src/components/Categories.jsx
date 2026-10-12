const categories = [
  { title: 'MEN', filter: 'Men', image: 'photo-1516257984-b1b4d707412e', number: '01' },
  { title: 'WOMEN', filter: 'Women', image: 'photo-1483985988355-763728e1935b', number: '02' },
  { title: 'NEW ARRIVALS', filter: 'New Arrivals', image: 'photo-1485230895905-ec40ba36b9bc', number: '03' },
];

export default function Categories({ onSelect }) {
  return <section className="category-section wrap" id="categories" aria-label="Shop by category">
    <div className="section-top reveal"><div><span className="eyebrow">A BETTER EVERYDAY STARTS HERE</span><h2>Find your fit<span className="accent-dot">.</span></h2></div><span className="section-count">01 — 03</span></div>
    <div className="category-grid">{categories.map((item) => <button className="category-card reveal" type="button" key={item.filter} onClick={() => onSelect(item.filter)}>
      <img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=900&q=85`} alt="" />
      <span className="category-shade" /><span className="category-index">{item.number}</span>
      <span className="category-text"><span>{item.title}</span><i>↗</i></span>
    </button>)}</div>
  </section>;
}

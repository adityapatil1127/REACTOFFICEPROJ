import { useEffect } from 'react';

export default function Hero({ onNewArrivals }) {
  useEffect(() => {
    let frame = 0;
    const moveWithScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => document.documentElement.style.setProperty('--hero-parallax', `${Math.min(window.scrollY * 0.16, 90)}px`));
    };
    window.addEventListener('scroll', moveWithScroll, { passive: true });
    return () => { window.removeEventListener('scroll', moveWithScroll); cancelAnimationFrame(frame); };
  }, []);

  return <section className="hero" id="home">
    <div className="hero-photo" role="img" aria-label="LOOM new season collection" />
    <div className="hero-shade" />
    <div className="hero-content wrap"><div className="hero-copy">
      <div className="hero-kicker"><span className="kicker-dot" /> THE NEW SEASON / 2026</div>
      <h1>Style that<br />moves <em>with you.</em></h1>
      <p>Minimal essentials designed for everyday confidence.</p>
      <div className="hero-actions"><a className="button button-light" href="#shop">Shop collection <span>↘</span></a><button className="hero-secondary" type="button" onClick={onNewArrivals}>Explore new arrivals <span>↗</span></button></div>
    </div><div className="hero-note"><span>MADE TO MOVE</span><span>01 / LOOM</span></div></div>
    <span className="hero-float float-a" aria-hidden="true">✳</span><span className="hero-float float-b" aria-hidden="true">LOOM — 01</span>
    <div className="hero-bottom"><span>CONSIDERED CLOTHING. EVERYDAY LIFE.</span><a href="#categories">SCROLL TO DISCOVER ↓</a></div>
  </section>;
}

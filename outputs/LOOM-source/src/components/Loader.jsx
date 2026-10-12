import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - start) / 1450) * 100));
      setProgress(next);
      if (next === 100) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="page-loader" aria-label={`Loading LOOM, ${progress}%`} role="status">
      <div className="loader-brand">LOOM<span className="brand-mark">.</span></div>
      <div className="loader-orbit" role="progressbar" aria-label="Loading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} style={{ '--progress-angle': `${progress * 3.6}deg` }}><span /></div>
      <div className="loader-meta"><span>Preparing your collection</span><span>{progress}%</span></div>
      <div className="loader-track"><span style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

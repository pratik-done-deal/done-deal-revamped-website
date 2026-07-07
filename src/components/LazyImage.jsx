import { useState } from 'react';

export default function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="img-shimmer" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`lazy-img${loaded ? ' loaded' : ''}`}
      />
    </>
  );
}

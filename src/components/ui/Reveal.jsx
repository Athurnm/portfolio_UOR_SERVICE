import React, { useEffect, useRef, useState } from 'react';

/* One reveal per viewport, once. Motion rationale is in DESIGN.md Section 7.

   Resilience: the element starts hidden only while motion is allowed, so a
   failed IntersectionObserver must never strand content at opacity 0. Three
   exits guarantee visibility: already in view on mount, observer callback, or
   a 1200ms fallback timer. */
export default function Reveal({ as: Tag = 'div', children, className = '', ...rest }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const show = () => setRevealed(true);

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return undefined;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      show();
      return undefined;
    }

    const fallback = window.setTimeout(show, 1200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.clearTimeout(fallback);
            show();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '-5% 0px' }
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} data-revealed={revealed ? 'true' : 'false'} {...rest}>
      {children}
    </Tag>
  );
}

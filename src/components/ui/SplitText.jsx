import React, { useEffect, useRef, useState } from 'react';

/**
 * SplitText & Staggered Reveal
 * Splits headings into word masks (overflow: hidden) and individual character spans
 * emerging from invisible overflow boundaries (yPercent: 120 -> 0) with a 0.02s stagger.
 * 
 * Fully accessible with aria-label on root and aria-hidden on split spans.
 * Respects prefers-reduced-motion with instant fallback.
 */
export default function SplitText({
  children,
  as: Tag = 'h2',
  className = '',
  style = {},
  stagger = 0.02,
  delay = 0,
  by = 'chars', // 'chars' | 'words'
  id,
  ...rest
}) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // Extract clean text content from children
  const text = typeof children === 'string' ? children : String(children || '');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const show = () => setRevealed(true);

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return undefined;
    }

    // If already in top of viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      const t = window.setTimeout(show, Math.max(delay * 1000, 40));
      return () => window.clearTimeout(t);
    }

    const fallback = window.setTimeout(show, 1500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.clearTimeout(fallback);
            if (delay > 0) {
              window.setTimeout(show, delay * 1000);
            } else {
              show();
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: '-4% 0px' }
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay]);

  // Split into words, tracking global character index for continuous stagger across words
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <Tag
      ref={containerRef}
      id={id}
      className={`split-text-root ${className}`.trim()}
      style={style}
      aria-label={text}
      {...rest}
    >
      <span aria-hidden="true" style={{ display: 'inline' }}>
        {words.map((word, wordIdx) => {
          const chars = Array.from(word);

          return (
            <React.Fragment key={wordIdx}>
              <span className="split-word-mask">
                {by === 'chars' ? (
                  chars.map((char, charIdx) => {
                    const idx = globalCharIndex++;
                    const charDelay = idx * stagger;
                    return (
                      <span
                        key={charIdx}
                        className={`split-char ${revealed ? 'is-revealed' : ''}`}
                        style={{
                          transitionDelay: `${charDelay}s`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })
                ) : (
                  <span
                    className={`split-word ${revealed ? 'is-revealed' : ''}`}
                    style={{
                      transitionDelay: `${wordIdx * stagger * 3}s`,
                    }}
                  >
                    {word}
                  </span>
                )}
              </span>
              {wordIdx < words.length - 1 ? (
                <span className="split-space"> </span>
              ) : null}
            </React.Fragment>
          );
        })}
      </span>
    </Tag>
  );
}

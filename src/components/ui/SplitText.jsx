import React, { useEffect, useState } from 'react';
import useInView from '../../hooks/useInView.js';

/**
 * SplitText & Staggered Reveal
 * Splits headings into word masks (overflow: hidden) and individual character spans
 * emerging from invisible overflow boundaries (yPercent: 120 -> 0) with a 0.02s stagger.
 *
 * Trigger: `trigger="mount"` animates on first render (the hero h1).
 * `trigger="view"` (default) waits until the heading is scrolled into view, once.
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
  trigger = 'view', // 'view' | 'mount'
  id,
  ...rest
}) {
  const [ref, inView] = useInView();
  const [revealed, setRevealed] = useState(false);

  // Extract clean text content from children
  const text = typeof children === 'string' ? children : String(children || '');

  useEffect(() => {
    if (trigger === 'mount') {
      const t = window.setTimeout(() => setRevealed(true), Math.max(delay * 1000, 40));
      return () => window.clearTimeout(t);
    }

    if (!inView) return undefined;

    if (delay > 0) {
      const t = window.setTimeout(() => setRevealed(true), delay * 1000);
      return () => window.clearTimeout(t);
    }

    setRevealed(true);
    return undefined;
  }, [trigger, inView, delay]);

  // Split into words, tracking global character index for continuous stagger across words
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <Tag
      ref={ref}
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

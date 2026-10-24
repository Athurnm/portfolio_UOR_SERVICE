import React from 'react';

/* Every diagram ships three things: a role, a title, and a text equivalent in
   the DOM. The figcaption is the equivalent, so nothing is only visual.
   On mobile smartphone viewports, diagrams maintain a legible min-width and can be
   smoothly scrolled/panned horizontally so text is never microscopic. */
export default function DiagramFrame({ title, desc, caption, viewBox, minWidth = 520, children }) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="diagram-scroll-wrapper">
        <div style={{ minWidth: `min(100%, ${minWidth}px)` }}>
          <svg
            viewBox={viewBox}
            role="img"
            aria-label={desc ? `${title}. ${desc}` : title}
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <title>{title}</title>
            {children}
          </svg>
        </div>
      </div>
      <div className="diagram-scroll-hint sm:hidden" aria-hidden="true">
        <span>↔ Scroll to inspect flow</span>
      </div>
      {caption ? <figcaption className="diagram-caption">{caption}</figcaption> : null}
    </figure>
  );
}

import React from 'react';

/* Every diagram ships three things: a role, a title, and a text equivalent in
   the DOM. The figcaption is the equivalent, so nothing is only visual. */
export default function DiagramFrame({ title, desc, caption, viewBox, children }) {
  return (
    <figure style={{ margin: 0 }}>
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
      {caption ? <figcaption className="diagram-caption">{caption}</figcaption> : null}
    </figure>
  );
}

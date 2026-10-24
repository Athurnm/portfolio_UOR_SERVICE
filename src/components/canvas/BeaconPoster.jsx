import React from 'react';

/* Static fallback. Shown before WebGL is confirmed, on low-power devices, and
   when prefers-reduced-motion is set. No animation, no network request. */
export default function BeaconPoster() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 320 320"
        role="img"
        aria-label="Abstract beacon: a wireframe lattice around a solid amber core."
        style={{ width: '100%', height: '100%', maxHeight: '100%' }}
      >
        <title>Beacon</title>
        <g fill="none" stroke="var(--accent-fill)" strokeWidth="1">
          <polygon points="160,44 258,102 258,218 160,276 62,218 62,102" opacity="0.35" />
          <polygon points="160,80 226,118 226,202 160,240 94,202 94,118" opacity="0.25" />
          <ellipse cx="160" cy="160" rx="128" ry="52" opacity="0.3" transform="rotate(-18 160 160)" />
        </g>
        <circle cx="160" cy="160" r="34" fill="var(--accent-fill)" />
        <circle cx="160" cy="160" r="34" fill="none" stroke="var(--accent-ink)" strokeWidth="1" opacity="0.5" />
        <g fill="var(--accent-ink)" opacity="0.7">
          <circle cx="160" cy="44" r="2.5" />
          <circle cx="258" cy="102" r="2.5" />
          <circle cx="258" cy="218" r="2.5" />
          <circle cx="160" cy="276" r="2.5" />
          <circle cx="62" cy="218" r="2.5" />
          <circle cx="62" cy="102" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

import React from 'react';

export default function BeaconPoster({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-sm sm:max-w-md opacity-85 select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber-glow)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--amber-core)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--amber-core)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wireframeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--amber-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--amber-core)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="200" cy="200" r="160" fill="url(#beaconGlow)" />

        {/* Outer Orbit Rings */}
        <circle cx="200" cy="200" r="130" stroke="var(--amber-border)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="200" cy="200" r="95" stroke="var(--amber-border)" strokeWidth="1.5" opacity="0.8" />

        {/* Geometric Icosahedron Lattice (Abstract Wireframe Polygon) */}
        <polygon
          points="200,80 290,140 290,260 200,320 110,260 110,140"
          stroke="url(#wireframeStroke)"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="200" y1="80" x2="200" y2="320" stroke="url(#wireframeStroke)" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="140" x2="290" y2="260" stroke="url(#wireframeStroke)" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="260" x2="290" y2="140" stroke="url(#wireframeStroke)" strokeWidth="1" opacity="0.5" />

        {/* Glowing Central Beacon Core */}
        <circle cx="200" cy="200" r="28" fill="var(--amber-core)" opacity="0.2" />
        <circle cx="200" cy="200" r="16" fill="var(--amber-glow)" opacity="0.85" />
        <circle cx="200" cy="200" r="6" fill="#FFFFFF" />

        {/* Telemetry Orbital Nodes */}
        <circle cx="290" cy="140" r="4" fill="var(--amber-glow)" />
        <circle cx="110" cy="260" r="4" fill="var(--amber-glow)" />
        <circle cx="200" cy="80" r="3.5" fill="var(--amber-core)" />
        <circle cx="200" cy="320" r="3.5" fill="var(--amber-core)" />
        <circle cx="160" cy="110" r="2.5" fill="var(--amber-glow)" opacity="0.7" />
        <circle cx="240" cy="290" r="2.5" fill="var(--amber-glow)" opacity="0.7" />
      </svg>
    </div>
  );
}

import React from 'react';

export default function GlassCard({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
        glow ? 'border-[var(--amber-border)] amber-halo' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

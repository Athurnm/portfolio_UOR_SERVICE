import React from 'react';
import { ArrowRight } from 'lucide-react';

/* A reading, not a card. Mono is reserved for the value, per DESIGN.md 4.2. */
export default function Metric({ value, unit, label, note, from, to, size = 'md' }) {
  const valueStyle =
    size === 'lg'
      ? { fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)' }
      : { fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)' };

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2">
        {from ? (
          <>
            <span className="metric-value" style={{ ...valueStyle, color: 'var(--text-muted)' }}>{from}</span>
            <ArrowRight size={16} aria-hidden="true" style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span className="metric-value" style={valueStyle}>{to}</span>
          </>
        ) : (
          <span className="metric-value" style={valueStyle}>{value}</span>
        )}
        {unit ? <span className="identifier" style={{ fontSize: '0.8125rem' }}>{unit}</span> : null}
      </div>
      <p className="metric-label" style={{ marginTop: '0.375rem' }}>{label}</p>
      {note ? (
        <p style={{ marginTop: '0.25rem', fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{note}</p>
      ) : null}
    </div>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';
import CountUp from './CountUp.jsx';

/* A reading, not a card. Mono is reserved for the value, per DESIGN.md 4.2. */
export default function Metric({ value, unit, label, note, from, to, size = 'md', labelTop = false }) {
  const valueStyle =
    size === 'lg'
      ? { fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)' }
      : { fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)' };

  let effectiveFrom = from;
  let effectiveTo = to;

  if (!effectiveFrom && !effectiveTo && typeof value === 'string') {
    if (value.includes('→')) {
      const parts = value.split('→').map((s) => s.trim());
      if (parts.length === 2) {
        effectiveFrom = parts[0];
        effectiveTo = parts[1];
      }
    } else if (value.includes('->')) {
      const parts = value.split('->').map((s) => s.trim());
      if (parts.length === 2) {
        effectiveFrom = parts[0];
        effectiveTo = parts[1];
      }
    } else if (value.toLowerCase() === '5 days to 1 day') {
      effectiveFrom = '5';
      effectiveTo = '1 Day';
    }
  }

  return (
    <div>
      {labelTop && label ? (
        <p className="metric-label" style={{ marginBottom: '0.45rem' }}>
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-2">
        {effectiveFrom && effectiveTo ? (
          <div className="inline-flex items-center gap-2 flex-wrap">
            <CountUp className="metric-value" style={valueStyle} value={effectiveFrom} />
            <span
              className="inline-flex items-center justify-center"
              style={{
                color: 'var(--amber-text)',
                lineHeight: 1,
                transform: 'translateY(1px)',
              }}
              aria-label="to"
            >
              <ArrowRight
                size={size === 'lg' ? 22 : 18}
                aria-hidden="true"
                style={{ strokeWidth: 2.5 }}
              />
            </span>
            <CountUp className="metric-value" style={valueStyle} value={effectiveTo} />
          </div>
        ) : (
          <CountUp className="metric-value" style={valueStyle} value={value} />
        )}
        {unit ? (
          <span className="identifier" style={{ fontSize: '0.8125rem' }}>
            {unit}
          </span>
        ) : null}
      </div>
      {!labelTop && label ? (
        <p className="metric-label" style={{ marginTop: '0.375rem' }}>
          {label}
        </p>
      ) : null}
      {note ? (
        <p
          style={{
            marginTop: '0.25rem',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}


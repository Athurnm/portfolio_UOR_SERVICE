/* Shared SVG vocabulary so all six diagrams read as one system.
   Language is specified in DESIGN.md Section 8. */

export const TEXT = {
  label: { fontFamily: 'var(--font-sans)', fontSize: '11.5px', fontWeight: 500 },
  sub: { fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 400 },
  mono: { fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 500 },
  heading: { fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600 },
};

export function wrap(text, maxChars) {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (line.length + word.length + 1 > maxChars && line.length > 0) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function ArrowDefs({ prefix }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L8 4 L0 8 z" fill="var(--hairline-strong)" />
      </marker>
      <marker id={`${prefix}-arrow-accent`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L8 4 L0 8 z" fill="var(--accent-fill)" />
      </marker>
    </defs>
  );
}

export function Node({ x, y, w, h, label, sub, accent = false, center = false }) {
  const anchor = center ? 'middle' : 'start';
  const tx = center ? x + w / 2 : x + 10;
  const mid = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="var(--bg-raised)"
        stroke={accent ? 'var(--accent-fill)' : 'var(--hairline-strong)'}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text x={tx} y={sub ? mid - 3 : mid + 4} textAnchor={anchor} style={TEXT.label} fill="var(--text-primary)">
        {label}
      </text>
      {sub ? (
        <text x={tx} y={mid + 11} textAnchor={anchor} style={TEXT.sub} fill="var(--text-muted)">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function Connector({ d, accent = false, dashed = false, prefix }) {
  const marker = accent ? `${prefix}-arrow-accent` : `${prefix}-arrow`;
  return (
    <path
      d={d}
      fill="none"
      stroke={accent ? 'var(--accent-fill)' : 'var(--hairline-strong)'}
      strokeWidth={accent ? 1.5 : 1.25}
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={`url(#${marker})`}
    />
  );
}

export function BandLabel({ x, y, children }) {
  return (
    <text x={x} y={y} style={TEXT.sub} fill="var(--text-muted)">
      {children}
    </text>
  );
}

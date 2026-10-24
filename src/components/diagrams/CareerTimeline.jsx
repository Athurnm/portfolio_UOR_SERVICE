import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, TEXT, wrap } from './primitives.jsx';
import { timeline } from '../../content/profile.js';

const VB_W = 640;
const VB_H = 190;
const XS = [72, 240, 408, 576];

export default function CareerTimeline() {
  const baseline = 96;

  return (
    <DiagramFrame
      title="Career arc, 2021 to now"
      desc="Four roles on one timeline: AdaKerja 2021, PegiPegi 2022, Matchmade 2024, and independent building now."
      caption="Four roles, one direction: consumer funnels, then payments, then enterprise reconciliation, now agent systems."
      viewBox={`0 0 ${VB_W} ${VB_H}`}
    >
      <ArrowDefs prefix="tl" />
      <line x1={40} y1={baseline} x2={VB_W - 40} y2={baseline} stroke="var(--hairline-strong)" strokeWidth="1.25" />
      {timeline.map((stop, index) => {
        const x = XS[index];
        const isLast = index === timeline.length - 1;
        const focusLines = wrap(stop.focus, 26);
        return (
          <g key={stop.org}>
            <text x={x} y={baseline - 22} textAnchor="middle" style={TEXT.mono} fill={isLast ? 'var(--accent-ink)' : 'var(--text-muted)'}>
              {stop.period}
            </text>
            <circle
              cx={x}
              cy={baseline}
              r={isLast ? 5.5 : 4.5}
              fill={isLast ? 'var(--accent-fill)' : 'var(--bg-surface)'}
              stroke={isLast ? 'var(--accent-fill)' : 'var(--hairline-strong)'}
              strokeWidth="1.5"
            />
            <text x={x} y={baseline + 26} textAnchor="middle" style={TEXT.heading} fill="var(--text-primary)">
              {stop.org}
            </text>
            <text x={x} y={baseline + 41} textAnchor="middle" style={TEXT.sub} fill="var(--text-muted)">
              {stop.role}
            </text>
            {focusLines.map((line, lineIndex) => (
              <text
                key={line}
                x={x}
                y={baseline + 58 + lineIndex * 13}
                textAnchor="middle"
                style={TEXT.sub}
                fill="var(--text-secondary)"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </DiagramFrame>
  );
}

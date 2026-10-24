import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, Connector, Node, TEXT } from './primitives.jsx';

const ROWS = [
  { label: 'Payment channels', before: 'Stagnant, 2 years', after: 'New gateways live' },
  { label: 'Refund handling', before: '3 days', after: 'Under 4 hours', accent: true },
  { label: 'Duplicate accounts', before: 'No dedupe', after: '50% removed' },
  { label: 'Notifications', before: 'SMS provider', after: 'WhatsApp, 75% open' },
];

export default function PaymentFlow() {
  return (
    <DiagramFrame
      title="Payment and support changes at PegiPegi"
      desc="Four lanes comparing the previous state with the shipped state: payment channels, refund handling, duplicate accounts, and notifications."
      caption="Each lane is a before and after, not a score. The highlighted lane is the one with the largest operational effect."
      viewBox="0 0 620 248"
    >
      <ArrowDefs prefix="pay" />
      <text x={150} y={10} style={TEXT.sub} fill="var(--text-muted)">Before</text>
      <text x={320} y={10} style={TEXT.sub} fill="var(--text-muted)">Shipped</text>

      {ROWS.map((row, index) => {
        const y = 20 + index * 56;
        return (
          <g key={row.label}>
            <text x={0} y={y + 26} style={TEXT.heading} fill="var(--text-primary)">
              {row.label}
            </text>
            <Node x={150} y={y} w={130} h={36} label={row.before} center />
            <Connector prefix="pay" d={`M284 ${y + 18} H312`} accent={row.accent} />
            <Node x={320} y={y} w={236} h={36} label={row.after} accent={row.accent} center />
          </g>
        );
      })}
    </DiagramFrame>
  );
}

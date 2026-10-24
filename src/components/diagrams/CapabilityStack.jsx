import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, TEXT, wrap } from './primitives.jsx';
import { capabilityLayers } from '../../content/profile.js';

const ROW_H = 46;
const GAP = 10;

export default function CapabilityStack() {
  const height = capabilityLayers.length * ROW_H + (capabilityLayers.length - 1) * GAP + 16;

  return (
    <div>
      {/* Mobile Smartphone View (< 640px): Stacked Layer Cards */}
      <div className="sm:hidden" aria-label="Capability layers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {capabilityLayers.map((layer) => (
            <div
              key={layer.name}
              className="panel"
              style={{
                padding: '1rem',
                background: 'var(--bg-raised)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  borderBottom: '1px solid var(--hairline)',
                  paddingBottom: '0.375rem',
                }}
              >
                {layer.name}
              </h4>
              <p className="body-copy--tight" style={{ fontSize: '0.875rem' }}>
                {layer.items.join('  ·  ')}
              </p>
            </div>
          ))}
        </div>
        <p className="diagram-caption" style={{ marginTop: '1rem' }}>
          The stack runs from product judgement at the top to infrastructure at the bottom. Each layer is something I have shipped with, not read about.
        </p>
      </div>

      {/* Desktop / Tablet View (>= 640px): Layered SVG */}
      <div className="hidden sm:block">
        <DiagramFrame
          title="Capability layers"
          desc="Four stacked layers: product leadership, AI and agentic systems, full stack, and data and cloud."
          caption="The stack runs from product judgement at the top to infrastructure at the bottom. Each layer is something I have shipped with, not read about."
          viewBox={`0 0 620 ${height}`}
          minWidth={560}
        >
          <ArrowDefs prefix="cap" />
          {capabilityLayers.map((layer, index) => {
            const y = 8 + index * (ROW_H + GAP);
            const items = wrap(layer.items.join('  ·  '), 62);
            return (
              <g key={layer.name}>
                <rect x={0} y={y} width={620} height={ROW_H} rx={4} fill="var(--bg-raised)" stroke="var(--hairline)" strokeWidth="1" />
                <text x={14} y={y + (items.length > 1 ? 20 : 27)} style={TEXT.heading} fill="var(--text-primary)">
                  {layer.name}
                </text>
                <line x1={186} y1={y + 8} x2={186} y2={y + ROW_H - 8} stroke="var(--hairline)" strokeWidth="1" />
                {items.map((line, lineIndex) => (
                  <text
                    key={line}
                    x={200}
                    y={y + (items.length > 1 ? 18 : 27) + lineIndex * 14}
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
      </div>
    </div>
  );
}

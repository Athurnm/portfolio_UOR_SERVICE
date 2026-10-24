import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, Connector, Node, TEXT } from './primitives.jsx';

const STEPS = ['Apply', 'Verify', 'Pay'];

export default function FunnelLift() {
  return (
    <DiagramFrame
      title="Checkout and squad structure at AdaKerja"
      desc="Three separate checkout steps collapse into one screen, which lifted payment click-through by 60 percent. Three separate backlogs collapse into one roadmap."
      caption="Two collapses, not two redesigns. The checkout change is the one with a measured result."
      viewBox="0 0 620 250"
    >
      <ArrowDefs prefix="fun" />
      <text x={0} y={10} style={TEXT.sub} fill="var(--text-muted)">Multi-step checkout</text>
      {STEPS.map((step, index) => {
        const y = 22 + index * 68;
        return (
          <g key={step}>
            <Node x={0} y={y} w={116} h={44} label={step} sub={`Step ${index + 1}`} center />
            {index < STEPS.length - 1 ? (
              <line
                x1={58}
                y1={y + 44}
                x2={58}
                y2={y + 68}
                stroke="var(--hairline-strong)"
                strokeWidth="1.25"
                strokeDasharray="3 4"
              />
            ) : null}
          </g>
        );
      })}

      <Connector prefix="fun" d="M120 112 H196" accent />
      <Node x={200} y={22} w={132} h={182} label="One screen" sub="Progressive form" accent center />

      <Connector prefix="fun" d="M332 78 H352" accent />
      <Connector prefix="fun" d="M332 148 H352" />
      <Node x={356} y={46} w={264} h={64} label="+60% payment CTR" sub="After the checkout redesign" accent />
      <Node x={356} y={126} w={264} h={64} label="3 squads, 1 roadmap" sub="One North Star metric" />
    </DiagramFrame>
  );
}

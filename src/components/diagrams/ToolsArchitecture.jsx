import React from 'react';
import DiagramFrame from './DiagramFrame.jsx';
import { ArrowDefs, Connector, TEXT } from './primitives.jsx';

const SLUGS = ['llm-token-economics', 'prd-prompt-compiler', 'asr-model-selector'];

export default function ToolsArchitecture() {
  return (
    <DiagramFrame
      title="How a tool mounts inside the tools sub-app"
      desc="The portfolio shell and the tools sub-app are separate builds that share one token file. Tools mount inside the sub-app, so adding one never touches the shell."
      caption="One token file, two builds. A new tool is a folder inside the sub-app, not a change to the portfolio."
      viewBox="0 0 620 262"
    >
      <ArrowDefs prefix="arch" />

      <rect x={0} y={12} width={160} height={200} rx={4} fill="var(--bg-raised)" stroke="var(--hairline-strong)" strokeWidth="1" />
      <text x={12} y={34} style={TEXT.heading} fill="var(--text-primary)">Portfolio shell</text>
      <text x={12} y={50} style={TEXT.sub} fill="var(--text-muted)">built at /</text>
      <line x1={12} y1={62} x2={148} y2={62} stroke="var(--hairline)" strokeWidth="1" />
      {['Hero and signal', 'Impact strip', 'Selected work'].map((item, index) => (
        <text key={item} x={12} y={82 + index * 20} style={TEXT.sub} fill="var(--text-secondary)">
          {item}
        </text>
      ))}

      <rect x={186} y={100} width={118} height={56} rx={4} fill="var(--bg-raised)" stroke="var(--accent-fill)" strokeWidth="1.5" />
      <text x={245} y={124} textAnchor="middle" style={TEXT.label} fill="var(--text-primary)">tokens.css</text>
      <text x={245} y={139} textAnchor="middle" style={TEXT.sub} fill="var(--accent-ink)">single source</text>

      <rect x={330} y={12} width={290} height={200} rx={4} fill="var(--bg-raised)" stroke="var(--hairline-strong)" strokeWidth="1" />
      <text x={344} y={34} style={TEXT.heading} fill="var(--text-primary)">Tools sub-app</text>
      <text x={344} y={50} style={TEXT.sub} fill="var(--text-muted)">built at /tools/</text>
      <line x1={344} y1={62} x2={606} y2={62} stroke="var(--hairline)" strokeWidth="1" />
      {SLUGS.map((slug, index) => {
        const y = 74 + index * 44;
        return (
          <g key={slug}>
            <rect x={344} y={y} width={262} height={34} rx={4} fill="var(--bg-surface)" stroke="var(--hairline)" strokeWidth="1" />
            <text x={356} y={y + 21} style={TEXT.mono} fill="var(--text-secondary)">
              {slug}
            </text>
          </g>
        );
      })}

      <line x1={160} y1={128} x2={186} y2={128} stroke="var(--hairline-strong)" strokeWidth="1.25" strokeDasharray="4 4" />
      <line x1={304} y1={128} x2={330} y2={128} stroke="var(--hairline-strong)" strokeWidth="1.25" strokeDasharray="4 4" />

      <Connector prefix="arch" d="M80 212 V236 H475 V212" />
      <text x={277} y={254} textAnchor="middle" style={TEXT.sub} fill="var(--text-muted)">
        full page load between the two
      </text>
    </DiagramFrame>
  );
}

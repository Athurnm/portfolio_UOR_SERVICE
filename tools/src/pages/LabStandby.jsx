import React from 'react';
import { blueprintTools } from '../registry.js';
import ToolsArchitecture from '../../../src/components/diagrams/ToolsArchitecture.jsx';

export default function LabStandby({ onSelectTool }) {
  if (blueprintTools.length === 0) {
    return (
      <section aria-labelledby="lab-empty">
        <h1 id="lab-empty" className="section-title">
          Nothing in the lab yet
        </h1>
        <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '32rem' }}>
          The registry is empty. Tools appear here as soon as one is added to <code>tools/src/tools/</code>.
        </p>
        <a className="btn btn-quiet" href="/" style={{ marginTop: '1.5rem' }}>
          Back to the portfolio
        </a>
      </section>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <section aria-labelledby="lab-title">
        <h1 id="lab-title" className="section-title">
          Tools lab
        </h1>
        <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '34rem' }}>
          Small utilities for the parts of product work that keep repeating: model economics, spec drafting, and
          choosing between speech models. Each one runs in its own container.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <ToolsArchitecture />
        </div>
      </section>

      <section aria-labelledby="blueprints-title">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <h2 id="blueprints-title" className="subsection-title">
            In development
          </h2>
          <span className="badge">{blueprintTools.length} planned</span>
        </div>

        <ul style={{ padding: 0, margin: '1rem 0 0', listStyle: 'none' }}>
          {blueprintTools.map((tool) => (
            <li key={tool.slug} style={{ borderTop: '1px solid var(--hairline)' }}>
              <a
                href={`/tools/${tool.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  onSelectTool(tool.slug);
                }}
                className="lab-row"
              >
                <span style={{ maxWidth: '34rem' }}>
                  <span style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)' }}>{tool.title}</span>
                  <span className="body-copy--tight" style={{ display: 'block', marginTop: '0.25rem' }}>
                    {tool.description}
                  </span>
                </span>
                <span className="identifier" style={{ flexShrink: 0 }}>
                  {tool.category}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

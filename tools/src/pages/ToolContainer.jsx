import React from 'react';
import { blueprintTools } from '../registry.js';

export default function ToolContainer({ tool, onBack }) {
  if (!tool) {
    return (
      <section aria-labelledby="tool-missing">
        <h1 id="tool-missing" className="section-title">
          No tool at this address
        </h1>
        <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '32rem' }}>
          This slug is not in the registry. It may have been renamed since the link was made.
        </p>
        <a className="btn btn-primary" href="/tools/" onClick={(event) => { event.preventDefault(); onBack(); }} style={{ marginTop: '1.5rem' }}>
          Back to the tools lab
        </a>
      </section>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <nav aria-label="Breadcrumb">
        <a
          href="/tools/"
          onClick={(event) => {
            event.preventDefault();
            onBack();
          }}
          className="text-link"
          style={{ fontSize: '0.875rem' }}
        >
          Tools lab
        </a>
        <span className="identifier" style={{ marginInline: '0.5rem' }}>
          /
        </span>
        <span className="label" style={{ color: 'var(--text-secondary)' }}>
          {tool.title}
        </span>
      </nav>

      <header>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge">In development</span>
          <span className="identifier">{tool.category}</span>
          <span className="identifier">v{tool.version}</span>
        </div>
        <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
          {tool.title}
        </h1>
        <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '36rem' }}>
          {tool.description}
        </p>
      </header>

      <section
        aria-label={`${tool.title} workspace`}
        className="panel"
        style={{ borderStyle: 'dashed', borderColor: 'var(--hairline-strong)' }}
      >
        <h2 className="subsection-title">Not built yet</h2>
        <p className="body-copy" style={{ marginTop: '0.5rem', maxWidth: '36rem' }}>
          This container, its route, and the plan below are real. The working interface is not, and this page will not
          pretend otherwise. When the tool ships, it mounts inside this same frame.
        </p>

        <h3 className="label" style={{ marginTop: '1.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          What it will do
        </h3>
        <ul style={{ padding: 0, margin: '0.75rem 0 0', listStyle: 'none' }}>
          {tool.blueprintFeatures.map((feature) => (
            <li key={feature} style={{ borderTop: '1px solid var(--hairline)', paddingBlock: '0.625rem' }}>
              <span className="body-copy--tight">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Related tools">
        <h2 className="subsection-title">Other tools in the lab</h2>
        <ul style={{ padding: 0, margin: '1rem 0 0', listStyle: 'none' }}>
          {blueprintTools
            .filter((item) => item.slug !== tool.slug)
            .map((item) => (
              <li key={item.slug} style={{ borderTop: '1px solid var(--hairline)' }}>
                <a href={`/tools/${item.slug}`} className="lab-row">
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
                  <span className="identifier" style={{ flexShrink: 0 }}>
                    {item.category}
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={onBack}
        >
          Back to the tools lab
        </button>
        <a className="btn btn-plain" href="/">
          Back to the portfolio
        </a>
      </div>
    </div>
  );
}

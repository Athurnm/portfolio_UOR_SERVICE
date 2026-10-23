import React from 'react';
import { blueprintTools } from '../registry.js';
import { Terminal, ArrowRight, Sparkles, Cpu, Layers, ShieldCheck } from 'lucide-react';

export default function LabStandby({ onSelectTool }) {
  return (
    <div className="space-y-12">
      {/* Standby Header & Architectural Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-[var(--amber-border)] amber-halo">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)] mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-core)] animate-ping"></span>
              STATUS: LAB STANDBY // PIPELINE INITIALIZED
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              AI Product Manager Micro-Tools Lab
            </h1>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-canvas)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)]">
            DIRECTORY: /tools
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          This hub houses experimental AI utilities, unit economics calculators, and product workflow prototypes. All tools are engineered as isolated, lazy-loaded micro-containers to guarantee zero runtime collisions with the main portfolio shell.
        </p>

        {/* Architectural Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--border-hairline)] text-xs">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-mono">
            <Cpu size={15} className="text-[var(--amber-text)]" />
            <span>Client-Side Sandboxed State</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-mono">
            <Layers size={15} className="text-[var(--amber-text)]" />
            <span>Decoupled Vite Sub-App</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-mono">
            <ShieldCheck size={15} className="text-[var(--amber-text)]" />
            <span>Zero Server Secret Leakage</span>
          </div>
        </div>
      </div>

      {/* Blueprint Tool Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>Upcoming Blueprints</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
              Phase 2 Pipeline
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blueprintTools.map((tool) => (
            <div
              key={tool.slug}
              onClick={() => onSelectTool(tool.slug)}
              className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--amber-border)] transition-all duration-300 group cursor-pointer hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold border border-[var(--amber-border)]">
                    {tool.category}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {tool.version}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--amber-text)] transition-colors mb-2">
                  {tool.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="space-y-1.5 pt-4 border-t border-[var(--border-hairline)]">
                  <div className="text-[10px] font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                    Planned Capabilities:
                  </div>
                  {tool.blueprintFeatures.map((feat, idx) => (
                    <div key={idx} className="text-[11px] text-[var(--text-muted)] flex items-start gap-1.5">
                      <span className="text-[var(--amber-text)]">·</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--amber-text)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-core)] animate-pulse"></span>
                  In Development
                </span>

                <button
                  type="button"
                  className="p-2 rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)] group-hover:bg-[var(--amber-core)] group-hover:text-white transition-colors"
                  aria-label={`Open ${tool.title} container`}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

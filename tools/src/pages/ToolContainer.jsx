import React, { useState } from 'react';
import { ArrowLeft, Cpu, Terminal, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, Zap, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function ToolContainer({ tool, onBack }) {
  const [testState, setTestState] = useState('idle'); // 'idle' | 'running' | 'success'

  const handleSimulateSelfTest = () => {
    if (testState === 'running') return;
    setTestState('running');
    setTimeout(() => {
      setTestState('success');
      setTimeout(() => setTestState('idle'), 3500);
    }, 800);
  };

  if (!tool) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center max-w-xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Tool Not Found</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          The requested micro-tool does not exist in the active registry.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-all cursor-pointer"
        >
          Return to Tools Lab
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-muted)] hover:text-[var(--amber-text)] transition-colors cursor-pointer interactive-tap py-1.5 px-2 rounded-lg"
        >
          <ArrowLeft size={14} />
          <span>Back to Tools Directory</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
            {tool.category}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            v{tool.version}
          </span>
        </div>
      </div>

      {/* Tool Header Glass Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)] mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--amber-text)] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-core)] animate-pulse"></span>
              STATUS: BLUEPRINT CONTAINER // READY FOR PHASE 2 ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {tool.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
              In Development
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {tool.description}
        </p>
      </div>

      {/* Standalone Interactive Placeholder Container */}
      <div 
        role="region"
        aria-label={`${tool.title} workspace`}
        className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[var(--amber-border)] min-h-[420px] flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <motion.div 
          animate={testState === 'running' ? { rotate: 360 } : { rotate: 0 }}
          transition={testState === 'running' ? { repeat: Infinity, duration: 0.8, ease: "linear" } : { duration: 0.2 }}
          className="p-4 rounded-2xl bg-[var(--amber-subtle)] text-[var(--amber-text)] mb-4"
        >
          {testState === 'success' ? (
            <Check size={32} className="text-emerald-500" />
          ) : (
            <Terminal size={32} />
          )}
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          {testState === 'success' ? 'Container Environment Verified' : 'Micro-Tool Workspace Initialized'}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed mb-6">
          {testState === 'success' ? (
            <span className="text-emerald-500 font-mono text-xs">
              Latency: 14ms · Memory: 0.42MB · Sandbox Isolation: PASS · Ready for mount
            </span>
          ) : (
            <>
              The sandboxed execution container for <strong>{tool.title}</strong> is prepared. Phase 2 development will mount the live React calculators and telemetry widgets directly here.
            </>
          )}
        </p>

        {/* Interactive Sandbox Ping Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSimulateSelfTest}
          disabled={testState === 'running'}
          className="mb-8 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--amber-border)] transition-colors flex items-center gap-2 cursor-pointer interactive-tap shadow-xs"
        >
          <Zap size={14} className={testState === 'running' ? 'text-amber-500 animate-spin' : 'text-[var(--amber-text)]'} />
          <span>{testState === 'running' ? 'Testing Container...' : testState === 'success' ? 'Self-Test Passed (Re-run)' : 'Ping Sandbox Telemetry'}</span>
        </motion.button>

        {/* Feature Blueprint Specification Checklist */}
        <div className="w-full max-w-lg bg-[var(--bg-canvas)] p-5 rounded-2xl border border-[var(--border-hairline)] text-left mb-8">
          <div className="text-xs font-mono font-semibold uppercase text-[var(--amber-text)] mb-3 flex items-center gap-2">
            <Sparkles size={14} />
            Specification Roadmap
          </div>
          <div className="space-y-2">
            {tool.blueprintFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-[var(--amber-text)] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer interactive-tap"
          >
            Back to Directory
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-colors cursor-pointer interactive-tap"
          >
            Return to Portfolio
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

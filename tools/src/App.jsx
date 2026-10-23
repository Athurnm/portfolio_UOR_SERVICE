import React, { useState, useEffect } from 'react';
import LabStandby from './pages/LabStandby.jsx';
import ToolContainer from './pages/ToolContainer.jsx';
import { getToolBySlug } from './registry.js';
import { Sun, Moon, ArrowLeft, Mail, Linkedin, Github } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeSlug, setActiveSlug] = useState(null);

  // Sync theme with localStorage / root attribute
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
    setTheme(current);
    document.documentElement.setAttribute('data-theme', current);

    // Parse URL on load for slug (e.g. /tools/llm-token-economics)
    const path = window.location.pathname;
    const match = path.match(/\/tools\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      setActiveSlug(match[1]);
    }

    const handlePopState = () => {
      const p = window.location.pathname;
      const m = p.match(/\/tools\/([a-zA-Z0-9_-]+)/);
      setActiveSlug(m ? m[1] : null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const handleSelectTool = (slug) => {
    setActiveSlug(slug);
    window.history.pushState({}, '', `/tools/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: `tool_blueprint_click`,
        title: slug,
        event: true,
      });
    }
  };

  const handleBackToGallery = () => {
    setActiveSlug(null);
    window.history.pushState({}, '', '/tools/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTool = activeSlug ? getToolBySlug(activeSlug) : null;

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--amber-subtle)] selection:text-[var(--amber-text)]">
      {/* Header Navigation */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-5xl h-14 rounded-full glass-panel flex items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5 text-inherit no-underline group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber-glow)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--amber-core)]"></span>
            </span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
              Athur Naufan
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
              AI Tools Hub
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-full hover:bg-[var(--bg-surface)] transition-colors"
            >
              ← Back to Portfolio
            </a>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Sub-App Body */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {activeSlug ? (
          <ToolContainer tool={currentTool} onBack={handleBackToGallery} />
        ) : (
          <LabStandby onSelectTool={handleSelectTool} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-8 px-6 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Athur Naufan Muharam · AI SaaS Micro-Tools Lab (/tools)
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-[var(--amber-text)] transition-colors">Portfolio</a>
            <a href="mailto:athurnm@gmail.com" className="hover:text-[var(--amber-text)] transition-colors">Contact</a>
            <a href="https://github.com/athurnm" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--amber-text)] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

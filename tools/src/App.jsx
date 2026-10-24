import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import LabStandby from './pages/LabStandby.jsx';
import ToolContainer from './pages/ToolContainer.jsx';
import { getToolBySlug } from './registry.js';
import { profile } from '../../src/content/profile.js';

function readSlug() {
  const match = window.location.pathname.match(/\/tools\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
    setTheme(current);
    document.documentElement.setAttribute('data-theme', current);

    setSlug(readSlug());
    const onPopState = () => setSlug(readSlug());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const selectTool = (nextSlug) => {
    setSlug(nextSlug);
    window.history.pushState({}, '', `/tools/${nextSlug}`);
    window.scrollTo({ top: 0 });

    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: 'tool_blueprint_click', title: nextSlug, event: true });
    }
  };

  const backToGallery = () => {
    setSlug(null);
    window.history.pushState({}, '', '/tools/');
    window.scrollTo({ top: 0 });
  };

  const tool = slug ? getToolBySlug(slug) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header style={{ position: 'fixed', top: '0.75rem', left: 0, right: 0, zIndex: 50, padding: '0 0.75rem' }}>
        <nav
          className="nav-pill"
          aria-label="Main"
          style={{
            maxWidth: '68rem',
            margin: '0 auto',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.75rem',
          }}
        >
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', minHeight: 44 }}>
            <span
              aria-hidden="true"
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-fill)', flexShrink: 0 }}
            />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {profile.name}
            </span>
          </a>

          <div className="flex items-center gap-1">
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 44,
                padding: '0 0.75rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}
            >
              Portfolio
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <main id="main" className="shell" style={{ flex: 1, paddingTop: '7rem', paddingBottom: '4rem' }}>
        {slug ? <ToolContainer tool={tool} onBack={backToGallery} /> : <LabStandby onSelectTool={selectTool} />}
      </main>

      <footer style={{ borderTop: '1px solid var(--hairline)', paddingBlock: '2rem' }}>
        <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="identifier">
            {profile.name} · tools lab
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/" className="text-link" style={{ fontSize: '0.875rem' }}>
              Portfolio
            </a>
            <a href={`mailto:${profile.email}`} className="text-link" style={{ fontSize: '0.875rem' }}>
              Email
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: '0.875rem' }}>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

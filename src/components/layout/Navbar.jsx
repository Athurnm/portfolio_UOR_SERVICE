import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Sun, Moon, Menu, X, Copy, Check } from 'lucide-react';
import { profile } from '../../content/profile.js';
import useFocusTrap from '../../hooks/useFocusTrap.js';

function track(path, title) {
  if (typeof window === 'undefined') return;
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({ path, title, event: true });
  }
}

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`;

const navLink = (isActive) => ({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 0.75rem',
  fontSize: '0.875rem',
  fontWeight: isActive ? 600 : 500,
  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
  borderBottom: isActive ? '2px solid var(--accent-fill)' : '2px solid transparent',
  transition: 'color 140ms linear',
});

const sheetLink = (isActive) => ({
  display: 'block',
  minHeight: 44,
  padding: '0.75rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '1rem',
  fontWeight: isActive ? 600 : 500,
  color: 'var(--text-primary)',
  background: isActive ? 'var(--accent-wash)' : 'transparent',
});

export default function Navbar({ activePage = 'portfolio' }) {
  const [theme, setTheme] = useState('light');
  const [contactOpen, setContactOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
  }, []);

  const closeContact = useCallback(() => setContactOpen(false), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  useFocusTrap(contactOpen, contactRef, closeContact);
  useFocusTrap(sheetOpen, sheetRef, closeSheet);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    track('theme_toggle_click', next);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      track('cta_copy_email_click', 'email_copied');
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <>
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
          <a href="/" className="nav-brand">
            <span
              aria-hidden="true"
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-fill)', flexShrink: 0 }}
            />
            <span className="nav-brand-name">
              {profile.name}
            </span>
          </a>

          <div className="hidden items-center md:flex">
            <a href="/" style={navLink(activePage === 'portfolio')} aria-current={activePage === 'portfolio' ? 'page' : undefined}>
              Portfolio
            </a>
            <a
              href="/tools/"
              style={navLink(activePage === 'tools')}
              aria-current={activePage === 'tools' ? 'page' : undefined}
              onClick={() => track('tools_nav_click', 'navbar')}
            >
              Tools
            </a>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>

            <div className="nav-contact">
              <button
                type="button"
                onClick={() => setContactOpen((open) => !open)}
                aria-expanded={contactOpen}
                aria-haspopup="dialog"
                className="btn btn-primary"
                style={{ padding: '0 1rem', minHeight: 36, fontSize: '0.875rem' }}
              >
                Contact
              </button>

              {contactOpen ? (
                <>
                  <div onClick={closeContact} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                  <div
                    ref={contactRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Contact"
                    className="panel"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 0.5rem)',
                      zIndex: 50,
                      width: 'min(20rem, calc(100vw - 2rem))',
                      padding: '1rem',
                      background: 'var(--bg-raised)',
                      boxShadow: 'var(--shadow-popover)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid var(--hairline)',
                      }}
                    >
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Reach me directly</span>
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ width: 32, height: 32 }}
                        onClick={closeContact}
                        aria-label="Close contact"
                      >
                        <X size={15} aria-hidden="true" />
                      </button>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginTop: '0.75rem',
                      }}
                    >
                      <span
                        className="identifier"
                        style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {profile.email}
                      </span>
                      <button
                        type="button"
                        className="btn btn-quiet"
                        style={{ minHeight: 36, padding: '0 0.625rem', fontSize: '0.75rem', flexShrink: 0 }}
                        onClick={copyEmail}
                      >
                        {copied ? (
                          <Check size={13} aria-hidden="true" style={{ color: 'var(--signal-ok)' }} />
                        ) : (
                          <Copy size={13} aria-hidden="true" />
                        )}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <div className="stack-2" style={{ marginTop: '0.75rem' }}>
                      <a
                        href={mailto}
                        onClick={() => {
                          track('cta_contact_email_click', 'email');
                          closeContact();
                        }}
                        style={{ display: 'block', padding: '0.5rem 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}
                      >
                        Email me about a role
                      </a>
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          track('cta_contact_linkedin_click', 'linkedin');
                          closeContact();
                        }}
                        style={{ display: 'block', padding: '0.5rem 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}
                      >
                        LinkedIn
                      </a>
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          track('cta_contact_github_click', 'github');
                          closeContact();
                        }}
                        style={{ display: 'block', padding: '0.5rem 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <button
              type="button"
              className="icon-btn md:hidden"
              onClick={() => setSheetOpen((open) => !open)}
              aria-expanded={sheetOpen}
              aria-haspopup="dialog"
              aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
            >
              {sheetOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {sheetOpen ? (
        <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 45 }}>
          <div onClick={closeSheet} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="panel"
            style={{
              position: 'absolute',
              top: '4.75rem',
              left: '1rem',
              right: '1rem',
              padding: '1rem',
              background: 'var(--bg-raised)',
              boxShadow: 'var(--shadow-popover)',
            }}
          >
            <div className="stack-2">
              <a href="/" onClick={closeSheet} style={sheetLink(activePage === 'portfolio')}>
                Portfolio
              </a>
              <a
                href="/tools/"
                onClick={() => {
                  track('tools_nav_click', 'mobile_sheet');
                  closeSheet();
                }}
                style={sheetLink(activePage === 'tools')}
              >
                Tools lab
              </a>
              <a href={mailto} onClick={closeSheet} style={sheetLink(false)}>
                Email {profile.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

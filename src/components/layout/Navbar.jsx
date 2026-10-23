import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, Linkedin, Github, ExternalLink, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activePage = 'portfolio' }) {
  const [theme, setTheme] = useState('light');
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);

    // Track theme toggle if GoatCounter is available
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: 'theme_toggle_click',
        title: nextTheme,
        event: true,
      });
    }
  };

  const trackOutreach = (channel) => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: `cta_contact_${channel}_click`,
        title: channel,
        event: true,
      });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        className="pointer-events-auto w-full max-w-5xl h-14 rounded-full glass-panel flex items-center justify-between px-4 sm:px-6 transition-all duration-300"
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-inherit no-underline group focus-visible:rounded-full"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber-glow)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--amber-core)]"></span>
          </span>
          <span className="font-semibold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
            Athur Naufan
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
            AI PM
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          <a
            href="/"
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activePage === 'portfolio'
                ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            Portfolio
          </a>

          <a
            href="/tools/"
            onClick={() => trackOutreach('tools_nav')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors ${
              activePage === 'tools'
                ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            Tools
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--amber-core)] text-white font-bold leading-tight">
              Lab
            </span>
          </a>
        </div>

        {/* Right Actions: Theme Toggle & Contact Popover */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Contact Popover Trigger */}
          <div className="relative">
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
              aria-expanded={contactOpen}
              aria-haspopup="true"
            >
              <Mail size={15} />
              <span className="hidden sm:inline">Contact</span>
            </button>

            {/* Contact Dropdown Card */}
            {contactOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setContactOpen(false)}
                />
                <div className="absolute right-0 mt-3 w-72 rounded-2xl glass-panel p-4 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-mono font-medium text-[var(--text-muted)] mb-3 uppercase tracking-wider">
                    Direct Inquiries
                  </div>
                  
                  <div className="space-y-2">
                    <a
                      href="mailto:athurnm@gmail.com?subject=%5BInquiry%5D%20AI%20Product%20Manager%20Opportunity"
                      onClick={() => {
                        trackOutreach('email');
                        setContactOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                          <Mail size={16} />
                        </div>
                        <div>
                          <div>Email</div>
                          <div className="text-xs text-[var(--text-muted)]">athurnm@gmail.com</div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                    </a>

                    <a
                      href="https://linkedin.com/in/athurnm"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackOutreach('linkedin');
                        setContactOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                          <Linkedin size={16} />
                        </div>
                        <div>
                          <div>LinkedIn</div>
                          <div className="text-xs text-[var(--text-muted)]">in/athurnm</div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                    </a>

                    <a
                      href="https://github.com/athurnm"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackOutreach('github');
                        setContactOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                          <Github size={16} />
                        </div>
                        <div>
                          <div>GitHub</div>
                          <div className="text-xs text-[var(--text-muted)]">github.com/athurnm</div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sliding Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pointer-events-auto md:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-20 inset-x-4 p-5 rounded-3xl glass-panel shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-2xl text-base font-medium flex items-center justify-between ${
                  activePage === 'portfolio'
                    ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <span>Portfolio Overview</span>
                <span className="text-xs text-[var(--text-muted)]">Profile & Case Studies</span>
              </a>

              <a
                href="/tools/"
                onClick={() => {
                  trackOutreach('tools_nav');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-base font-medium flex items-center justify-between ${
                  activePage === 'tools'
                    ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Micro-Tools Hub</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--amber-core)] text-white font-bold">
                    Lab
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">AI Utilities</span>
              </a>

              <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Theme: {theme === 'dark' ? 'Dark Console' : 'Light Alabaster'}</span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium"
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

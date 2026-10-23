import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, Linkedin, Github, ExternalLink, Menu, X, Check, Copy } from 'lucide-react';

export default function Navbar({ activePage = 'portfolio' }) {
  const [theme, setTheme] = useState('light');
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Directional Scroll State: Auto-hide on scroll-down, reveal on scroll-up
  const [navVisible, setNavVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Update linear progress percentage
      if (totalHeight > 0) {
        setScrollProgress((currentY / totalHeight) * 100);
      }

      // Directional detection: if scrolled past 80px
      if (currentY > 80) {
        if (currentY - lastY > 8) {
          // Scrolling DOWN -> Hide navbar smoothly
          setNavVisible(false);
          setContactOpen(false); // Close popovers on scroll
        } else if (lastY - currentY > 5) {
          // Scrolling UP -> Reveal navbar immediately
          setNavVisible(true);
        }
      } else {
        // At top of page -> Always show
        setNavVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: 'theme_toggle_click',
        title: nextTheme,
        event: true,
      });
    }
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('athurnm@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);

    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: 'cta_copy_email_click',
        title: 'email_copied',
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
    <>
      {/* Ambient Top Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-gradient-to-r from-[var(--amber-core)] via-[var(--amber-glow)] to-[#FBBF24] transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Navbar Container with Directional Scroll Transition */}
      <header 
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ease-out transform ${
          navVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <nav 
          className="pointer-events-auto w-full max-w-5xl h-14 rounded-full glass-panel flex items-center justify-between px-4 sm:px-6 transition-shadow duration-200 hover:shadow-lg"
          aria-label="Main Navigation"
        >
          {/* Brand Logo with Pulsing Beacon */}
          <a 
            href="/" 
            className="flex items-center gap-2.5 text-inherit no-underline group focus-visible:rounded-full interactive-tap"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber-glow)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--amber-core)]"></span>
            </span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[var(--text-primary)] group-hover:text-[var(--amber-text)] transition-colors">
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
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all interactive-tap ${
                activePage === 'portfolio'
                  ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              Portfolio
            </a>

            <a
              href="/tools/"
              onClick={() => trackOutreach('tools_nav')}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all interactive-tap ${
                activePage === 'tools'
                  ? 'bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <span>Tools</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--amber-core)] text-white font-bold leading-tight">
                Lab
              </span>
            </a>
          </div>

          {/* Right Controls: Theme Toggle & Animated Contact Popover */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button with Rotation Animation */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all interactive-tap cursor-pointer"
            >
              <div className="transition-transform duration-300 hover:rotate-45">
                {theme === 'dark' ? <Sun size={18} className="text-[var(--amber-glow)]" /> : <Moon size={18} />}
              </div>
            </button>

            {/* Contact Action Trigger */}
            <div className="relative">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md interactive-tap cursor-pointer active:scale-95"
                aria-expanded={contactOpen}
                aria-haspopup="true"
              >
                <Mail size={15} />
                <span className="hidden sm:inline">Contact</span>
              </button>

              {/* Contact Popover with Smooth Reveal & Click Copy Action */}
              {contactOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setContactOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel p-4 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-[var(--amber-border)]">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-hairline)]">
                      <span className="text-xs font-mono font-semibold text-[var(--amber-text)] uppercase tracking-wider">
                        Direct Inquiries
                      </span>
                      <button
                        onClick={() => setContactOpen(false)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-md"
                        aria-label="Close contact card"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {/* Copy Email Fast Action */}
                      <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Mail size={15} className="text-[var(--amber-text)] shrink-0" />
                          <span className="text-xs font-mono text-[var(--text-primary)] truncate">
                            athurnm@gmail.com
                          </span>
                        </div>
                        <button
                          onClick={handleCopyEmail}
                          className="px-2 py-1 rounded-md bg-[var(--bg-canvas)] hover:bg-[var(--amber-subtle)] text-[var(--text-secondary)] hover:text-[var(--amber-text)] text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer border border-[var(--border-hairline)] shrink-0"
                          title="Copy email to clipboard"
                        >
                          {copied ? (
                            <>
                              <Check size={12} className="text-green-600" />
                              <span className="text-green-600 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Launch Mail Client */}
                      <a
                        href="mailto:athurnm@gmail.com?subject=%5BInquiry%5D%20AI%20Product%20Manager%20Opportunity"
                        onClick={() => {
                          trackOutreach('email');
                          setContactOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group interactive-tap"
                      >
                        <div className="flex items-center gap-2.5 text-sm font-medium">
                          <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                            <Mail size={15} />
                          </div>
                          <div>
                            <div>Open Mail Client</div>
                            <div className="text-[11px] text-[var(--text-muted)]">Compose email directly</div>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/athurnm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackOutreach('linkedin');
                          setContactOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group interactive-tap"
                      >
                        <div className="flex items-center gap-2.5 text-sm font-medium">
                          <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                            <Linkedin size={15} />
                          </div>
                          <div>
                            <div>LinkedIn Profile</div>
                            <div className="text-[11px] text-[var(--text-muted)]">Connect & message</div>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                      </a>

                      {/* GitHub */}
                      <a
                        href="https://github.com/athurnm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackOutreach('github');
                          setContactOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors group interactive-tap"
                      >
                        <div className="flex items-center gap-2.5 text-sm font-medium">
                          <div className="p-1.5 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-text)]">
                            <Github size={15} />
                          </div>
                          <div>
                            <div>GitHub Profile</div>
                            <div className="text-[11px] text-[var(--text-muted)]">Code & agent workflows</div>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-[var(--amber-text)]" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors interactive-tap"
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-20 inset-x-4 p-5 rounded-3xl glass-panel shadow-2xl animate-in slide-in-from-top-4 duration-200 border border-[var(--amber-border)]">
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
                    className="px-3 py-1.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium interactive-tap"
                  >
                    Switch Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

import React from 'react';
import { Mail, Linkedin, Github, Globe, Sparkles } from 'lucide-react';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-12 px-6 mt-20 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--amber-core)]"></span>
            <span className="font-semibold text-base text-[var(--text-primary)]">
              Athur Naufan Muharam
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
              AI Product Manager
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-md">
            Bridging enterprise product strategy with autonomous AI agent engineering and full-stack execution.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a
            href="mailto:athurnm@gmail.com"
            className="hover:text-[var(--amber-text)] transition-colors p-1"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://linkedin.com/in/athurnm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--amber-text)] transition-colors p-1"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/athurnm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--amber-text)] transition-colors p-1"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://calendar-snap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--amber-text)] transition-colors p-1"
            aria-label="CalSnap Demo"
          >
            <Globe size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-2">
        <div>
          © {currentYear} Athur Naufan Muharam · Crafted with style:amber-beacon
        </div>
        <div className="flex items-center gap-3">
          <span>Jakarta (WIB / UTC+7)</span>
          <span>·</span>
          <span>Open to Relocation</span>
        </div>
      </div>
    </footer>
  );
}

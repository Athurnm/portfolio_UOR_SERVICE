import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import AmberBeaconCanvas from './components/canvas/AmberBeaconCanvas.jsx';
import GlassCard from './components/ui/GlassCard.jsx';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Zap, 
  TrendingUp, 
  Terminal, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Github, 
  Clock 
} from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const kpis = [
    {
      metric: "IDR 1.2B/yr",
      label: "Client Cost Savings",
      sub: "Matchmade enterprise automated reconciliation",
      icon: TrendingUp,
    },
    {
      metric: "80% Faster",
      label: "Cycle Acceleration",
      sub: "Reconciliation cycle cut from 5 days to 1 day",
      icon: Clock,
    },
    {
      metric: "+60% CTR",
      label: "Checkout Lift",
      sub: "AdaKerja candidate payment conversion rate",
      icon: Zap,
    },
    {
      metric: "3x Scale",
      label: "Data Handling",
      sub: "Transaction scale grown from 11 GB to 34 GB/mo",
      icon: Layers,
    },
  ];

  const caseStudies = [
    {
      company: "Matchmade Indonesia",
      badge: "B2B SaaS · Enterprise FinTech",
      role: "Product Manager (2024 — Present)",
      title: "Enterprise Data Reconciliation & AI Document Extraction",
      problem: "Corporate accounting and operations teams were burdened with a 5-day manual reconciliation cycle, comparing hundreds of thousands of ledger rows, banking statements, and corporate invoices with high error rates.",
      solution: [
        "Architected an end-to-end multi-table automated matching engine with custom reconciliation logic.",
        "Delivered operational dashboards, multi-tenant RBAC data views, and enterprise API integrations.",
        "Engineered an AI proof-of-concept utilizing Docling for automated PDF-to-structured-table extraction, eliminating manual document re-keying.",
      ],
      outcomes: [
        "IDR 1.2 Billion/year cost savings per enterprise client",
        "80% reduction in reconciliation cycle duration (5 days down to 1 day)",
        "Scaled transaction processing throughput from 11 GB/month to 34 GB/month (3x growth)",
      ],
      tags: ["Reconciliation Engine", "Docling AI", "Enterprise RBAC", "B2B SaaS", "API Integrations"],
    },
    {
      company: "PegiPegi",
      badge: "B2C OTA Marketplace",
      role: "Product Manager (2022 — 2023)",
      title: "High-Volume Travel Marketplace & Payment Modernization",
      problem: "Two years of payment channel stagnation, high customer support ticket volumes on un-settled transactions, and escalating product messaging expenses.",
      solution: [
        "Integrated modern payment channels unlocking new user cohorts after 2 years of stagnation.",
        "Engineered customer deduplication algorithms to eliminate redundant accounts.",
        "Introduced WhatsApp transactional notification infrastructure and streamlined internal customer service tooling.",
      ],
      outcomes: [
        "Cut ~85% of time for non-settled card refund processing",
        "Reduced redundant accounts by ~50%, saving 50% of monthly product messaging quota",
        "Lowered payment duration by ~40% and drove ~10% new transacting users",
        "Slashed 6% of communication costs with WhatsApp alerts achieving a 75% open rate",
      ],
      tags: ["Payment Gateways", "WhatsApp Infrastructure", "Fraud & Deduplication", "CSO Tooling"],
    },
    {
      company: "AdaKerja",
      badge: "B2C Job Platform",
      role: "Product Manager (2021 — 2022)",
      title: "Recruitment Marketplace Funnel & Checkout Optimization",
      problem: "Low conversion in mobile payment funnels and fragmented squad workflows during corporate restructuring.",
      solution: [
        "Formulated and executed unified product roadmap aligning 3 engineering squads with business leadership.",
        "Redesigned applicant submission flows and optimized mobile payment checkout funnels.",
      ],
      outcomes: [
        "Increased payment click-through rate (CTR) by ~60%",
        "Created core product architectures driving scalable active job-seeker engagement",
      ],
      tags: ["Product Strategy", "Funnel Optimization", "Cross-Squad Alignment", "Mobile Checkout"],
    },
  ];

  const projects = [
    {
      title: "CalSnap — AI Calendar Parser",
      badge: "Vibe-Coded Solo Project",
      link: "https://calendar-snap.vercel.app/",
      stack: "Antigravity IDE · Supabase · Vercel · AI Vision",
      desc: "Parses event information from images/screenshots and messy text snippets, exporting directly to Google Calendar or standard .ics format.",
    },
    {
      title: "Autonomous AI Agent Workflows",
      badge: "Agentic Automation",
      stack: "n8n · OpenClaw · Antigravity · Local LLMs",
      desc: "Built autonomous agent pipelines for automated meeting notes synthesis, PM task triage, and unstructured document ingestion.",
    },
    {
      title: "Wedding Evite Mobile SPA",
      badge: "Event WebApp",
      link: "https://athur-hidup-dengan-dara.info/",
      stack: "React · Supabase · Vercel",
      desc: "Mobile-responsive single-page application built for modern event invitation and live guest RSVPs.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--amber-subtle)] selection:text-[var(--amber-text)]">
      <Navbar activePage="portfolio" />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36">
        
        {/* HERO SECTION */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Monospace Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-core)] animate-pulse"></span>
              STATUS: AVAILABLE FOR AI PM ROLES
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08] mb-5">
              PM Who Builds. <br />
              <span className="text-[var(--amber-text)]">Strategy</span> in Motion, <br />
              <span className="text-[var(--text-secondary)]">AI Systems</span> in Code.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
              I am <strong>Athur Naufan Muharam</strong>, a Product Manager (~5 yrs) with an Information Systems foundation from <strong>ITB</strong>. Proven track record delivering billions in client cost savings, accelerating cycles from days to hours, and engineering hands-on AI agent workflows.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:athurnm@gmail.com?subject=%5BInquiry%5D%20AI%20Product%20Manager%20Opportunity"
                className="px-6 py-3 rounded-full text-sm font-semibold bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Mail size={16} />
                Get in Touch
              </a>

              <a
                href="/tools/"
                className="px-5 py-3 rounded-full text-sm font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--amber-border)] hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center gap-2"
              >
                <Terminal size={16} className="text-[var(--amber-text)]" />
                Explore Tools Lab
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--amber-core)] text-white font-bold">
                  Lab
                </span>
              </a>

              <a
                href="https://calendar-snap.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--amber-text)] transition-colors flex items-center gap-1.5"
              >
                <Globe size={16} />
                Try CalSnap
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Target Relocation Marker */}
            <div className="mt-8 flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--amber-glow)]"></span>
              Target Markets: Netherlands · Australia · Indonesia
            </div>
          </div>

          {/* Right Column: 3D Amber Beacon Canvas */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center">
            <AmberBeaconCanvas scrollProgress={scrollProgress} />
          </div>
        </section>

        {/* KPI TELEMETRY GRID */}
        <section className="py-10 border-y border-[var(--border-hairline)] mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[var(--text-muted)]">
                      {kpi.label}
                    </span>
                    <Icon size={16} className="text-[var(--amber-text)]" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
                      {kpi.metric}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {kpi.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FLAGSHIP CASE STUDIES SECTION */}
        <section className="py-8 mb-20" id="case-studies">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--amber-text)] mb-2">
                Proven Track Record
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Flagship Case Studies
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm">
              Real problem statements, strategic architectural decisions, and quantifiable business outcomes.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((cs, index) => (
              <GlassCard key={index} className="hover:border-[var(--amber-border)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[var(--border-hairline)] mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--amber-subtle)] text-[var(--amber-text)] border border-[var(--amber-border)]">
                        {cs.company}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {cs.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      {cs.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                    {cs.role}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Problem & Strategy */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                        The Challenge
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-2">
                        Product Strategy & Execution
                      </h4>
                      <ul className="space-y-2">
                        {cs.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle2 size={15} className="text-[var(--amber-text)] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Measurable Outcomes */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-semibold uppercase text-[var(--amber-text)] mb-3 flex items-center gap-1.5">
                        <TrendingUp size={14} />
                        Quantifiable Impact
                      </h4>
                      <ul className="space-y-2.5">
                        {cs.outcomes.map((metric, idx) => (
                          <li key={idx} className="text-xs font-mono font-medium text-[var(--text-primary)] leading-snug">
                            → {metric}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[var(--border-hairline)]">
                      {cs.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-canvas)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* AI & TECHNICAL PROJECTS */}
        <section className="py-8 mb-20" id="projects">
          <div className="mb-8">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--amber-text)] mb-2">
              Engineering Fluency
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              AI & Autonomous Agent Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <GlassCard key={idx} className="flex flex-col justify-between h-full hover:border-[var(--amber-border)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--amber-subtle)] text-[var(--amber-text)] font-semibold border border-[var(--amber-border)]">
                      {proj.badge}
                    </span>
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[var(--text-muted)] hover:text-[var(--amber-text)] transition-colors"
                        aria-label={`Open ${proj.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-hairline)] text-[11px] font-mono text-[var(--text-muted)]">
                  {proj.stack}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* MICRO-TOOLS LAB BANNER */}
        <section className="mb-20">
          <GlassCard glow className="relative overflow-hidden p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-[var(--amber-glow)] animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--amber-text)]">
                  Modular Micro-Tools Hub
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
                Interactive PM Utilities & Calculators
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Explore custom prototypes including LLM Token Economics Simulators, PRD Prompt Compilers, and Multilingual ASR Model Selectors hosted in our sandboxed sub-application.
              </p>
            </div>

            <a
              href="/tools/"
              className="px-6 py-3 rounded-full text-sm font-semibold bg-[var(--amber-core)] text-white hover:bg-[var(--amber-glow)] transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Terminal size={16} />
              Open Tools Lab
              <ArrowUpRight size={14} />
            </a>
          </GlassCard>
        </section>

        {/* COMPETENCIES & EDUCATION */}
        <section className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Competencies */}
          <GlassCard>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--amber-text)] mb-3">
              <Cpu size={16} />
              Core Competencies
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Cross-Functional Capabilities
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="font-semibold text-[var(--text-primary)]">Product Leadership: </span>
                <span className="text-[var(--text-secondary)]">Product Roadmapping, Gherkin Specs, A/B Testing, User Research, Stakeholder Management</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-primary)]">AI & Agentic Engineering: </span>
                <span className="text-[var(--text-secondary)]">Prompt Engineering, RAG Architectures, n8n, OpenClaw, Antigravity, Docling</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-primary)]">Full-Stack Tech: </span>
                <span className="text-[var(--text-secondary)]">JavaScript (ESNext), TypeScript, React, Next.js, Vite, Tailwind CSS, Node.js</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-primary)]">Cloud & Data: </span>
                <span className="text-[var(--text-secondary)]">Supabase (PostgreSQL), Vercel, Netlify Edge CDN, Git / GitHub</span>
              </div>
            </div>
          </GlassCard>

          {/* Education */}
          <GlassCard>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--amber-text)] mb-3">
              <GraduationCap size={16} />
              Education & Research
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Institut Teknologi Bandung (ITB)
            </h3>

            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                <span className="font-medium text-[var(--text-primary)]">Degree:</span>
                <span className="font-mono">S.Kom (Bachelor of Information Systems)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                <span className="font-medium text-[var(--text-primary)]">Academic Standing:</span>
                <span className="font-mono text-[var(--amber-text)] font-semibold">GPA 3.75 / 4.00</span>
              </div>
              <div className="pt-1">
                <span className="font-medium text-[var(--text-primary)] block mb-1">Undergraduate Thesis:</span>
                <p className="leading-relaxed">
                  Machine Learning & AI Implementation in Anomaly Fraud Detection for transactional data integrity.
                </p>
              </div>
            </div>
          </GlassCard>
        </section>

      </main>

      <Footer />
    </div>
  );
}

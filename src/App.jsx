import React from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import BeaconMount from './components/canvas/BeaconMount.jsx';
import CompanyCarousel from './components/CompanyCarousel.jsx';
import Reveal from './components/ui/Reveal.jsx';
import Metric from './components/ui/Metric.jsx';
import CareerTimeline from './components/diagrams/CareerTimeline.jsx';
import CapabilityStack from './components/diagrams/CapabilityStack.jsx';
import ToolsArchitecture from './components/diagrams/ToolsArchitecture.jsx';
import useScrollProgress from './hooks/useScrollProgress.js';
import { profile, impactMetrics, projects, education } from './content/profile.js';
import { blueprintTools } from '../tools/src/registry.js';

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`;

export default function App() {
  const progress = useScrollProgress();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activePage="portfolio" />

      <main id="main" style={{ flex: 1, paddingTop: '5rem' }}>
        {/* 1. Hero. Asymmetric split, one focal claim, the beacon as a signal. */}
        <section className="shell" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }} aria-labelledby="hero-title">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label">
                {profile.name} · {profile.role}
              </p>
              <h1 id="hero-title" className="display" style={{ marginTop: '0.75rem' }}>
                {profile.claim}
              </h1>
              <p className="body-copy" style={{ marginTop: '1.25rem', maxWidth: '34rem' }}>
                {profile.summary}
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={mailto}>
                  Email me about a role
                </a>
                <a className="btn btn-quiet" href="#work">
                  Read the work
                </a>
                <a className="btn btn-plain" href="/tools/">
                  Open the tools lab
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" style={{ height: 'clamp(180px, 24vh, 260px)' }}>
              <BeaconMount scrollProgress={progress} />
            </div>
          </div>

          <p className="identifier" style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--hairline)' }}>
            {profile.location} · Netherlands, Australia, Indonesia · visa sponsorship needed
          </p>
        </section>

        {/* 2. Impact strip. One fact set, four readings, no cards. */}
        <section className="impact-strip" aria-label="Verified impact">
          <div className="shell">
            <div className="impact-grid">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="impact-cell">
                  <Metric value={metric.value} unit={metric.unit} label={metric.label} note={metric.context} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Career arc. The five-year story as a timeline, not a paragraph. */}
        <Reveal as="section" className="shell" style={{ paddingBlock: '4.5rem' }} aria-labelledby="arc-title">
          <div style={{ maxWidth: '40rem' }}>
            <h2 id="arc-title" className="section-title">
              Five years, one direction
            </h2>
            <p className="body-copy" style={{ marginTop: '0.75rem' }}>
              Consumer funnels, then payments, then enterprise reconciliation. Each move went toward systems where a
              wrong number costs real money and the fix has to survive an audit.
            </p>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <CareerTimeline />
          </div>
        </Reveal>

        {/* 4. Selected work. Pinned carousel, one company per screen. */}
        <section id="work" aria-labelledby="work-title">
          <div className="shell" style={{ paddingBottom: '2rem' }}>
            <h2 id="work-title" className="section-title">
              Selected work
            </h2>
            <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '34rem' }}>
              One company at a time. Scroll to move between them, or use the controls.
            </p>
          </div>
          <CompanyCarousel />
        </section>

        {/* 5. Capability. One stack diagram, then the things I built for myself. */}
        <Reveal as="section" className="shell" style={{ paddingBlock: '4.5rem' }} aria-labelledby="cap-title">
          <div style={{ maxWidth: '40rem' }}>
            <h2 id="cap-title" className="section-title">
              How the work gets built
            </h2>
            <p className="body-copy" style={{ marginTop: '0.75rem' }}>
              The top layer is judgement. The three below it are what I use to prove a judgement call works before
              asking a team to commit to it.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <CapabilityStack />
          </div>

          <p className="identifier" style={{ marginTop: '1rem' }}>
            {education.degree}, {education.institution} · {education.standing}
          </p>
          <p className="body-copy--tight" style={{ marginTop: '0.25rem' }}>
            Thesis: {education.thesis}.
          </p>

          <h3 className="subsection-title" style={{ marginTop: '3rem' }}>
            Built independently
          </h3>
          <ul style={{ padding: 0, margin: '1rem 0 0', listStyle: 'none' }}>
            {projects.map((project) => (
              <li key={project.title} className="list-row">
                <div style={{ maxWidth: '34rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-link">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                    <span className="label"> · {project.kind}</span>
                  </p>
                  <p className="body-copy--tight" style={{ marginTop: '0.25rem' }}>
                    {project.what}
                  </p>
                </div>
                <p className="identifier" style={{ flexShrink: 0 }}>
                  {project.stack}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 6. Tools lab. Architecture on the left, the pipeline as rows on the right. */}
        <Reveal as="section" className="shell" style={{ paddingBlock: '4.5rem' }} aria-labelledby="lab-title">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="lab-title" className="section-title">
                The tools lab
              </h2>
              <p className="body-copy" style={{ marginTop: '0.75rem', maxWidth: '32rem' }}>
                Three utilities I need often enough to build. They run as a separate app, so an experiment that breaks
                cannot take the portfolio with it.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <ToolsArchitecture />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h3 className="subsection-title">In development</h3>
              <ul style={{ padding: 0, margin: '1rem 0 0', listStyle: 'none' }}>
                {blueprintTools.map((tool) => (
                  <li key={tool.slug} className="list-row">
                    <div style={{ maxWidth: '28rem' }}>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        <a href={`/tools/${tool.slug}`} className="text-link">
                          {tool.title}
                        </a>
                      </p>
                      <p className="body-copy--tight" style={{ marginTop: '0.25rem' }}>
                        {tool.description}
                      </p>
                    </div>
                    <p className="identifier" style={{ flexShrink: 0 }}>
                      {tool.category}
                    </p>
                  </li>
                ))}
              </ul>
              <a className="btn btn-quiet" href="/tools/" style={{ marginTop: '1.5rem' }}>
                Open the tools lab
              </a>
            </div>
          </div>
        </Reveal>

        {/* 7. Contact. The quietest section, set large. */}
        <Reveal as="section" className="shell" style={{ paddingBlock: '5rem 6rem', textAlign: 'center' }} aria-labelledby="contact-title">
          <h2 id="contact-title" className="section-title" style={{ maxWidth: '36rem', marginInline: 'auto' }}>
            Available for AI product manager roles
          </h2>
          <p className="body-copy" style={{ marginTop: '1rem', maxWidth: '34rem', marginInline: 'auto' }}>
            {profile.availability}
          </p>
          <p style={{ marginTop: '2rem' }}>
            <a
              href={mailto}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--accent-ink)',
                overflowWrap: 'anywhere',
              }}
            >
              {profile.email}
            </a>
          </p>
          <p className="identifier" style={{ marginTop: '1rem' }}>
            {profile.location}
          </p>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}

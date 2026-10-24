import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { companies } from '../content/profile.js';
import Metric from './ui/Metric.jsx';
import Disclosure from './ui/Disclosure.jsx';
import ReconciliationFlow from './diagrams/ReconciliationFlow.jsx';
import PaymentFlow from './diagrams/PaymentFlow.jsx';
import FunnelLift from './diagrams/FunnelLift.jsx';

const DIAGRAMS = {
  reconciliation: ReconciliationFlow,
  payment: PaymentFlow,
  funnel: FunnelLift,
};

const COUNT = companies.length;

/* Three rendering paths, decided by capability, never by CSS alone:
   stacked = prefers-reduced-motion, all panels visible, no pinning
   swipe   = narrow or short viewport, native horizontal scroll snap
   pin     = wide and tall, the section pins and scroll drives the track */
function useCarouselMode() {
  const [mode, setMode] = useState('swipe');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const roomy = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');

    const sync = () => {
      if (reduce.matches) setMode('stacked');
      else if (roomy.matches) setMode('pin');
      else setMode('swipe');
    };

    sync();
    reduce.addEventListener('change', sync);
    roomy.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      roomy.removeEventListener('change', sync);
    };
  }, []);

  return mode;
}

function Panel({ company, index }) {
  const Diagram = DIAGRAMS[company.diagram];
  return (
    <article
      aria-roledescription="slide"
      aria-label={`${company.name}, ${index + 1} of ${COUNT}`}
      className="carousel-panel"
    >
      <div className="carousel-panel-inner" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative watermark logo in card background */}
        {company.logo ? (
          <img
            src={company.logo}
            alt=""
            aria-hidden="true"
            className="company-watermark"
          />
        ) : null}

        <div className="grid items-center gap-8 lg:grid-cols-12" style={{ position: 'relative', zIndex: 1 }}>
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-3" style={{ marginBottom: '0.625rem' }}>
              <p className="label" style={{ margin: 0 }}>{company.domain}</p>
              {company.logo ? (
                <div className="company-logo-badge" title={`${company.name} logo`}>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="company-logo-img"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2.5" style={{ marginTop: '0.25rem' }}>
              <h3 className="section-title" style={{ margin: 0 }}>
                {company.name}
              </h3>
              {company.productUrl ? (
                <a
                  href={company.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-status-pill company-status-pill--active"
                  title="Visit Matchmade official site"
                >
                  <span className="status-dot status-dot--active" />
                  <span>matchmade.io</span>
                  <ExternalLink size={11} aria-hidden="true" style={{ strokeWidth: 2 }} />
                </a>
              ) : (
                <span className="company-status-pill company-status-pill--inactive" title="Company is no longer operational">
                  <span className="status-dot status-dot--inactive" />
                  <span>Not Operational</span>
                </span>
              )}
            </div>

            <p className="identifier" style={{ marginTop: '0.5rem' }}>
              {company.role}, {company.period}
            </p>
            <p className="body-copy" style={{ marginTop: '1rem' }}>
              {company.problem}
            </p>
            <ul className="flex flex-wrap gap-1.5" style={{ marginTop: '1.25rem', padding: 0, listStyle: 'none' }}>
              {company.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="carousel-diagram lg:col-span-7">
            <Diagram />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(7.5rem, 1fr))',
            gap: '1rem',
            marginTop: '1.75rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--hairline)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {company.metrics.map((metric) => (
            <Metric
              key={metric.label}
              value={metric.value}
              unit={metric.unit}
              label={metric.label}
              from={metric.from}
              to={metric.to}
            />
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
          <Disclosure summary="Architecture and trade-offs">
            <div className="stack-4" style={{ paddingTop: '0.5rem' }}>
              <p className="body-copy--tight">{company.disclosure.architecture}</p>
              <ul className="stack-2" style={{ paddingLeft: '1.1rem', margin: 0 }}>
                {company.disclosure.decisions.map((decision) => (
                  <li key={decision} className="body-copy--tight">
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          </Disclosure>
        </div>
      </div>
    </article>
  );
}

function Dots({ activeIndex, goTo }) {
  return (
    <div className="flex items-center gap-2">
      {companies.map((company, index) => (
        <button
          key={company.id}
          type="button"
          onClick={() => goTo(index)}
          aria-label={`Show ${company.name}`}
          aria-current={index === activeIndex ? 'true' : undefined}
          className="carousel-dot"
          data-active={index === activeIndex ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}

function LiveRegion({ activeIndex }) {
  return (
    <p className="sr-only" aria-live="polite">
      {companies[activeIndex] ? `${companies[activeIndex].name}, ${activeIndex + 1} of ${COUNT}` : ''}
    </p>
  );
}

export default function CompanyCarousel() {
  const mode = useCarouselMode();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [swipeIndex, setSwipeIndex] = useState(0);

  const activeIndex = mode === 'pin'
    ? Math.min(COUNT - 1, Math.max(0, Math.round(progress * (COUNT - 1))))
    : swipeIndex;

  // Pin mode scroll reader
  useEffect(() => {
    if (mode !== 'pin') {
      setProgress(0);
      return undefined;
    }

    let frame = 0;
    const read = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    read();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mode]);

  // Swipe mode scroll listener to sync activeIndex and dots
  const onSwipeScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setSwipeIndex(Math.min(COUNT - 1, Math.max(0, index)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (mode === 'swipe' && track) {
      track.addEventListener('scroll', onSwipeScroll, { passive: true });
      return () => track.removeEventListener('scroll', onSwipeScroll);
    }
  }, [mode, onSwipeScroll]);

  const goTo = useCallback(
    (target) => {
      const index = Math.min(Math.max(target, 0), COUNT - 1);
      if (mode === 'pin') {
        const el = sectionRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const top = el.offsetTop + (total * index) / (COUNT - 1);
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
      if (mode === 'swipe') {
        const track = trackRef.current;
        if (!track) return;
        const panel = track.children[index];
        if (panel) {
          track.scrollTo({ left: panel.offsetLeft, behavior: 'smooth' });
          setSwipeIndex(index);
        }
      }
    },
    [mode]
  );

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="icon-btn"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous company"
        disabled={activeIndex === 0}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="icon-btn"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next company"
        disabled={activeIndex === COUNT - 1}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );

  if (mode === 'stacked') {
    return (
      <div className="stack-6">
        {companies.map((company, index) => (
          <Panel key={company.id} company={company} index={index} />
        ))}
      </div>
    );
  }

  if (mode === 'swipe') {
    return (
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ outlineOffset: '4px' }}
      >
        {/* Company Quick-Selector Pills for Mobile */}
        <div className="shell" style={{ marginBottom: '1rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '0.25rem',
            }}
          >
            {companies.map((company, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => goTo(index)}
                  style={{
                    padding: '0.375rem 0.875rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: 'nowrap',
                    background: isActive ? 'var(--accent-wash)' : 'var(--bg-surface)',
                    color: isActive ? 'var(--accent-ink)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-fill)' : 'var(--hairline)'}`,
                    cursor: 'pointer',
                    minHeight: '36px',
                    transition: 'all 140ms linear',
                  }}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {company.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="carousel-swipe" ref={trackRef}>
          {companies.map((company, index) => (
            <Panel key={company.id} company={company} index={index} />
          ))}
        </div>
        <div className="carousel-controls shell">
          {controls}
          <Dots activeIndex={activeIndex} goTo={goTo} />
        </div>
        <LiveRegion activeIndex={activeIndex} />
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="carousel-pin"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="carousel-stage">
        <div
          className="carousel-track"
          style={{ transform: `translate3d(-${progress * (COUNT - 1) * 100}%, 0, 0)` }}
        >
          {companies.map((company, index) => (
            <Panel key={company.id} company={company} index={index} />
          ))}
        </div>
        <div className="carousel-controls carousel-controls--overlay">
          {controls}
          <Dots activeIndex={activeIndex} goTo={goTo} />
        </div>
        <LiveRegion activeIndex={activeIndex} />
      </div>
    </div>
  );
}

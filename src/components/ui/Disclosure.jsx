import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Disclosure({ summary, children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div style={{ borderTop: '1px solid var(--hairline)' }}>
      <h4 style={{ margin: 0 }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-3 text-left"
          style={{
            minHeight: 44,
            padding: '0.75rem 0',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          <span>{summary}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              color: 'var(--text-muted)',
              flexShrink: 0,
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 140ms linear',
            }}
          />
        </button>
      </h4>
      <div id={panelId} hidden={!open} style={{ paddingBottom: open ? '1rem' : 0 }}>
        {children}
      </div>
    </div>
  );
}

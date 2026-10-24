import React from 'react';
import { profile } from '../../content/profile.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--hairline)', paddingBlock: '2.5rem' }}>
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.name}</p>
          <p className="label" style={{ marginTop: '0.25rem' }}>
            {profile.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${profile.email}`} className="text-link" style={{ fontSize: '0.875rem' }}>
            Email
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: '0.875rem' }}>
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: '0.875rem' }}>
            GitHub
          </a>
          <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: '0.875rem' }}>
            Medium
          </a>
        </div>
      </div>

      <div className="shell" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--hairline)' }}>
        <p className="identifier">
          {profile.location} · {year}
        </p>
      </div>
    </footer>
  );
}

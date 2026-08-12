'use client';

import { forwardRef } from 'react';
import { useNotebookStore } from '@stores';

const EXTERNAL = [
  { label: 'GitHub', tone: 'note-blue', url: 'https://github.com/dikshadamahe' },
  { label: 'LinkedIn', tone: 'note-yellow', url: 'https://www.linkedin.com/in/dikshadamahe' },
  { label: 'ORCID', tone: 'note-green', url: 'https://orcid.org/0009-0002-0499-2572' },
];

const StickyNotes = forwardRef<HTMLDivElement>(function StickyNotes(_props, ref) {
  const view = useNotebookStore((state) => state.view);
  const navigate = useNotebookStore((state) => state.navigate);
  const onContact = view.kind === 'page' && view.page === 'contact';

  return (
    <div ref={ref} className="sticky-notes-container right-side">
      <button
        type="button"
        className={`sticky-note-tab note-pink${onContact ? ' active' : ''}`}
        onClick={() => navigate({ kind: 'page', page: 'contact' })}
      >
        <span className="note-text">Contact</span>
      </button>

      {EXTERNAL.map((entry) => (
        <a
          key={entry.label}
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`sticky-note-tab ${entry.tone}`}
        >
          <span className="note-text">{entry.label}</span>
        </a>
      ))}
    </div>
  );
});

export default StickyNotes;

'use client';

import { forwardRef } from 'react';
import { SIDE_TABS } from '@constants/nav';
import { useNotebookStore, sameView } from '@stores';

/** The coloured section rail down the right edge of the book. */
const SideTabs = forwardRef<HTMLDivElement>(function SideTabs(_props, ref) {
  const view = useNotebookStore((state) => state.view);
  const navigate = useNotebookStore((state) => state.navigate);
  const search = useNotebookStore((state) => state.search);

  return (
    <div ref={ref} className="sticky-notes-container right-side">
      {SIDE_TABS.map((tab) => {
        const active = !search && sameView(tab.view, view);
        return (
          <button
            key={tab.label}
            type="button"
            title={tab.label}
            aria-current={active ? 'page' : undefined}
            className={`sticky-note-tab ${tab.tone}${active ? ' active' : ''}`}
            onClick={() => navigate(tab.view)}
          >
            <span className="note-text">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default SideTabs;

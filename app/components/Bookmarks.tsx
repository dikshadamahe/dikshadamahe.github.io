'use client';

import { useEffect, useState } from 'react';
import { View } from '@app-types';
import { CATEGORIES } from '@constants/categories';
import { useNotebookStore, sameView } from '@stores';

interface Tab {
  label: string;
  view: View;
}

/** Grouped to fit the width of the bookmark window on one sheet. */
const TAB_PAGES: Tab[][] = [
  CATEGORIES.map((category) => ({
    label: category.label,
    view: { kind: 'grid', filter: category.id } as View,
  })),
  [
    { label: 'Work', view: { kind: 'page', page: 'work' } },
    { label: 'Papers', view: { kind: 'page', page: 'publications' } },
    { label: 'Skills', view: { kind: 'page', page: 'skills' } },
    { label: 'Certificates', view: { kind: 'page', page: 'certificates' } },
  ],
];

export default function Bookmarks() {
  const view = useNotebookStore((state) => state.view);
  const navigate = useNotebookStore((state) => state.navigate);
  const [page, setPage] = useState(0);

  const inDetail = view.kind === 'project';

  // Follow the reader: if they land on a tab from the other sheet, slide to it.
  useEffect(() => {
    const index = TAB_PAGES.findIndex((tabs) => tabs.some((tab) => sameView(tab.view, view)));
    if (index >= 0) setPage(index);
  }, [view]);

  return (
    <>
      <div
        className={`bookmarks-container${inDetail ? ' back-bookmarks' : ''}`}
        style={{ left: '10%' }}
      >
        {inDetail ? (
          <button
            type="button"
            className="bookmark active"
            onClick={() => navigate({ kind: 'grid', filter: 'all' })}
          >
            &larr; Back to Notebook
          </button>
        ) : (
          <button
            type="button"
            className={`bookmark${
              view.kind === 'grid' && view.filter === 'all' ? ' active' : ''
            }`}
            onClick={() => navigate({ kind: 'grid', filter: 'all' })}
          >
            Home
          </button>
        )}
      </div>

      <div className="bookmarks-container slider-mode">
        <button
          type="button"
          className="bookmark slider-arrow prev-arrow"
          onClick={() => setPage((current) => Math.max(0, current - 1))}
          disabled={page === 0}
          aria-label="Previous bookmarks"
        >
          &larr;
        </button>

        <div className="bookmarks-window">
          <div
            className="bookmarks-track"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {TAB_PAGES.map((tabs, index) => (
              <div className="bookmarks-page" key={index}>
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    className={`bookmark${sameView(tab.view, view) ? ' active' : ''}`}
                    onClick={() => navigate(tab.view)}
                    tabIndex={index === page ? 0 : -1}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="bookmark slider-arrow next-arrow"
          onClick={() => setPage((current) => Math.min(TAB_PAGES.length - 1, current + 1))}
          disabled={page === TAB_PAGES.length - 1}
          aria-label="More bookmarks"
        >
          &rarr;
        </button>
      </div>
    </>
  );
}

'use client';

import { TOP_LINKS } from '@constants/nav';
import { useNotebookStore, sameView } from '@stores';

/** Ways to reach Diksha, plus the way back out of a project page. */
export default function TopBar() {
  const view = useNotebookStore((state) => state.view);
  const navigate = useNotebookStore((state) => state.navigate);
  const inDetail = view.kind === 'project';

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
            className="bookmark"
            onClick={() => navigate({ kind: 'home' })}
          >
            Home
          </button>
        )}
      </div>

      <div className="bookmarks-container links-mode">
        {TOP_LINKS.map((link) =>
          link.url ? (
            <a
              key={link.label}
              className="bookmark"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} &#8599;
            </a>
          ) : (
            <button
              key={link.label}
              type="button"
              className={`bookmark${
                link.view && sameView(link.view, view) ? ' active' : ''
              }`}
              onClick={() => link.view && navigate(link.view)}
            >
              {link.label}
            </button>
          ),
        )}
      </div>
    </>
  );
}

'use client';

import { forwardRef } from 'react';
import { PROFILE } from '@constants/profile';
import { PROJECTS } from '@constants/projects';
import { CERTIFICATIONS } from '@constants/certifications';

interface Props {
  onOpen: () => void;
}

const Cover = forwardRef<HTMLDivElement, Props>(function Cover({ onOpen }, ref) {
  const contents = [
    `${PROJECTS.length} projects`,
    'work & papers',
    `${CERTIFICATIONS.length} certificates`,
    'the toolkit',
  ];

  return (
    <div
      ref={ref}
      className="cover"
      role="button"
      tabIndex={0}
      aria-label="Open the notebook"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="cover-content">
        <h1 className="cover-title">{PROFILE.name}</h1>
        <p className="cover-subtitle">{PROFILE.volume}</p>

        {/* A peek at the table of contents, so the cover is not a dead end. */}
        <ul className="cover-contents">
          {contents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="cover-instruction">Click to open &amp; have a read</div>
      </div>
    </div>
  );
});

export default Cover;

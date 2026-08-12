'use client';

import { forwardRef } from 'react';
import { PROFILE } from '@constants/profile';

interface Props {
  onOpen: () => void;
}

const Cover = forwardRef<HTMLDivElement, Props>(function Cover({ onOpen }, ref) {
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
        <div className="cover-instruction">Click to Open</div>
      </div>
    </div>
  );
});

export default Cover;

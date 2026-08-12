'use client';

import Image from 'next/image';
import { PROFILE } from '@constants/profile';
import { useNotebookStore } from '@stores';

export default function AboutPage() {
  const search = useNotebookStore((state) => state.search);
  const setSearch = useNotebookStore((state) => state.setSearch);
  const navigate = useNotebookStore((state) => state.navigate);

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="avatar-container">
          <Image
            src={PROFILE.avatar}
            alt={PROFILE.name}
            fill
            sizes="100px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="about-title-group">
          <h2 className="brand-title">{PROFILE.brand}</h2>
          <p className="brand-subtitle">{PROFILE.subtitle}</p>
        </div>
      </div>

      <div className="about-mission">
        <h3 className="mission-title">Hello! &#128075;</h3>
        <p className="mission-text">
          I am a BTech CSE student at VIT Bhopal who would rather ship something than
          talk about it.
          <br />
          <br />
          Most recently I spent 45 days on the plant floor at Hindustan Copper building{' '}
          <strong>RecovAI</strong>, a flotation decision-support tool. The rest of this
          notebook is full-stack products, research pipelines, and one IEEE paper.
          <br />
          <br />
          Flip through the tabs, or search below. &#128640;
        </p>
      </div>

      <div className="about-actions">
        <div className="search-sticky-note">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sketches..."
            autoComplete="off"
            aria-label="Search projects"
          />
        </div>

        <div className="sponsor-section">
          <p className="sponsor-text">Hiring, or just curious? Say hello. &#9749;</p>
          <button
            type="button"
            className="sponsor-btn"
            onClick={() => navigate({ kind: 'page', page: 'contact' })}
          >
            Get in touch &#128153;
          </button>
        </div>
      </div>
    </div>
  );
}

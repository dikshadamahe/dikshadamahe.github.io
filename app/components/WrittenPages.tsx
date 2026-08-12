'use client';

import { FormEvent, useState } from 'react';
import { TIMELINE } from '@constants/work';
import { PUBLICATIONS } from '@constants/publications';
import {
  CERTIFICATIONS,
  ISSUER_COUNT,
  LINKEDIN_CERTIFICATES,
} from '@constants/certifications';
import { SKILL_ICONS } from '@constants/skillIcons';
import { PROFILE, SOCIALS } from '@constants/profile';

/* ---------------------------------------------------------------- Work --- */

export function WorkLeft() {
  const roles = TIMELINE.filter((entry) => entry.type === 'work').length;

  return (
    <div className="dark-page">
      <h2 className="brand-title">WORK</h2>
      <p className="brand-subtitle">&lt;where I have been /&gt;</p>

      <div className="sketch-note on-dark">
        <p className="section-lede" style={{ margin: 0 }}>
          One on-site engineering internship, two years running content for a student
          club, and a degree that is nearly done. Short list, but every line of it is
          real work.
        </p>
      </div>

      <div className="stat-row">
        <div>
          <p className="stat-value">{roles}</p>
          <p className="stat-label">Roles</p>
        </div>
        <div>
          <p className="stat-value">{PROFILE.cgpa}</p>
          <p className="stat-label">CGPA</p>
        </div>
        <div>
          <p className="stat-value">{PUBLICATIONS.length}</p>
          <p className="stat-label">Paper</p>
        </div>
      </div>
    </div>
  );
}

export function WorkRight() {
  const entries = [...TIMELINE].reverse();

  return (
    <>
      <h1 className="page-title">EXPERIENCE</h1>
      <div className="timeline">
        {entries.map((entry) => (
          <article className="timeline-entry" key={entry.id}>
            <span
              className="timeline-dot"
              style={{ background: entry.type === 'work' ? '#bae6fd' : '#bbf7d0' }}
            />
            <h3>
              {entry.title}
              <span
                className="badge"
                style={{ background: entry.type === 'work' ? '#bae6fd' : '#bbf7d0' }}
              >
                {entry.type === 'work' ? 'Work' : 'Study'}
              </span>
            </h3>
            <p className="role">{entry.subtitle}</p>
            <p className="when">{entry.date}</p>
            {entry.detail && <p className="detail">{entry.detail}</p>}
          </article>
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------- Publications --- */

export function PublicationsLeft() {
  return (
    <div className="dark-page">
      <h2 className="brand-title">PAPERS</h2>
      <p className="brand-subtitle">&lt;peer reviewed /&gt;</p>

      <div className="sketch-note on-dark">
        <p className="section-lede" style={{ margin: 0 }}>
          One paper so far, on phishing detection, presented at IEEE SCEECS 2026 in
          Bhopal and indexed in Scopus. Writing it taught me more about honest
          evaluation than any course did.
        </p>
      </div>

      <div className="stat-row">
        <div>
          <p className="stat-value">99.15%</p>
          <p className="stat-label">Detection rate</p>
        </div>
        <div>
          <p className="stat-value">IEEE</p>
          <p className="stat-label">Venue</p>
        </div>
        <div>
          <p className="stat-value">Scopus</p>
          <p className="stat-label">Indexed</p>
        </div>
      </div>
    </div>
  );
}

export function PublicationsRight() {
  return (
    <>
      <h1 className="page-title">PUBLISHED</h1>
      {PUBLICATIONS.map((paper) => (
        <div className="sketch-note" key={paper.id} style={{ marginBottom: '2rem' }}>
          <h2
            className="mission-title"
            style={{ color: 'var(--text-ink)', fontSize: '1.6rem', lineHeight: 1.2 }}
          >
            {paper.title}
          </h2>
          <table className="spec-table">
            <tbody>
              <tr>
                <th scope="row">Authors</th>
                <td>{paper.authors}</td>
              </tr>
              <tr>
                <th scope="row">Venue</th>
                <td>
                  {paper.venue}
                  {paper.indexing && ` (${paper.indexing})`}, {paper.location}
                </td>
              </tr>
              <tr>
                <th scope="row">Year</th>
                <td>{paper.year}</td>
              </tr>
              <tr>
                <th scope="row">Result</th>
                <td>{paper.highlight}</td>
              </tr>
            </tbody>
          </table>
          <div className="action-row">
            <a
              className="sponsor-btn"
              href={paper.doi}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the paper
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------- Skills --- */

/** The right half of the home spread. */
export function SkillsRight() {
  return (
    <>
      <h1 className="page-title">TOOLKIT</h1>
      <p className="section-lede" style={{ textAlign: 'center' }}>
        The honest list: things I have shipped with, not everything I have opened a
        tutorial for.
      </p>

      {Object.entries(PROFILE.skills).map(([group, items]) => (
        <div className="sketch-note" key={group} style={{ marginBottom: '1.8rem' }}>
          <h2 className="skill-group">{group}</h2>
          <div className="skill-row">
            {items.map((item) => {
              const icon = SKILL_ICONS(item);
              return (
                <span className="skill-chip" key={item}>
                  {icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="skill-logo" src={icon} alt="" loading="lazy" />
                  )}
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ))}

      <div className="sketch-note">
        <h2 className="skill-group">Studying</h2>
        <p className="section-lede" style={{ margin: '0.5rem 0 0 0' }}>
          {PROFILE.education} &middot; CGPA {PROFILE.cgpa} &middot; 158 credits earned
          &middot; {CERTIFICATIONS.length} certificates
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------- Certificates --- */

export function CertificatesLeft() {
  return (
    <div className="dark-page">
      <h2 className="brand-title">CERTS</h2>
      <p className="brand-subtitle">&lt;the paper trail /&gt;</p>

      <div className="sketch-note on-dark">
        <p className="section-lede" style={{ margin: 0 }}>
          Courses I finished and have the certificate to prove it, from a Python
          bootcamp in first year through to AWS and computer vision. Newest first.
        </p>
      </div>

      <div className="stat-row">
        <div>
          <p className="stat-value">{CERTIFICATIONS.length}</p>
          <p className="stat-label">Certificates</p>
        </div>
        <div>
          <p className="stat-value">{ISSUER_COUNT}</p>
          <p className="stat-label">Issuers</p>
        </div>
        <div>
          <p className="stat-value">4</p>
          <p className="stat-label">Years</p>
        </div>
      </div>
    </div>
  );
}

export function CertificatesRight() {
  return (
    <>
      <h1 className="page-title">CERTIFICATES</h1>
      <p className="section-lede" style={{ textAlign: 'center' }}>
        Most cards open their credential.
      </p>
      <ul className="cert-list">
        {CERTIFICATIONS.map((entry) => {
          const href =
            entry.url ?? (entry.onLinkedIn === false ? null : LINKEDIN_CERTIFICATES);

          const body = (
            <>
              <span className="cert-stamp">{entry.date.split(' ')[1]}</span>
              <span className="cert-body">
                <span className="cert-title">{entry.title}</span>
                <span className="cert-issuer">
                  {entry.issuer} &middot; {entry.date}
                </span>
              </span>
              {href && <span className="cert-go">&#8599;</span>}
            </>
          );

          return (
            <li key={entry.id}>
              {href ? (
                <a
                  className="cert-item"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              ) : (
                <div className="cert-item is-static">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------ Contact --- */

export function ContactLeft() {
  return (
    <div className="dark-page">
      <h2 className="brand-title">HELLO</h2>
      <p className="brand-subtitle">&lt;say hi /&gt;</p>

      <div className="sketch-note on-dark">
        <p className="section-lede" style={{ margin: 0 }}>
          Open to software engineering, data science, and industrial AI/ML roles. If you
          have something interesting to build, email is the fastest way to reach me.
        </p>
      </div>

      <ul className="link-list">
        {SOCIALS.map((social) => (
          <li key={social.id}>
            <a
              className="link-row"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="label">{social.label}</span>
              <span className="rule" />
              <span className="value">{social.handle}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="sponsor-text">{PROFILE.location}</p>
    </div>
  );
}

export function ContactRight() {
  const [sent, setSent] = useState(false);

  // Static export, so the note goes straight to the visitor's mail client.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = encodeURIComponent(`Portfolio note from ${name || 'someone'}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <h1 className="page-title">WRITE TO ME</h1>

      <form className="sketch-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact-name">
            Your name <span className="required-asterisk">*</span>
          </label>
          <input id="contact-name" name="name" required placeholder="Who's writing?" />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">
            Email <span className="required-asterisk">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@somewhere.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">
            Message <span className="required-asterisk">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Role, project, or just hello."
          />
        </div>

        <button type="submit" className="submit-sketch-btn">
          SEND IT &#128640;
        </button>

        {sent && (
          <p className="form-hint">
            Your mail app should be open now. If it is not, write to {PROFILE.email}.
          </p>
        )}

        <div className="form-divider" />

        <p className="form-hint">Or skip the form entirely</p>
        <table className="spec-table">
          <tbody>
            <tr>
              <th scope="row">Email</th>
              <td>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </td>
            </tr>
            <tr>
              <th scope="row">Phone</th>
              <td>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>{PROFILE.phone}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

'use client';

import Image from 'next/image';
import { Project } from '@app-types';
import { getCategory } from '@constants/categories';

function initials(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function ProjectDetailLeft({ project }: { project: Project }) {
  return (
    <>
      <h1 className="page-title">{getCategory(project.category).label}</h1>

      <div className="detail-preview">
        {project.screenshot ? (
          <Image src={project.screenshot} alt="" fill sizes="40vw" />
        ) : (
          <div className="preview-stack">
            <span className="preview-monogram">{initials(project.title)}</span>
            <span className="preview-kind">{project.date}</span>
          </div>
        )}
      </div>

      {project.highlight && (
        <div className="sketch-note" style={{ marginTop: '2rem' }}>
          <h3 className="mission-title" style={{ color: 'var(--text-ink)' }}>
            The headline
          </h3>
          <p className="section-lede" style={{ margin: 0 }}>
            {project.highlight}
          </p>
        </div>
      )}
    </>
  );
}

export function ProjectDetailRight({ project }: { project: Project }) {
  return (
    <>
      <h1 className="detail-heading">{project.title}</h1>
      <p className="section-lede">{project.detail ?? project.description}</p>

      <table className="spec-table">
        <tbody>
          <tr>
            <th scope="row">Built</th>
            <td>{project.date}</td>
          </tr>
          <tr>
            <th scope="row">Category</th>
            <td>{getCategory(project.category).label}</td>
          </tr>
          <tr>
            <th scope="row">Stack</th>
            <td>{project.tech.join(' \u00b7 ')}</td>
          </tr>
          <tr>
            <th scope="row">Status</th>
            <td>
              {project.live
                ? 'Deployed and running'
                : project.release
                  ? 'Shipping tagged releases'
                  : 'Source only'}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="action-row">
        <a
          className="sponsor-btn"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          View the code
        </a>
        {project.live && (
          <a
            className="sponsor-btn"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#bbf7d0', transform: 'rotate(-2deg)' }}
          >
            Open it live
          </a>
        )}
        {!project.live && project.release && (
          <a
            className="sponsor-btn"
            href={project.release}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#bbf7d0', transform: 'rotate(-2deg)' }}
          >
            Download the latest release
          </a>
        )}
      </div>
    </>
  );
}

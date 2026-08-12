'use client';

import Image from 'next/image';
import { Project } from '@app-types';
import { getCategory } from '@constants/categories';
import { useNotebookStore } from '@stores';

function initials(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNotebookStore((state) => state.navigate);

  return (
    <article className="component-card">
      {/* The button covers the readable body; the links below are siblings so
          they stay valid and keyboard reachable. */}
      <button
        type="button"
        className="card-open"
        onClick={() => navigate({ kind: 'project', id: project.id })}
      >
        <span className="card-preview">
          {project.screenshot ? (
            <Image src={project.screenshot} alt="" fill sizes="40vw" />
          ) : (
            <span className="preview-stack">
              <span className="preview-monogram">{initials(project.title)}</span>
              <span className="preview-kind">{getCategory(project.category).label}</span>
            </span>
          )}
        </span>

        <span className="card-info">
          <span className="card-date">{project.date}</span>
          <span className="card-heading">{project.title}</span>
          <span className="card-desc">{project.description}</span>
          <span className="card-meta">
            {project.tech.slice(0, 4).map((item) => (
              <span key={item} className="tech-chip">
                {item}
              </span>
            ))}
          </span>
        </span>
      </button>

      <div className="card-actions">
        {project.live ? (
          <a
            className="card-action is-live"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo &#8599;
          </a>
        ) : project.release ? (
          <a
            className="card-action is-live"
            href={project.release}
            target="_blank"
            rel="noopener noreferrer"
          >
            Latest release &#8599;
          </a>
        ) : (
          <span className="card-action is-muted">No live demo</span>
        )}
        <a
          className="card-action"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Code &#8599;
        </a>
        <button
          type="button"
          className="card-action is-details"
          onClick={() => navigate({ kind: 'project', id: project.id })}
        >
          Details
        </button>
      </div>
    </article>
  );
}

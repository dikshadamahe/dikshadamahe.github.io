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
    <button
      type="button"
      className="component-card"
      onClick={() => navigate({ kind: 'project', id: project.id })}
    >
      <div className="card-preview">
        {project.screenshot ? (
          <Image src={project.screenshot} alt="" fill sizes="40vw" />
        ) : (
          <div className="preview-stack">
            <span className="preview-monogram">{initials(project.title)}</span>
            <span className="preview-kind">{getCategory(project.category).label}</span>
          </div>
        )}
      </div>

      <div className="card-info">
        <span className="card-date">{project.date}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="card-meta">
          {project.tech.slice(0, 4).map((item) => (
            <span key={item} className="tech-chip">
              {item}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

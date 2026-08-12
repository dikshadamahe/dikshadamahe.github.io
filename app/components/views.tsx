import { ReactNode } from 'react';
import { Project, View } from '@app-types';
import { PROJECTS } from '@constants/projects';
import { getCategory } from '@constants/categories';
import AboutPage from '@components/AboutPage';
import ProjectCard from '@components/ProjectCard';
import { ProjectDetailLeft, ProjectDetailRight } from '@components/ProjectDetail';
import {
  CertificatesLeft,
  CertificatesRight,
  ContactLeft,
  ContactRight,
  PublicationsLeft,
  PublicationsRight,
  SkillsLeft,
  SkillsRight,
  WorkLeft,
  WorkRight,
} from '@components/WrittenPages';

export interface Spread {
  left: ReactNode;
  right: ReactNode;
  /** Renders the left page as the black inside of the front cover. */
  isLeftCover: boolean;
}

function matches(project: Project, term: string): boolean {
  const haystack = [project.title, project.description, ...project.tech]
    .join(' ')
    .toLowerCase();
  return haystack.includes(term);
}

function Grid({ items }: { items: Project[] }) {
  return (
    <section className="components-grid">
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

function Empty({ note }: { note: string }) {
  return (
    <div className="empty-category-message">
      <div className="empty-doodle">&#9999;&#65039;</div>
      <h3>Nothing on this page</h3>
      <p>{note}</p>
    </div>
  );
}

export function resolveSpread(view: View, search: string): Spread {
  const term = search.trim().toLowerCase();

  if (view.kind === 'project') {
    const project = PROJECTS.find((entry) => entry.id === view.id);
    if (!project) return resolveSpread({ kind: 'grid', filter: 'all' }, '');
    return {
      left: <ProjectDetailLeft project={project} />,
      right: <ProjectDetailRight project={project} />,
      isLeftCover: false,
    };
  }

  if (view.kind === 'page') {
    switch (view.page) {
      case 'work':
        return { left: <WorkLeft />, right: <WorkRight />, isLeftCover: true };
      case 'publications':
        return {
          left: <PublicationsLeft />,
          right: <PublicationsRight />,
          isLeftCover: true,
        };
      case 'skills':
        return { left: <SkillsLeft />, right: <SkillsRight />, isLeftCover: true };
      case 'certificates':
        return {
          left: <CertificatesLeft />,
          right: <CertificatesRight />,
          isLeftCover: true,
        };
      case 'contact':
        return { left: <ContactLeft />, right: <ContactRight />, isLeftCover: true };
    }
  }

  const pool =
    view.filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === view.filter);
  const filtered = term ? pool.filter((project) => matches(project, term)) : pool;

  // Home: the about page faces a single column of every project.
  if (view.filter === 'all' && !term) {
    return {
      left: <AboutPage />,
      right: (
        <>
          <h1 className="page-title">All Projects</h1>
          <Grid items={filtered} />
        </>
      ),
      isLeftCover: true,
    };
  }

  const leftTitle = term
    ? `"${search.trim()}"`
    : getCategory(view.filter === 'all' ? 'web' : view.filter).label.toUpperCase();

  if (filtered.length === 0) {
    return {
      left: <h1 className="page-title">{leftTitle}</h1>,
      right: (
        <>
          <h1 className="page-title">PROJECTS</h1>
          <Empty note="Try another category, or clear the search and start from Home." />
        </>
      ),
      isLeftCover: false,
    };
  }

  // Categories and searches split their results across the open spread.
  const half = Math.ceil(filtered.length / 2);

  return {
    left: (
      <>
        <h1 className="page-title">{leftTitle}</h1>
        <Grid items={filtered.slice(0, half)} />
      </>
    ),
    right: (
      <>
        <h1 className="page-title">PROJECTS</h1>
        <Grid items={filtered.slice(half)} />
      </>
    ),
    isLeftCover: false,
  };
}

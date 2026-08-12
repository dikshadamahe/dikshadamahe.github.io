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

function Blurb({ title, note }: { title: string; note: string }) {
  return (
    <>
      <h1 className="page-title">{title}</h1>
      <div className="sketch-note">
        <p className="section-lede" style={{ margin: 0 }}>
          {note}
        </p>
      </div>
    </>
  );
}

export function resolveSpread(view: View, search: string): Spread {
  const term = search.trim().toLowerCase();

  // A live search keeps the about page, and therefore the input, mounted on
  // the left with results facing it. Any tab clears the query.
  if (term) {
    const results = PROJECTS.filter((project) => matches(project, term));
    return {
      left: <AboutPage />,
      isLeftCover: true,
      right: results.length ? (
        <>
          <h1 className="page-title">
            {results.length} {results.length === 1 ? 'MATCH' : 'MATCHES'}
          </h1>
          <Grid items={results} />
        </>
      ) : (
        <>
          <h1 className="page-title">NO MATCHES</h1>
          <div className="empty-category-message">
            <div className="empty-doodle">&#128269;</div>
            <h3>Nothing for &ldquo;{search.trim()}&rdquo;</h3>
            <p>Try a tool name like React or XGBoost, or clear the note to start over.</p>
          </div>
        </>
      ),
    };
  }

  if (view.kind === 'home') {
    return { left: <AboutPage />, right: <SkillsRight />, isLeftCover: true };
  }

  if (view.kind === 'project') {
    const project = PROJECTS.find((entry) => entry.id === view.id);
    if (!project) return resolveSpread({ kind: 'home' }, '');
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

  const filtered =
    view.filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === view.filter);

  const heading =
    view.filter === 'all'
      ? 'ALL PROJECTS'
      : getCategory(view.filter).label.toUpperCase();

  const blurb =
    view.filter === 'all'
      ? 'Everything in the notebook. Each card links straight to the code and, where there is one, the live site.'
      : getCategory(view.filter).blurb;

  if (filtered.length === 0) {
    return {
      left: <Blurb title={heading} note={blurb} />,
      right: (
        <>
          <h1 className="page-title">PROJECTS</h1>
          <div className="empty-category-message">
            <div className="empty-doodle">&#9999;&#65039;</div>
            <h3>Nothing here yet</h3>
            <p>Try another tab from the rail on the right.</p>
          </div>
        </>
      ),
      isLeftCover: false,
    };
  }

  // Splitting one or two cards across the spread would leave a page blank, so
  // short lists get a written left page and keep every card on the right.
  if (filtered.length <= 2) {
    return {
      left: <Blurb title={heading} note={blurb} />,
      right: (
        <>
          <h1 className="page-title">PROJECTS</h1>
          <Grid items={filtered} />
        </>
      ),
      isLeftCover: false,
    };
  }

  const half = Math.ceil(filtered.length / 2);

  return {
    left: (
      <>
        <h1 className="page-title">{heading}</h1>
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

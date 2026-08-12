export type CategoryId = 'web' | 'ai' | 'research';

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  category: CategoryId;
  tech: string[];
  github: string;
  live: string | null;
  /** Path under `public/` once a real screenshot exists. */
  screenshot?: string;
  /** Longer write-up shown on the project's own page. */
  detail?: string;
  /** Headline number or claim worth calling out. */
  highlight?: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export interface TimelineEntry {
  id: string;
  type: 'education' | 'work';
  title: string;
  subtitle: string;
  date: string;
  detail: string | null;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  location: string;
  highlight: string;
  doi: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  /** Credential page. Falls back to the LinkedIn certifications list. */
  url?: string;
}

export type PageKind = 'work' | 'publications' | 'certificates' | 'contact';

/** Which spread is on screen. */
export type View =
  | { kind: 'home' }
  | { kind: 'grid'; filter: CategoryId | 'all' }
  | { kind: 'project'; id: string }
  | { kind: 'page'; page: PageKind };

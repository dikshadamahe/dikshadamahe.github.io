import { View } from '@app-types';

export interface SideTab {
  label: string;
  /** Post-it colour class from globals.css. */
  tone: string;
  view: View;
}

/** Sections live on the coloured rail down the right edge of the book. */
export const SIDE_TABS: SideTab[] = [
  { label: 'Home', tone: 'note-yellow', view: { kind: 'home' } },
  { label: 'Projects', tone: 'note-pink', view: { kind: 'grid', filter: 'all' } },
  { label: 'Web Apps', tone: 'note-blue', view: { kind: 'grid', filter: 'web' } },
  { label: 'AI & ML', tone: 'note-green', view: { kind: 'grid', filter: 'ai' } },
  { label: 'Research', tone: 'note-yellow', view: { kind: 'grid', filter: 'research' } },
  { label: 'Work', tone: 'note-pink', view: { kind: 'page', page: 'work' } },
  { label: 'Papers', tone: 'note-blue', view: { kind: 'page', page: 'publications' } },
  { label: 'Certs', tone: 'note-green', view: { kind: 'page', page: 'certificates' } },
];

export interface TopLink {
  label: string;
  /** Absent for the internal contact page. */
  url?: string;
  view?: View;
}

/** Ways to reach Diksha sit along the top edge. */
export const TOP_LINKS: TopLink[] = [
  { label: 'Contact', view: { kind: 'page', page: 'contact' } },
  { label: 'GitHub', url: 'https://github.com/dikshadamahe' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dikshadamahe' },
  { label: 'ORCID', url: 'https://orcid.org/0009-0002-0499-2572' },
];

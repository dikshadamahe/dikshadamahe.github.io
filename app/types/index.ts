export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
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

export type Season = 'monsoon' | 'summer';
export type ActiveRoad = 'main' | 'projects' | 'work' | 'publications';

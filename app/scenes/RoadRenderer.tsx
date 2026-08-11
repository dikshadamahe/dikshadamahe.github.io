'use client';

import type { ActiveRoad, Project } from '@app-types';
import ProjectsRoad from '@scenes/ProjectsRoad';

type RoadRendererProps = {
  road: Exclude<ActiveRoad, 'main'>;
  onSelectProject: (project: Project) => void;
};

export default function RoadRenderer({ road, onSelectProject }: RoadRendererProps) {
  switch (road) {
    case 'projects':
      return <ProjectsRoad onSelectProject={onSelectProject} />;
    case 'work':
      // Phase 5
      return null;
    case 'publications':
      // Phase 5
      return null;
    default:
      return null;
  }
}

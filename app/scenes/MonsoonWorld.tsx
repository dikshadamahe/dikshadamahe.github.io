'use client';

import { useAppStore } from '@stores';
import ScrollCamera from '@components/ScrollCamera';
import CloudScene from '@scenes/CloudScene';
import RoadScene from '@scenes/RoadScene';
import GirlSequence from '@scenes/GirlSequence';
import SignboardScene from '@scenes/SignboardScene';
import RainSystem from '@effects/RainSystem';

export default function MonsoonWorld() {
  const activeRoad = useAppStore((s) => s.activeRoad);

  if (activeRoad === 'main') {
    return (
      <>
        <ScrollCamera />
        <CloudScene />
        <RainSystem />
        <RoadScene />
        <GirlSequence />
        <SignboardScene />
      </>
    );
  }

  // Placeholder for other roads (built in Phase 4 & 5)
  return null;
}

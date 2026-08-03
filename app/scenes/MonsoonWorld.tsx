'use client';

import { useAppStore } from '@stores';
import ScrollCamera from '@components/ScrollCamera';
import CloudScene from '@scenes/CloudScene';
import RainSystem from '@effects/RainSystem';

export default function MonsoonWorld() {
  const activeRoad = useAppStore((s) => s.activeRoad);

  return (
    <group>
      {activeRoad === 'main' && (
        <>
          <ScrollCamera />
          <CloudScene />
          <RainSystem />
        </>
      )}
    </group>
  );
}

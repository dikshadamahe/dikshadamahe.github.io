'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Preload } from '@react-three/drei';
import MonsoonWorld from '@scenes/MonsoonWorld';
import RoadRenderer from '@scenes/RoadRenderer';
import BackButton from '@components/BackButton';
import ProjectPanel from '@components/ProjectPanel';
import { useAppStore } from '@stores';
import type { Project } from '@app-types';

export default function CanvasWrapper() {
  const activeRoad = useAppStore((s) => s.activeRoad);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setActiveProject(null);
    document.body.style.cursor = 'auto';
  }, [activeRoad]);

  return (
    <div className="h-[100dvh] w-full relative">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 10, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          // Prevent X-close click from falling through to a milestone underneath
          pointerEvents: activeProject ? 'none' : 'auto',
        }}
      >
        <color attach="background" args={['#B4C7D9']} />
        <Suspense fallback={null}>
          {activeRoad === 'main' ? (
            <ScrollControls pages={5} damping={0.3}>
              <ambientLight intensity={0.6} />
              <fog attach="fog" args={['#B4C7D9', 15, 80]} />
              <MonsoonWorld />
            </ScrollControls>
          ) : (
            <ScrollControls pages={4} damping={0.3} key={activeRoad}>
              <RoadRenderer road={activeRoad} onSelectProject={setActiveProject} />
            </ScrollControls>
          )}
          <Preload all />
        </Suspense>
      </Canvas>
      <BackButton />
      <ProjectPanel project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

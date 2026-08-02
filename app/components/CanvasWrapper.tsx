'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Preload } from '@react-three/drei';
import MonsoonWorld from '@scenes/MonsoonWorld';

export default function CanvasWrapper() {
  return (
    <div className="h-[100dvh] w-full relative">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 10, 15], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#B4C7D9']} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ScrollControls pages={5} damping={0.3}>
            <MonsoonWorld />
          </ScrollControls>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 1500;

export default function RainSystem() {
  const rainRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 + 5;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions, speeds };
  }, []);

  // Seed instance matrices on first frame so drops are visible immediately
  const seeded = useRef(false);

  useFrame((_, delta) => {
    if (!rainRef.current) return;

    if (!seeded.current) {
      for (let i = 0; i < COUNT; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        dummy.updateMatrix();
        rainRef.current.setMatrixAt(i, dummy.matrix);
      }
      rainRef.current.instanceMatrix.needsUpdate = true;
      seeded.current = true;
    }

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 1] -= speeds[i] * delta * 60;

      if (positions[i * 3 + 1] < -2) {
        positions[i * 3 + 1] = 20 + Math.random() * 5;
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30 + 5;
      }

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      rainRef.current.setMatrixAt(i, dummy.matrix);
    }

    rainRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={rainRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.015, 0.3, 0.015]} />
      <meshBasicMaterial color="#C8DDE8" transparent opacity={0.6} depthWrite={false} />
    </instancedMesh>
  );
}

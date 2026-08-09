'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 1200;

export default function RainSystem() {
  const rainRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions, speeds };
  }, []);

  useLayoutEffect(() => {
    if (!rainRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      rainRef.current.setMatrixAt(i, dummy.matrix);
    }
    rainRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions]);

  useFrame((_, delta) => {
    if (!rainRef.current) return;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 1] -= speeds[i] * delta * 60;

      if (positions[i * 3 + 1] < -2) {
        positions[i * 3 + 1] = 20 + Math.random() * 5;
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      rainRef.current.setMatrixAt(i, dummy.matrix);
    }

    rainRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={rainRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.015, 0.25, 0.015]} />
      <meshBasicMaterial color="#A3C1D4" transparent opacity={0.45} depthWrite={false} />
    </instancedMesh>
  );
}

'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

function targetCameraY(offset: number) {
  if (offset < 0.2) return 10;
  if (offset < 0.5) {
    const t = (offset - 0.2) / 0.3;
    return THREE.MathUtils.lerp(10, 2, t);
  }
  return 2;
}

function targetCameraRotX(offset: number) {
  if (offset < 0.2) return 0;
  if (offset < 0.5) {
    const t = (offset - 0.2) / 0.3;
    return THREE.MathUtils.lerp(0, -0.3, t);
  }
  const t = Math.min((offset - 0.5) / 0.2, 1);
  return THREE.MathUtils.lerp(-0.3, -0.1, t);
}

export default function ScrollCamera() {
  const { camera } = useThree();
  const data = useScroll();

  useFrame((state, delta) => {
    const offset = data.offset;
    const y = targetCameraY(offset);
    const rotX = targetCameraRotX(offset);

    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, 5, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, rotX, 5, delta);

    // Mouse parallax (desktop pointer)
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      -(state.pointer.x * Math.PI) / 120,
      0.05
    );
  });

  return null;
}

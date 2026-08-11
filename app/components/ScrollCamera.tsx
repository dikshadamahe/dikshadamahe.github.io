'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Scroll → camera targets
 * 0.00–0.15: Y=10, Z=15, rotX=0   (clouds)
 * 0.15–0.25: hold high            (Namaste visible)
 * 0.25–0.50: Y 10→2, Z 15→5, rotX 0→-0.2  (descent)
 * 0.50–1.00: Y=2, Z=5, rotX=-0.1  (road level)
 */
function targetCameraY(offset: number) {
  if (offset < 0.25) return 10;
  if (offset < 0.5) {
    const t = (offset - 0.25) / 0.25;
    return THREE.MathUtils.lerp(10, 2, t);
  }
  return 2;
}

function targetCameraZ(offset: number) {
  if (offset < 0.25) return 15;
  if (offset < 0.5) {
    const t = (offset - 0.25) / 0.25;
    return THREE.MathUtils.lerp(15, 5, t);
  }
  return 5;
}

function targetCameraRotX(offset: number) {
  if (offset < 0.25) return 0;
  if (offset < 0.5) {
    const t = (offset - 0.25) / 0.25;
    return THREE.MathUtils.lerp(0, -0.2, t);
  }
  return -0.1;
}

export default function ScrollCamera() {
  const { camera } = useThree();
  const data = useScroll();

  useFrame((state, delta) => {
    const offset = data.offset;
    const y = targetCameraY(offset);
    const z = targetCameraZ(offset);
    const rotX = targetCameraRotX(offset);

    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 5, delta);
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

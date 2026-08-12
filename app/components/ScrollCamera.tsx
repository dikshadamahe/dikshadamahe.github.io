'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Scroll → camera targets (gali chase)
 * 0.00–0.25: Y=10, Z=15, rotX=0        (clouds)
 * 0.25–0.44: Y 10→2, Z 15→3, rotX 0→-0.15  (descent into gali)
 * 0.44–0.90: Y=2, Z 3→-87, rotX=-0.08  (chase through gali)
 * 0.90–1.00: hold at end
 */
function targetY(offset: number) {
  if (offset < 0.25) return 10;
  if (offset < 0.44) {
    const t = (offset - 0.25) / 0.19;
    return THREE.MathUtils.lerp(10, 2, t);
  }
  return 2;
}

function targetZ(offset: number) {
  if (offset < 0.25) return 15;
  if (offset < 0.44) {
    const t = (offset - 0.25) / 0.19;
    return THREE.MathUtils.lerp(15, 3, t);
  }
  // Chase: camera follows the gali path
  const chaseT = (offset - 0.44) / 0.46; // 0→1 over 44-90%
  const clampedChase = Math.min(chaseT, 1);
  return THREE.MathUtils.lerp(3, -87, clampedChase); // -87 = GALI_END + GIRL_LEAD
}

function targetRotX(offset: number) {
  if (offset < 0.25) return 0;
  if (offset < 0.44) {
    const t = (offset - 0.25) / 0.19;
    return THREE.MathUtils.lerp(0, -0.15, t);
  }
  return -0.08; // slight downward look while running
}

export default function ScrollCamera() {
  const { camera } = useThree();
  const data = useScroll();

  useFrame((state, delta) => {
    const offset = data.offset;
    const y = targetY(offset);
    const z = targetZ(offset);
    const rotX = targetRotX(offset);

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

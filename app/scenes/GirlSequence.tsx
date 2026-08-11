'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const BOAT_POS: [number, number, number] = [4, 0.3, -8];
const GIRL_Y = 1.25;
const GIRL_Z = -8;

export default function GirlSequence() {
  const data = useScroll();
  const girlRef = useRef<THREE.Mesh>(null);
  const girlMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const boatRef = useRef<THREE.Mesh>(null);

  const walkTex = useTexture('/textures/girl-walk-right.png');
  const bendTex = useTexture('/textures/girl-bend-down.png');
  const holdTex = useTexture('/textures/girl-holding-boat.png');
  const smileTex = useTexture('/textures/girl-smile-camera.png');
  const runTex = useTexture('/textures/girl-running-away.png');
  const boatTex = useTexture('/textures/boat.png');

  useEffect(() => {
    for (const tex of [walkTex, bendTex, holdTex, smileTex, runTex, boatTex]) {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    }
  }, [walkTex, bendTex, holdTex, smileTex, runTex, boatTex]);

  const target = useRef({
    x: 12,
    y: GIRL_Y,
    z: GIRL_Z,
    scale: 1,
    opacity: 1,
    boatVisible: true,
    texture: walkTex as THREE.Texture,
  });

  useFrame((_, delta) => {
    const walkP = data.range(0.45, 0.04);
    const bendP = data.range(0.49, 0.03);
    const holdP = data.range(0.52, 0.03);
    const smileP = data.range(0.55, 0.03);
    const runP = data.range(0.58, 0.08);

    const t = target.current;
    let showGirl = walkP > 0 || bendP > 0 || holdP > 0 || smileP > 0 || runP > 0;

    if (walkP > 0 && walkP < 1) {
      t.x = THREE.MathUtils.lerp(12, 5, walkP);
      t.y = GIRL_Y;
      t.z = GIRL_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = true;
      t.texture = walkTex;
    } else if (bendP > 0 && bendP < 1) {
      t.x = 4;
      t.y = THREE.MathUtils.lerp(GIRL_Y, GIRL_Y - 0.35, Math.sin(bendP * Math.PI));
      t.z = GIRL_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = true;
      t.texture = bendTex;
    } else if (holdP > 0 && holdP < 1) {
      t.x = 4;
      t.y = GIRL_Y;
      t.z = GIRL_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = holdTex;
    } else if (smileP > 0 && smileP < 1) {
      t.x = 4;
      t.y = GIRL_Y;
      t.z = GIRL_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = smileTex;
    } else if (runP > 0) {
      t.x = 4;
      t.y = GIRL_Y;
      t.z = THREE.MathUtils.lerp(GIRL_Z, -50, Math.min(runP, 1));
      t.scale = THREE.MathUtils.lerp(1, 0.1, Math.min(runP, 1));
      t.opacity = THREE.MathUtils.lerp(1, 0.2, Math.min(runP, 1));
      t.boatVisible = false;
      t.texture = runTex;
      if (t.scale < 0.15) showGirl = false;
    } else if (data.offset < 0.45) {
      t.x = 12;
      t.y = GIRL_Y;
      t.z = GIRL_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = walkTex;
      showGirl = false;
    } else {
      // Between completed phases / past run — keep last run state hidden
      t.boatVisible = false;
      showGirl = false;
    }

    // Boat visible from walk through bend (scroll past 0.45, before hold)
    if (boatRef.current) {
      const boatShouldShow =
        data.offset >= 0.45 && holdP <= 0 && smileP <= 0 && runP <= 0 && t.boatVisible;
      boatRef.current.visible = boatShouldShow;
    }

    if (!girlRef.current || !girlMatRef.current) return;

    girlRef.current.visible = showGirl;
    if (!showGirl) return;

    girlRef.current.position.x = THREE.MathUtils.damp(
      girlRef.current.position.x,
      t.x,
      6,
      delta
    );
    girlRef.current.position.y = THREE.MathUtils.damp(
      girlRef.current.position.y,
      t.y,
      8,
      delta
    );
    girlRef.current.position.z = THREE.MathUtils.damp(
      girlRef.current.position.z,
      t.z,
      6,
      delta
    );

    const s = THREE.MathUtils.damp(girlRef.current.scale.x, t.scale, 6, delta);
    girlRef.current.scale.setScalar(s);

    girlMatRef.current.opacity = THREE.MathUtils.damp(
      girlMatRef.current.opacity,
      t.opacity,
      8,
      delta
    );

    if (girlMatRef.current.map !== t.texture) {
      girlMatRef.current.map = t.texture;
      girlMatRef.current.needsUpdate = true;
    }

    if (s < 0.15) {
      girlRef.current.visible = false;
    }
  });

  return (
    <group>
      {/* Boat beside the road */}
      <mesh
        ref={boatRef}
        position={BOAT_POS}
        rotation={[0, -0.35, -0.12]}
        visible={false}
      >
        <planeGeometry args={[2.2, 1.1]} />
        <meshBasicMaterial
          map={boatTex}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Girl sprite */}
      <mesh ref={girlRef} position={[12, GIRL_Y, GIRL_Z]} visible={false}>
        <planeGeometry args={[2, 2.5]} />
        <meshBasicMaterial
          ref={girlMatRef}
          map={walkTex}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          opacity={1}
        />
      </mesh>
    </group>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const BOAT_POS: [number, number, number] = [2, 0.15, -8];
const GIRL_Y = 1.25;
const GALI_START_Z = -5;
const GALI_END_Z = -95;

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
    x: -12,
    y: GIRL_Y,
    z: GALI_START_Z,
    scale: 1,
    opacity: 1,
    boatVisible: true,
    texture: walkTex as THREE.Texture,
  });

  useFrame((_, delta) => {
    const walkInP = data.range(0.28, 0.06); // 28-34% — walks in from left
    const bendP = data.range(0.34, 0.04); // 34-38% — bends to pick up boat
    const holdP = data.range(0.38, 0.03); // 38-41% — holds boat
    const smileP = data.range(0.41, 0.03); // 41-44% — smiles at camera
    const chaseP = data.range(0.44, 0.46); // 44-90% — chase through gali
    const fadeP = data.range(0.9, 0.05); // 90-95% — fades into fog

    const t = target.current;
    let showGirl =
      walkInP > 0 || bendP > 0 || holdP > 0 || smileP > 0 || chaseP > 0 || fadeP > 0;

    if (walkInP > 0 && walkInP < 1) {
      t.x = THREE.MathUtils.lerp(-12, 2, walkInP);
      t.y = GIRL_Y;
      t.z = GALI_START_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = true;
      t.texture = walkTex;
    } else if (bendP > 0 && bendP < 1) {
      t.x = 2;
      t.y = THREE.MathUtils.lerp(GIRL_Y, GIRL_Y - 0.35, Math.sin(bendP * Math.PI));
      t.z = GALI_START_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = true;
      t.texture = bendTex;
    } else if (holdP > 0 && holdP < 1) {
      t.x = 2;
      t.y = GIRL_Y;
      t.z = GALI_START_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = holdTex;
    } else if (smileP > 0 && smileP < 1) {
      t.x = 2;
      t.y = GIRL_Y;
      t.z = GALI_START_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = smileTex;
    } else if (chaseP > 0 && fadeP <= 0) {
      const chase = Math.min(chaseP, 1);
      t.x = Math.sin(chase * 8) * 0.5;
      t.y = GIRL_Y;
      t.z = THREE.MathUtils.lerp(GALI_START_Z, GALI_END_Z, chase);
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = runTex;
    } else if (fadeP > 0) {
      const fade = Math.min(fadeP, 1);
      t.x = Math.sin(8) * 0.5;
      t.y = GIRL_Y;
      t.z = GALI_END_Z;
      t.scale = THREE.MathUtils.lerp(1, 0.1, fade);
      t.opacity = THREE.MathUtils.lerp(1, 0, fade);
      t.boatVisible = false;
      t.texture = runTex;
      if (t.scale < 0.15) showGirl = false;
    } else if (data.offset < 0.28) {
      t.x = -12;
      t.y = GIRL_Y;
      t.z = GALI_START_Z;
      t.scale = 1;
      t.opacity = 1;
      t.boatVisible = false;
      t.texture = walkTex;
      showGirl = false;
    } else {
      t.boatVisible = false;
      showGirl = false;
    }

    if (boatRef.current) {
      // Boat visible during walk-in and bend only (before girl picks it up)
      const boatShouldShow =
        data.offset >= 0.28 && holdP <= 0 && smileP <= 0 && chaseP <= 0 && fadeP <= 0 && t.boatVisible;
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
      {/* Boat in a puddle in the gali */}
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
      <mesh ref={girlRef} position={[-12, GIRL_Y, GALI_START_Z]} visible={false}>
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

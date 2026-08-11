'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAppStore } from '@stores';
import type { ActiveRoad } from '@app-types';

const TILT = THREE.MathUtils.degToRad(6);

type SignProps = {
  map: THREE.Texture;
  position: [number, number, number];
  size: [number, number];
  road: Exclude<ActiveRoad, 'main'>;
  tiltSign: 1 | -1;
  opacityRef: React.MutableRefObject<number>;
};

function DirectionalSign({
  map,
  position,
  size,
  road,
  tiltSign,
  opacityRef,
}: SignProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const setActiveRoad = useAppStore((s) => s.setActiveRoad);
  const scaleAnim = useRef({ s: 1 });

  const handleOver = () => {
    document.body.style.cursor = 'pointer';
    const group = groupRef.current;
    const mat = matRef.current;
    if (!group) return;

    gsap.killTweensOf(group.rotation);
    gsap.killTweensOf(scaleAnim.current);
    if (mat) gsap.killTweensOf(mat.color);

    gsap.to(group.rotation, {
      z: TILT * tiltSign,
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(scaleAnim.current, {
      s: 1.1,
      duration: 0.3,
      ease: 'back.out(1.6)',
      onUpdate: () => group.scale.setScalar(scaleAnim.current.s),
    });
    if (mat) {
      gsap.to(mat.color, { r: 1.18, g: 1.18, b: 1.18, duration: 0.25 });
    }
  };

  const handleOut = () => {
    document.body.style.cursor = 'auto';
    const group = groupRef.current;
    const mat = matRef.current;
    if (!group) return;

    gsap.killTweensOf(group.rotation);
    gsap.killTweensOf(scaleAnim.current);
    if (mat) gsap.killTweensOf(mat.color);

    gsap.to(group.rotation, { z: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(scaleAnim.current, {
      s: 1,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => group.scale.setScalar(scaleAnim.current.s),
    });
    if (mat) {
      gsap.to(mat.color, { r: 1, g: 1, b: 1, duration: 0.25 });
    }
  };

  useFrame(() => {
    if (matRef.current) matRef.current.opacity = opacityRef.current;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setActiveRoad(road);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        handleOver();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        handleOut();
      }}
    >
      <mesh>
        <planeGeometry args={size} />
        <meshBasicMaterial
          ref={matRef}
          map={map}
          transparent
          alphaTest={0.2}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
          opacity={0}
        />
      </mesh>
    </group>
  );
}

export default function SignboardScene() {
  const data = useScroll();
  const rootRef = useRef<THREE.Group>(null);
  const boardRef = useRef<THREE.Group>(null);
  const postMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const opacityRef = useRef(0);

  // Cropped textures — original art is square with huge empty padding
  const postTex = useTexture('/textures/signboard-post-fit.png');
  const workTex = useTexture('/textures/sign-work-fit.png');
  const projectsTex = useTexture('/textures/sign-projects-fit.png');
  const publicationsTex = useTexture('/textures/sign-publications-fit.png');

  useEffect(() => {
    for (const tex of [postTex, workTex, projectsTex, publicationsTex]) {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    }
  }, [postTex, workTex, projectsTex, publicationsTex]);

  useFrame((state, delta) => {
    if (!rootRef.current || !boardRef.current) return;

    const reveal = data.range(0.65, 0.05);
    const show = reveal > 0;
    rootRef.current.visible = show;

    if (!show) {
      opacityRef.current = 0;
      return;
    }

    const targetOpacity = THREE.MathUtils.smoothstep(reveal, 0, 1);
    opacityRef.current = THREE.MathUtils.damp(
      opacityRef.current,
      targetOpacity,
      5,
      delta
    );

    const o = opacityRef.current;
    if (postMatRef.current) postMatRef.current.opacity = o;

    // Soft rise + gentle monsoon sway
    boardRef.current.position.y = THREE.MathUtils.lerp(-0.35, 0, o);
    boardRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.015 * o;
    boardRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.32) * 0.03 * o;
  });

  return (
    <group ref={rootRef} position={[0.15, 0, -11]} visible={false}>
      <group ref={boardRef}>
        {/* Tall post planted on the road */}
        <mesh position={[0, 2.05, 0]} renderOrder={1}>
          <planeGeometry args={[0.95, 4.7]} />
          <meshBasicMaterial
            ref={postMatRef}
            map={postTex}
            transparent
            alphaTest={0.15}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
            opacity={0}
          />
        </mesh>

        {/* Top — Work & Education → */}
        <group renderOrder={2}>
          <DirectionalSign
            map={workTex}
            position={[1.15, 3.45, 0.05]}
            size={[3.4, 1.15]}
            road="work"
            tiltSign={1}
            opacityRef={opacityRef}
          />
        </group>

        {/* Middle — ← Projects */}
        <group renderOrder={2}>
          <DirectionalSign
            map={projectsTex}
            position={[-1.05, 2.35, 0.08]}
            size={[3.15, 1.1]}
            road="projects"
            tiltSign={-1}
            opacityRef={opacityRef}
          />
        </group>

        {/* Bottom — Publications → */}
        <group renderOrder={2}>
          <DirectionalSign
            map={publicationsTex}
            position={[1.1, 1.25, 0.06]}
            size={[3.3, 1.15]}
            road="publications"
            tiltSign={1}
            opacityRef={opacityRef}
          />
        </group>
      </group>
    </group>
  );
}

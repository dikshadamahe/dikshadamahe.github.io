'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, Clouds, Text, useScroll } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const HINDI_REST_Y = 10.35;
const ENGLISH_REST_Y = 9.25;
const RISE_FROM_Y = 1.5;

export default function CloudScene() {
  const foregroundRef = useRef<THREE.Group>(null);
  const midgroundRef = useRef<THREE.Group>(null);
  const backgroundRef = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hindiRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const englishRef = useRef<any>(null);
  const opacityRef = useRef(1);
  const textYOffsetRef = useRef(0);
  const riseRef = useRef({ t: 0 });
  const data = useScroll();

  // Rise gradually from bottom — same idea as clevir.li title entrance
  useEffect(() => {
    const rise = riseRef.current;
    rise.t = 0;
    const tween = gsap.to(rise, {
      t: 1,
      duration: 3,
      ease: 'power2.out',
      delay: 0.35,
    });
    return () => {
      tween.kill();
    };
  }, []);

  useFrame((state, delta) => {
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (foregroundRef.current) {
      foregroundRef.current.position.x = THREE.MathUtils.damp(
        foregroundRef.current.position.x,
        px * 0.8,
        4,
        delta
      );
      foregroundRef.current.position.y = THREE.MathUtils.damp(
        foregroundRef.current.position.y,
        py * 0.4,
        4,
        delta
      );
    }
    if (midgroundRef.current) {
      midgroundRef.current.position.x = THREE.MathUtils.damp(
        midgroundRef.current.position.x,
        px * 0.4,
        4,
        delta
      );
      midgroundRef.current.position.y = THREE.MathUtils.damp(
        midgroundRef.current.position.y,
        py * 0.2,
        4,
        delta
      );
    }
    if (backgroundRef.current) {
      backgroundRef.current.position.x = THREE.MathUtils.damp(
        backgroundRef.current.position.x,
        px * 0.15,
        4,
        delta
      );
      backgroundRef.current.position.y = THREE.MathUtils.damp(
        backgroundRef.current.position.y,
        py * 0.08,
        4,
        delta
      );
    }

    // Hold full opacity until ~15%, then fade out 15–25%
    const fadeOut = data.range(0.15, 0.1);
    const targetOpacity = 1 - fadeOut;
    const targetYOffset = fadeOut * 1.5;

    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, targetOpacity, 5, delta);
    textYOffsetRef.current = THREE.MathUtils.damp(textYOffsetRef.current, targetYOffset, 5, delta);

    const opacity = opacityRef.current;
    const yOff = textYOffsetRef.current;
    const t = riseRef.current.t;

    if (hindiRef.current) {
      hindiRef.current.fillOpacity = opacity;
      hindiRef.current.position.y =
        THREE.MathUtils.lerp(RISE_FROM_Y + 0.9, HINDI_REST_Y, t) + yOff;
    }
    if (englishRef.current) {
      englishRef.current.fillOpacity = opacity;
      englishRef.current.position.y =
        THREE.MathUtils.lerp(RISE_FROM_Y, ENGLISH_REST_Y, t) + yOff;
    }
  });

  return (
    <group>
      <Clouds material={THREE.MeshBasicMaterial} frustumCulled={false}>
        {/* Foreground clouds (Y: 8-12, Z: -5 to 5) */}
        <group ref={foregroundRef}>
          <Cloud
            seed={1}
            position={[-4, 10, 2]}
            scale={1.4}
            opacity={0.6}
            speed={0.1}
            segments={40}
            color="#EEF0F2"
          />
          <Cloud
            seed={2}
            position={[5, 9, -2]}
            scale={1.6}
            opacity={0.6}
            speed={0.1}
            segments={40}
            color="#EEF0F2"
          />
          <Cloud
            seed={3}
            position={[0, 11, 4]}
            scale={1.3}
            opacity={0.55}
            speed={0.08}
            segments={40}
            color="#EEF0F2"
          />
          <Cloud
            seed={4}
            position={[-6, 8.5, -4]}
            scale={1.5}
            opacity={0.6}
            speed={0.1}
            segments={40}
            color="#EEF0F2"
          />
        </group>

        {/* Mid-ground clouds (Y: 10-14, Z: -15 to -5) */}
        <group ref={midgroundRef}>
          <Cloud
            seed={5}
            position={[-8, 12, -10]}
            scale={1.2}
            opacity={0.5}
            speed={0.05}
            color="#D4D8DC"
          />
          <Cloud
            seed={6}
            position={[3, 11, -12]}
            scale={1.4}
            opacity={0.5}
            speed={0.05}
            color="#D4D8DC"
          />
          <Cloud
            seed={7}
            position={[8, 13, -8]}
            scale={1.1}
            opacity={0.45}
            speed={0.04}
            color="#D4D8DC"
          />
          <Cloud
            seed={8}
            position={[-2, 14, -14]}
            scale={1.3}
            opacity={0.5}
            speed={0.05}
            color="#D4D8DC"
          />
        </group>

        {/* Background clouds (Y: 12-16, Z: -25 to -15) */}
        <group ref={backgroundRef}>
          <Cloud
            seed={9}
            position={[-10, 14, -20]}
            scale={0.9}
            opacity={0.3}
            speed={0.02}
            color="#B4C7D9"
          />
          <Cloud
            seed={10}
            position={[6, 15, -22]}
            scale={1.0}
            opacity={0.3}
            speed={0.02}
            color="#B4C7D9"
          />
          <Cloud
            seed={11}
            position={[0, 13, -18]}
            scale={0.85}
            opacity={0.28}
            speed={0.02}
            color="#B4C7D9"
          />
        </group>
      </Clouds>

      {/* In front of clouds (z > 4) so navy isn't washed by translucent cloud layers */}
      <Text
        ref={hindiRef}
        font="/fonts/YatraOne-Regular.ttf"
        fontSize={1.65}
        letterSpacing={0.02}
        position={[0, RISE_FROM_Y + 0.9, 7]}
        color="#243B53"
        anchorX="center"
        anchorY="middle"
        fillOpacity={1}
        depthTest={false}
        renderOrder={10}
      >
        नमस्ते
      </Text>

      <Text
        ref={englishRef}
        font="/fonts/CormorantGaramond-Bold.ttf"
        fontSize={1.05}
        letterSpacing={0.08}
        position={[0, RISE_FROM_Y, 7]}
        color="#243B53"
        anchorX="center"
        anchorY="middle"
        fillOpacity={1}
        depthTest={false}
        renderOrder={10}
      >
        Namaste
      </Text>
    </group>
  );
}

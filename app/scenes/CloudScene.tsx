'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, Clouds, Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Exact cloud setup from clevir.li (mohitvirli Cloud.tsx).
 * Same props + same texture. Group offset puts the bank in the lower
 * frame under camera [0,10,15], matching their cam [0,0,5] + group [0,-5,0].
 */
function ClevirClouds() {
  return (
    <Clouds
      material={THREE.MeshBasicMaterial}
      texture="/textures/cloud.png"
      position={[0, 2, 8]}
      frustumCulled={false}
    >
      <Cloud
        seed={1}
        segments={1}
        concentrate="inside"
        bounds={[10, 10, 10]}
        growth={3}
        position={[-1, 0, 0]}
        smallestVolume={2}
        scale={1.9}
        volume={2}
        speed={0.2}
        fade={5}
      />
      <Cloud
        seed={3}
        segments={1}
        concentrate="outside"
        bounds={[10, 10, 10]}
        growth={2}
        position={[2, 0, 2]}
        smallestVolume={2}
        scale={1}
        volume={2}
        fade={3}
        speed={0.1}
      />
      <Cloud
        seed={4}
        segments={1}
        concentrate="outside"
        bounds={[10, 20, 15]}
        growth={4}
        position={[-10, -10, 4]}
        smallestVolume={2}
        scale={2}
        speed={0.2}
        volume={3}
      />
      <Cloud
        seed={5}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[6, -3, 8]}
        smallestVolume={2}
        scale={2}
        volume={2}
        fade={0.1}
        speed={0.1}
      />
      <Cloud
        seed={6}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[0, -20, 20]}
        smallestVolume={2}
        scale={4}
        volume={3}
        fade={0.1}
        speed={0.1}
      />
      <Cloud
        seed={7}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[10, -15, -5]}
        smallestVolume={2}
        scale={3}
        volume={3}
        fade={0.1}
        speed={0.1}
      />
    </Clouds>
  );
}

export default function CloudScene() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hindiRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const englishRef = useRef<any>(null);
  const opacityRef = useRef(0);
  const textYOffsetRef = useRef(0);
  const data = useScroll();

  useFrame((_, delta) => {
    const fadeIn = data.range(0.05, 0.1);
    const fadeOut = data.range(0.15, 0.1);
    const targetOpacity = fadeIn * (1 - fadeOut);
    const targetYOffset = fadeOut * 1.5;

    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, targetOpacity, 5, delta);
    textYOffsetRef.current = THREE.MathUtils.damp(textYOffsetRef.current, targetYOffset, 5, delta);

    const opacity = opacityRef.current;
    const yOff = textYOffsetRef.current;

    if (hindiRef.current) {
      hindiRef.current.fillOpacity = opacity;
      hindiRef.current.position.y = 10 + yOff;
    }
    if (englishRef.current) {
      englishRef.current.fillOpacity = opacity;
      englishRef.current.position.y = 8.5 + yOff;
    }
  });

  return (
    <group>
      <ClevirClouds />

      <Text
        ref={hindiRef}
        font="/Yatra_One/YatraOne-Regular.ttf"
        fontSize={2.5}
        position={[0, 10, -12]}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
      >
        नमस्ते
      </Text>

      <Text
        ref={englishRef}
        font="/Cormorant_Garamond/static/CormorantGaramond-Regular.ttf"
        fontSize={1.2}
        position={[0, 8.5, -12]}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
      >
        Namaste
      </Text>
    </group>
  );
}

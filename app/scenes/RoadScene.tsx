'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const LEFT_BUSHES = [
  { position: [-7.5, 0.8, 5] as [number, number, number], scale: [1.2, 1.6, 1] as [number, number, number] },
  { position: [-6.5, 0.6, -5] as [number, number, number], scale: [1.4, 1.2, 1] as [number, number, number] },
  { position: [-7, 0.9, -15] as [number, number, number], scale: [1.1, 1.8, 1] as [number, number, number] },
  { position: [-6.8, 0.7, -28] as [number, number, number], scale: [1.3, 1.4, 1] as [number, number, number] },
];

const RIGHT_BUSHES = [
  { position: [7.5, 0.8, 3] as [number, number, number], scale: [1.3, 1.5, 1] as [number, number, number] },
  { position: [6.5, 0.65, -8] as [number, number, number], scale: [1.2, 1.3, 1] as [number, number, number] },
  { position: [7.2, 0.85, -18] as [number, number, number], scale: [1.4, 1.7, 1] as [number, number, number] },
  { position: [6.8, 0.7, -30] as [number, number, number], scale: [1.1, 1.4, 1] as [number, number, number] },
];

export default function RoadScene() {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.visible = data.offset >= 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} visible={false}>
      {/* Wet road ground */}
      <mesh
        position={[0, 0, -20]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#6B7B8D" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Road center line */}
      <mesh position={[0, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 80]} />
        <meshStandardMaterial color="#8FA3B5" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Left roadside greenery */}
      {LEFT_BUSHES.map((bush, i) => (
        <mesh key={`left-${i}`} position={bush.position} scale={bush.scale}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#7BA086" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Right roadside greenery */}
      {RIGHT_BUSHES.map((bush, i) => (
        <mesh key={`right-${i}`} position={bush.position} scale={bush.scale}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#7BA086" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Distant misty hills backdrop */}
      <mesh position={[0, 8, -60]}>
        <planeGeometry args={[120, 40]} />
        <meshStandardMaterial color="#8FA3B5" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Text, useScroll } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAppStore } from '@stores';
import type { ActiveRoad } from '@app-types';

const BUILDING_ZS = [-5, -15, -25, -35, -45, -55, -65, -75, -85, -95];
const BUILDING_COLORS = [
  '#D4B896',
  '#C27B5B',
  '#8BA4B5',
  '#A8C3A0',
  '#B5A99A',
  '#D4B896',
  '#C27B5B',
  '#8BA4B5',
  '#A8C3A0',
  '#B5A99A',
];

const PUDDLE_ZS = [-8, -22, -40, -58, -78];
const WIRE_ZS = [-20, -50, -80];

type SectionBoardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  road: Exclude<ActiveRoad, 'main'>;
};

function SectionBoard({ position, rotation, label, road }: SectionBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const setActiveRoad = useAppStore((s) => s.setActiveRoad);
  const scaleAnim = useRef({ s: 1 });

  const handleOver = () => {
    document.body.style.cursor = 'pointer';
    const group = groupRef.current;
    if (!group) return;
    gsap.killTweensOf(scaleAnim.current);
    gsap.to(scaleAnim.current, {
      s: 1.08,
      duration: 0.3,
      ease: 'back.out(1.6)',
      onUpdate: () => group.scale.setScalar(scaleAnim.current.s),
    });
  };

  const handleOut = () => {
    document.body.style.cursor = 'auto';
    const group = groupRef.current;
    if (!group) return;
    gsap.killTweensOf(scaleAnim.current);
    gsap.to(scaleAnim.current, {
      s: 1,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => group.scale.setScalar(scaleAnim.current.s),
    });
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
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
        <planeGeometry args={[2.5, 0.8]} />
        <meshStandardMaterial color="#6B4226" />
      </mesh>
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.25}
        color="white"
        font="/fonts/CormorantGaramond-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function BuildingFacade({
  side,
  z,
  color,
  index,
}: {
  side: 'left' | 'right';
  z: number;
  color: string;
  index: number;
}) {
  const x = side === 'left' ? -3.5 : 3.5;
  const rotY = side === 'left' ? Math.PI / 2 : -Math.PI / 2;
  const hasRoof = index % 2 === 0;
  const windowY = 2.5 + (index % 3) * 0.35;

  return (
    <group position={[x, 2.5, z]} rotation={[0, rotY, 0]}>
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>

      {/* Door */}
      <mesh position={[0.4 - (index % 3) * 0.3, -1.75, 0.02]}>
        <boxGeometry args={[0.8, 1.5, 0.02]} />
        <meshStandardMaterial color="#3D2B1F" roughness={0.9} />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.9, windowY - 2.5, 0.02]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshStandardMaterial color="#2A3540" roughness={0.5} />
      </mesh>
      <mesh position={[0.7, windowY - 2.5 + 0.2, 0.02]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshStandardMaterial color="#2A3540" roughness={0.5} />
      </mesh>

      {hasRoof && (
        <mesh
          position={[0, 2.7, 0.35]}
          rotation={[-0.35, 0, 0]}
        >
          <planeGeometry args={[4.4, 0.9]} />
          <meshStandardMaterial color="#6B6B6B" metalness={0.4} roughness={0.45} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

export default function GaliScene() {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.visible = data.offset >= 0.2;
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Narrow wet lane */}
      <mesh position={[0, 0, -50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 200]} />
        <meshStandardMaterial color="#5A6B6D" roughness={0.25} metalness={0.05} />
      </mesh>

      {/* Buildings — left & right */}
      {BUILDING_ZS.map((z, i) => (
        <BuildingFacade
          key={`L-${z}`}
          side="left"
          z={z}
          color={BUILDING_COLORS[i]}
          index={i}
        />
      ))}
      {BUILDING_ZS.map((z, i) => (
        <BuildingFacade
          key={`R-${z}`}
          side="right"
          z={z}
          color={BUILDING_COLORS[(i + 2) % BUILDING_COLORS.length]}
          index={i + 1}
        />
      ))}

      {/* Puddles */}
      {PUDDLE_ZS.map((z, i) => (
        <mesh
          key={`puddle-${z}`}
          position={[(i % 2 === 0 ? 1.2 : -1.0), 0.01, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.8, 24]} />
          <meshStandardMaterial
            color="#A3C1D4"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Electric wires across the lane */}
      {WIRE_ZS.map((z) => (
        <Line
          key={`wire-${z}`}
          points={[
            [-3, 4.5, z],
            [3, 4.2, z],
          ]}
          color="#2C2C2C"
          lineWidth={1}
        />
      ))}

      {/* Section navigation boards on building walls */}
      <SectionBoard
        position={[3.45, 2.5, -30]}
        rotation={[0, -Math.PI / 2, 0]}
        label="PROJECTS"
        road="projects"
      />
      <SectionBoard
        position={[-3.45, 2.5, -60]}
        rotation={[0, Math.PI / 2, 0]}
        label="WORK & EDUCATION"
        road="work"
      />
      <SectionBoard
        position={[3.45, 2.5, -85]}
        rotation={[0, -Math.PI / 2, 0]}
        label="PUBLICATIONS"
        road="publications"
      />
    </group>
  );
}

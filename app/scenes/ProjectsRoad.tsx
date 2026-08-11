'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import RainSystem from '@effects/RainSystem';
import { PROJECTS } from '@constants/projects';
import type { Project } from '@app-types';

const FONT = '/fonts/CormorantGaramond-Bold.ttf';
const MILESTONE_SPACING = 8;
/** First milestone sits ahead of the camera (not coplanar at Z=0). */
const FIRST_MILESTONE_Z = -8;
const CAMERA_Z_START = 0;
const CAMERA_Z_END =
  FIRST_MILESTONE_Z - (PROJECTS.length - 1) * MILESTONE_SPACING - 6;

type ProjectsRoadProps = {
  onSelectProject: (project: Project) => void;
};

function RoadCamera() {
  const { camera } = useThree();
  const data = useScroll();
  const initialized = useRef(false);

  useEffect(() => {
    camera.position.set(0, 2, CAMERA_Z_START);
    camera.rotation.set(-0.1, 0, 0);
    initialized.current = true;
  }, [camera]);

  useFrame((_, delta) => {
    if (!initialized.current) return;

    const z = THREE.MathUtils.lerp(CAMERA_Z_START, CAMERA_Z_END, data.offset);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 2, 5, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 5, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.1, 5, delta);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, 0, 5, delta);
  });

  return null;
}

/** Keeps rain clustered around the moving camera along the long road. */
function FollowingRain() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = camera.position.z;
    }
  });

  return (
    <group ref={groupRef}>
      <RainSystem />
    </group>
  );
}

function ProjectMilestone({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const x = index % 2 === 0 ? -3 : 3;
  const z = FIRST_MILESTONE_Z - index * MILESTONE_SPACING;

  return (
    <group
      position={[x, 1, z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>

      <Text
        position={[0, 0.35, 0.06]}
        fontSize={0.14}
        color="white"
        maxWidth={1.3}
        textAlign="center"
        font={FONT}
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      <Text
        position={[0, -0.35, 0.06]}
        fontSize={0.1}
        color="#D4D8DC"
        font={FONT}
        anchorX="center"
        anchorY="middle"
      >
        {project.date}
      </Text>
    </group>
  );
}

export default function ProjectsRoad({ onSelectProject }: ProjectsRoadProps) {
  const roadLength = Math.abs(CAMERA_Z_END) + 40;
  const roadCenterZ = CAMERA_Z_END / 2;

  return (
    <>
      <RoadCamera />
      <ambientLight intensity={0.6} />
      <fog attach="fog" args={['#B4C7D9', 5, 40]} />
      <FollowingRain />

      {/* Wet road ground — longer than main scene */}
      <mesh position={[0, 0, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, roadLength]} />
        <meshStandardMaterial color="#6B7B8D" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Road center line */}
      <mesh position={[0, 0.01, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, roadLength]} />
        <meshStandardMaterial color="#8FA3B5" roughness={0.4} metalness={0.05} />
      </mesh>

      {PROJECTS.map((project, i) => (
        <ProjectMilestone
          key={project.id}
          project={project}
          index={i}
          onSelect={onSelectProject}
        />
      ))}
    </>
  );
}

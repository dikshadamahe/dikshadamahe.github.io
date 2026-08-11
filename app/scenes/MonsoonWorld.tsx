'use client';

import ScrollCamera from '@components/ScrollCamera';
import CloudScene from '@scenes/CloudScene';
import RoadScene from '@scenes/RoadScene';
import GirlSequence from '@scenes/GirlSequence';
import SignboardScene from '@scenes/SignboardScene';
import RainSystem from '@effects/RainSystem';

export default function MonsoonWorld() {
  return (
    <>
      <ScrollCamera />
      <CloudScene />
      <RainSystem />
      <RoadScene />
      <GirlSequence />
      <SignboardScene />
    </>
  );
}

'use client';

import ScrollCamera from '@components/ScrollCamera';
import CloudScene from '@scenes/CloudScene';
import GaliScene from '@scenes/GaliScene';
import GirlSequence from '@scenes/GirlSequence';
import RainSystem from '@effects/RainSystem';

export default function MonsoonWorld() {
  return (
    <>
      <ScrollCamera />
      <CloudScene />
      <RainSystem />
      <GaliScene />
      <GirlSequence />
    </>
  );
}

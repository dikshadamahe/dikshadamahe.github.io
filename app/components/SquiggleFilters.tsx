/**
 * Displacement filters cycled by the `squiggle` keyframes so outlines wobble
 * like a hand-drawn line.
 */
export default function SquiggleFilters() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {[0, 1, 2].map((seed) => (
          <filter key={seed} id={`squiggle-${seed}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves="2"
              result="noise"
              seed={seed}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

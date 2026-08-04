# Diksha Damahe — Monsoon Portfolio: Master Build Plan

> **How to use this file:** Each phase below is a self-contained prompt. Copy the entire phase section and paste it into a new Cursor chat to have the AI build that phase. Each phase includes all context, file paths, data, and instructions needed.

---

## Project Overview

An immersive, scroll-driven Indian monsoon world portfolio website. NOT a conventional portfolio. The visitor travels through monsoon clouds, descends to a rainy road, watches a girl pick up a boat, then discovers portfolio content through environmental storytelling.

- **Location:** `d:\Projects\Resume\Diksha\portfolio\`
- **Framework:** Next.js (App Router, static export)
- **Deploy:** Vercel
- **Art style:** Warm storybook illustration matching `girl.png`
- **Inspiration:** [clevir.li](https://clevir.li/) for scroll-driven camera feel. Do NOT copy any code/assets from it.

## Available Assets (already in portfolio folder)

- `portfolio/girl.png` — Character reference sheet (10 poses)
- `portfolio/Yatra_One/YatraOne-Regular.ttf` — Hindi Devanagari font
- `portfolio/Cormorant_Garamond/CormorantGaramond-VariableFont_wght.ttf` — English variable font
- `portfolio/Cormorant_Garamond/static/CormorantGaramond-Regular.ttf` — English regular weight
- `portfolio/Cormorant_Garamond/static/CormorantGaramond-SemiBold.ttf` — English semibold weight

## Color Palette

| Name | Hex | Use |
|------|-----|-----|
| Misty blue | `#B4C7D9` | Sky, fog, canvas background |
| Pale grey | `#D4D8DC` | Distant clouds |
| Cloudy white | `#EEF0F2` | Cloud highlights |
| Muted blue-grey | `#8FA3B5` | Mid-distance |
| Wet road | `#6B7B8D` | Road surface |
| Rain accent | `#A3C1D4` | Rain droplets |
| Greenery | `#7BA086` | Plants |
| Raincoat yellow | `#D4A017` | Warm accents |
| Earth warm | `#8B7355` | Wood, stones |

---

## PHASE 1 — Scaffolding + Sky

### Cursor Prompt (copy everything below the line)

---

You are building an immersive Indian monsoon portfolio website. This is Phase 1 of 7 — setting up the project and building the opening sky scene.

**Project location:** `d:\Projects\Resume\Diksha\portfolio\`

**What already exists in this folder:**
- `portfolio-plan.md` and `asset-prompts.md` (documentation, don't modify)
- `girl.png` (character reference, don't modify)
- `Yatra_One/YatraOne-Regular.ttf` (Hindi font)
- `Cormorant_Garamond/` folder with TTF font files

**What to build in this phase:**
1. Next.js project scaffolding with all dependencies
2. Full file structure (types, constants, stores, components, scenes)
3. R3F Canvas with Drei ScrollControls
4. Layered monsoon cloud scene with depth and parallax
5. Rain particle system
6. "नमस्ते / Namaste" typography that fades in on scroll

### Step 1: Create the Next.js project

Run inside `d:\Projects\Resume\Diksha\portfolio\`:

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --use-npm
```

If it asks about overwriting existing files, say yes (it won't touch the font folders or plan files).

Then install dependencies:

```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react zustand framer-motion howler
npm install -D @types/three @types/howler
```

### Step 2: Configure Next.js

**`next.config.ts`:**
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: false,
  images: { unoptimized: true },
};

export default nextConfig;
```

`reactStrictMode: false` is required because R3F's `useFrame` mutates objects directly, which strict mode double-invocation would break.

**Add path aliases to `tsconfig.json`** — add these to `compilerOptions.paths`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@scenes/*": ["./app/scenes/*"],
      "@components/*": ["./app/components/*"],
      "@effects/*": ["./app/effects/*"],
      "@stores": ["./app/stores/useAppStore"],
      "@constants/*": ["./app/constants/*"],
      "@app-types": ["./app/types/index"]
    }
  }
}
```

### Step 3: Create type definitions

**`app/types/index.ts`:**
```typescript
export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
}

export interface TimelineEntry {
  id: string;
  type: 'education' | 'work';
  title: string;
  subtitle: string;
  date: string;
  detail: string | null;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  location: string;
  highlight: string;
  doi: string;
}

export type Season = 'monsoon' | 'summer';
export type ActiveRoad = 'main' | 'projects' | 'work' | 'publications';
```

### Step 4: Create data constants

**`app/constants/colors.ts`:**
```typescript
export const COLORS = {
  mistyBlue: '#B4C7D9',
  paleGrey: '#D4D8DC',
  cloudyWhite: '#EEF0F2',
  mutedBlueGrey: '#8FA3B5',
  wetRoad: '#6B7B8D',
  rainAccent: '#A3C1D4',
  greenery: '#7BA086',
  raincoatYellow: '#D4A017',
  earthWarm: '#8B7355',
} as const;
```

**`app/constants/projects.ts`:**
```typescript
import { Project } from '@app-types';

export const PROJECTS: Project[] = [
  {
    id: 'hostel-bites',
    title: 'Hostel-Bites',
    date: '2025',
    description: 'Firebase-based meal ordering platform for hostel students.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/dikshadamahe/Hostel-Bites',
    live: 'https://hostel-bites-1.web.app',
  },
  {
    id: 'ielts',
    title: 'IELTS Precision & Progress',
    date: 'Sep 2025',
    description: 'Conversion-focused IELTS institute landing page with metric cards, testimonials, and enrollment form.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/dikshadamahe/IELTS',
    live: 'https://ielts-nu.vercel.app',
  },
  {
    id: 'aegis-vault',
    title: 'Aegis Vault',
    date: 'Oct 2025',
    description: 'Secure password manager with client-side envelope encryption and searchable vault dashboard.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Prisma', 'NextAuth', 'libsodium'],
    github: 'https://github.com/dikshadamahe/Aegis-Vault',
    live: 'https://aegis-vault.vercel.app',
  },
  {
    id: 'vyomgarud',
    title: 'VyomGarud',
    date: 'Nov 2025',
    description: 'Cinematic counter-UAV defense marketing site with hero video, animated metrics, and product sections.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/dikshadamahe/Vyom-Garud',
    live: 'https://vyom-garud-seven.vercel.app',
  },
  {
    id: 'fossee',
    title: 'FOSSEE Chemical Equipment Visualizer',
    date: 'Feb 2026',
    description: 'Hybrid web + desktop analytics for chemical equipment. Django REST backend, React web, PyQt5 desktop, shared API.',
    tech: ['Django', 'DRF', 'React', 'PyQt5', 'Chart.js', 'Pandas'],
    github: 'https://github.com/dikshadamahe/fossee-project',
    live: 'https://fossee-project-eta.vercel.app',
  },
  {
    id: 'nafld',
    title: 'NAFLD Risk Stratification Pipeline',
    date: 'Feb 2026',
    description: 'Research ML pipeline benchmarking 24 classifiers on NHANES data. Best model: AdaBoost at 0.9679 ROC-AUC.',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Matplotlib'],
    github: 'https://github.com/dikshadamahe/NAFLD-Model',
    live: null,
  },
  {
    id: 'note-assistant',
    title: 'Note Assistant Chatbot',
    date: 'Mar 2026',
    description: 'BERT-based semantic search chatbot for note retrieval.',
    tech: ['Python', 'BERT', 'NLP'],
    github: 'https://github.com/dikshadamahe/Note-Assistant-chatbot-',
    live: null,
  },
  {
    id: 'veil',
    title: 'Veil Android',
    date: '2026',
    description: 'Flutter-based streaming client application.',
    tech: ['Flutter', 'Dart', 'TypeScript'],
    github: 'https://github.com/dikshadamahe/veil-android',
    live: null,
  },
  {
    id: 'recovai',
    title: 'RecovAI',
    date: 'May 2026',
    description: 'AI decision-support for copper flotation at HCL. Predicts recovery (R² 0.972), optimizes reagent dosing, SHAP explanations. Trained on 1,778 digitized shift logs.',
    tech: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'SciPy', 'SQLite'],
    github: 'https://github.com/dikshadamahe/RecovAI',
    live: 'https://recovai-xys2.onrender.com',
  },
];
```

**`app/constants/work.ts`:**
```typescript
import { TimelineEntry } from '@app-types';

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'vit',
    type: 'education',
    title: 'VIT Bhopal University',
    subtitle: 'BTech CSE (Artificial Intelligence & Machine Learning)',
    date: '2023 – 2027',
    detail: 'CGPA: 8.03',
  },
  {
    id: 'fintech-writer',
    type: 'work',
    title: 'FinTech Club, VIT Bhopal',
    subtitle: 'Content Writer',
    date: 'Oct 2024 – Nov 2025',
    detail: null,
  },
  {
    id: 'fintech-lead',
    type: 'work',
    title: 'FinTech Club, VIT Bhopal',
    subtitle: 'Content Team Lead',
    date: 'Nov 2025 – Jul 2026',
    detail: 'Content strategy and execution for club events',
  },
  {
    id: 'hcl',
    type: 'work',
    title: 'Hindustan Copper Ltd',
    subtitle: 'Engineer Intern',
    date: 'May 2026 – Jul 2026',
    detail: 'Malanjkhand Copper Project — Built RecovAI for copper flotation optimization',
  },
];
```

**`app/constants/publications.ts`:**
```typescript
import { Publication } from '@app-types';

export const PUBLICATIONS: Publication[] = [
  {
    id: 'sparta',
    title: 'Secure Phishing Analysis and Robust Training Algorithm (SPARTA) for Phishing Website Detection',
    authors: 'Diksha Damahe, Ajay Kumar Phulre',
    venue: "IEEE International Students' Conference on Electrical, Electronics and Computer Science (SCEECS)",
    year: '2026',
    location: 'Bhopal, India',
    highlight: '99.15% detection rate on PhishTank and UCI benchmarks',
    doi: 'https://doi.org/10.1109/SCEECS68810.2026.11430134',
  },
];
```

### Step 5: Create Zustand store

**`app/stores/useAppStore.ts`:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Season, ActiveRoad } from '@app-types';

interface AppState {
  season: Season;
  activeRoad: ActiveRoad;
  setActiveRoad: (road: ActiveRoad) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      season: 'monsoon',
      activeRoad: 'main',
      setActiveRoad: (road) => set({ activeRoad: road }),
      soundEnabled: false,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({
        season: state.season,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
```

### Step 6: Create globals.css

**`app/globals.css`:**
```css
@import "tailwindcss";

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  overscroll-behavior: none;
  background: #B4C7D9;
  margin: 0;
  padding: 0;
  font-family: 'Cormorant Garamond', serif;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
```

### Step 7: Create layout.tsx

**`app/layout.tsx`:**

Load both fonts using `next/font/local`. The Yatra One font is at `./Yatra_One/YatraOne-Regular.ttf` relative to the project root. The Cormorant Garamond variable font is at `./Cormorant_Garamond/CormorantGaramond-VariableFont_wght.ttf`.

Set metadata: title "Diksha Damahe", description "AI/ML engineer and full-stack developer. Explore my work through an interactive monsoon world.", viewport with themeColor `#B4C7D9`.

### Step 8: Create page.tsx

**`app/page.tsx`:**
- `'use client'`
- Import and render `<CanvasWrapper />`
- Full viewport height div wrapper

### Step 9: Build CanvasWrapper

**`app/components/CanvasWrapper.tsx`:**
- `'use client'`
- Full viewport div (`h-[100dvh] w-full relative`)
- R3F `<Canvas>` with:
  - `dpr={[1, 2]}`
  - `camera={{ position: [0, 10, 15], fov: 60 }}`
  - Style: absolute positioning, full parent size
- Inside Canvas:
  - `<Suspense fallback={null}>`
  - `<ambientLight intensity={0.6} />`
  - `<fog attach="fog" args={['#B4C7D9', 10, 60]} />`
  - Drei `<ScrollControls pages={5} damping={0.3}>` wrapping the scene
  - Inside ScrollControls: `<MonsoonWorld />`
  - `<Preload all />` (from Drei)

### Step 10: Build MonsoonWorld

**`app/scenes/MonsoonWorld.tsx`:**
- Reads `activeRoad` from `useAppStore`
- For now, only handle `activeRoad === 'main'`:
  - Render `<ScrollCamera />`
  - Render `<CloudScene />`
  - Render `<RainSystem />`
- Other roads will be added in later phases
- Wrap everything in a `<group>`

### Step 11: Build ScrollCamera

**`app/components/ScrollCamera.tsx`:**
- Uses `useScroll()` from `@react-three/drei` and `useFrame` from `@react-three/fiber`
- Uses `useThree()` to access camera
- On each frame:
  - Read `data.offset` (0 to 1 overall scroll progress)
  - **Camera Y position:**
    - scroll 0.0–0.2: stay at Y=10 (in clouds)
    - scroll 0.2–0.5: interpolate Y from 10 down to 2 (descending through clouds to road)
    - scroll 0.5–1.0: stay at Y=2 (road level)
  - **Camera rotation X:**
    - scroll 0.0–0.2: 0 (looking forward into clouds)
    - scroll 0.2–0.5: tilt slightly down (about -0.3 radians) to look at approaching ground
    - scroll 0.5–1.0: level back to ~-0.1 (slight downward, looking at road)
  - Use `THREE.MathUtils.damp()` for smooth interpolation (damping factor 5, delta from useFrame)
  - **Mouse parallax (desktop only):** `camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 120, 0.05)`

### Step 12: Build CloudScene

**`app/scenes/CloudScene.tsx`:**

Since we don't have cloud texture PNGs yet, use Drei's built-in `<Cloud>` and `<Clouds>` components as the initial implementation. These create procedural 3D clouds that look good.

```typescript
import { Cloud, Clouds } from '@react-three/drei';
```

Create multiple cloud layers:

**Foreground clouds (Y: 8-12, Z: -5 to 5):**
- 3-4 large Cloud components with `opacity={0.6}`, `speed={0.1}`, `segments={40}`
- Light color: `#EEF0F2`

**Mid-ground clouds (Y: 10-14, Z: -15 to -5):**
- 3-4 medium Cloud components with `opacity={0.5}`, `speed={0.05}`
- Color: `#D4D8DC`

**Background clouds (Y: 12-16, Z: -25 to -15):**
- 2-3 small/distant Cloud components with `opacity={0.3}`, `speed={0.02}`
- Color: `#B4C7D9`

Wrap all clouds in a `<Clouds>` container from Drei.

Add mouse parallax to the cloud group: in `useFrame`, slightly offset the cloud group's X/Y position based on `state.pointer`, with different multipliers per layer (foreground moves more, background moves less).

**Namaste text:**

Using Drei `<Text>` component with the font files:
- Hindi "नमस्ते": `font="/Yatra_One/YatraOne-Regular.ttf"`, `fontSize={2.5}`, positioned at `[0, 10, -12]`, white color
- English "Namaste": `font="/Cormorant_Garamond/static/CormorantGaramond-Regular.ttf"`, `fontSize={1.2}`, positioned at `[0, 8.5, -12]`, white color

Both texts should use `useScroll()`:
- `fillOpacity` driven by scroll: fade in during `range(0.05, 0.1)` (scroll 5-15%)
- `fillOpacity` fades out during `range(0.15, 0.1)` (scroll 15-25%)
- Y position shifts upward slightly as they fade out (text drifts up as camera descends)

Use `useFrame` + `THREE.MathUtils.damp` for smooth opacity and position changes.

### Step 13: Build RainSystem

**`app/effects/RainSystem.tsx`:**

Create a rain particle system using `<instancedMesh>`:

```typescript
const COUNT = 1500;
const rainRef = useRef<THREE.InstancedMesh>(null);
const dummy = useMemo(() => new THREE.Object3D(), []);
```

Each raindrop is an instance of a thin box geometry: `<boxGeometry args={[0.01, 0.2, 0.01]} />`

Material: `<meshBasicMaterial color="#A3C1D4" transparent opacity={0.4} />`

Initialize positions randomly:
- X: random between -20 and 20
- Y: random between 0 and 25
- Z: random between -20 and 20

In `useFrame`:
- Move each droplet down by `speed * delta * 60`
- Speed varies per droplet (0.15 to 0.4, set at init)
- When Y < -2, reset to Y = 20 + random(0, 5) with new random X/Z
- Call `rainRef.current.instanceMatrix.needsUpdate = true`

The rain should be always visible regardless of scroll position — it's a constant part of the monsoon world.

### Step 14: Verify the build

After building all the above:
1. Run `npm run dev` and verify the site loads
2. You should see: monsoon clouds filling the viewport, rain falling, and as you scroll, "नमस्ते / Namaste" fades in among the clouds
3. Further scrolling should move the camera downward through the clouds
4. The rain should be continuous throughout

### File structure after Phase 1:

```
portfolio/
  app/
    page.tsx
    layout.tsx
    globals.css
    components/
      CanvasWrapper.tsx
      ScrollCamera.tsx
    scenes/
      MonsoonWorld.tsx
      CloudScene.tsx
    effects/
      RainSystem.tsx
    constants/
      colors.ts
      projects.ts
      work.ts
      publications.ts
    stores/
      useAppStore.ts
    types/
      index.ts
  public/
    (fonts will be served from project root Yatra_One/ and Cormorant_Garamond/ folders)
  next.config.ts
  tsconfig.json
  package.json
```

---

## PHASE 2 — Scroll Journey + Road

### Cursor Prompt

---

This is Phase 2 of 7 for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (built in Phase 1):**
- Next.js project with all dependencies installed (three, @react-three/fiber, @react-three/drei, gsap, zustand, framer-motion, howler)
- R3F Canvas with `ScrollControls pages={5}` in `app/components/CanvasWrapper.tsx`
- `app/scenes/MonsoonWorld.tsx` — top-level scene, renders CloudScene + RainSystem
- `app/components/ScrollCamera.tsx` — scroll-driven camera (Y: 10→2 as user scrolls)
- `app/scenes/CloudScene.tsx` — procedural Drei clouds + "नमस्ते / Namaste" text
- `app/effects/RainSystem.tsx` — 1500 instanced rain droplets
- Zustand store at `app/stores/useAppStore.ts` with season, activeRoad, soundEnabled
- All data constants at `app/constants/` (projects, work, publications, colors)
- Types at `app/types/index.ts`

**What to build in this phase:**
1. Road scene that appears below the clouds when camera descends
2. Wet road ground plane with road markings
3. Roadside greenery (bushes, grass as simple colored planes for now)
4. Distant landscape backdrop
5. Update ScrollCamera so the descent feels like a continuous transition from sky to ground

### What to build

**`app/scenes/RoadScene.tsx`:**

This is the ground-level monsoon road environment. It should be positioned at Y=0 in the 3D scene (the clouds are at Y=8-16, so the camera descends from clouds down to this level).

Create a `<group>` at `position={[0, 0, 0]}`:

1. **Ground plane:** A large horizontal `<mesh>` with `<planeGeometry args={[40, 80]} />` rotated to horizontal (`rotation={[-Math.PI/2, 0, 0]}`). Use `<meshStandardMaterial color="#6B7B8D" roughness={0.3} metalness={0.1} />` to give it a wet, slightly reflective look. Position at `[0, 0, -20]`.

2. **Road center line:** A thin plane on top of the ground, slightly lighter color (`#8FA3B5`), narrow (`args={[0.3, 80]}`), same rotation, Y slightly above ground (`y=0.01`).

3. **Roadside greenery (left):** 3-4 vertical planes along the left edge of the road at X = -8 to -6, spaced along Z. Use green color `#7BA086`. These are placeholder rectangles for now — they'll be replaced with illustrated bushes in Phase 7.

4. **Roadside greenery (right):** Same on the right side at X = 6 to 8.

5. **Distant landscape backdrop:** A very large vertical plane at Z = -60, spanning the full width. Color: gradient-like effect using a subtle blue-grey `#8FA3B5`. This represents distant misty hills.

6. **Visibility:** The entire RoadScene group should only be visible when the camera has descended enough. Use `useScroll()` in a `useFrame` — when `data.offset < 0.2`, set the group's `visible = false`. Above 0.2, set `visible = true`. This prevents the road from being seen from cloud-level.

**Update `MonsoonWorld.tsx`:**
- Add `<RoadScene />` alongside CloudScene and RainSystem (the road exists in the same 3D space, just lower)

**Update `ScrollCamera.tsx`:**
- Refine the camera descent curve for a cinematic feel:
  - scroll 0.0–0.15: camera at Y=10, looking into clouds
  - scroll 0.15–0.25: Namaste text visible, camera still high
  - scroll 0.25–0.50: camera descends from Y=10 to Y=2 (this is the key transition)
  - scroll 0.50–1.00: camera at Y=2, road level
- During descent (0.25-0.50), also move camera Z forward slightly (Z: 15 to 5) to create a sense of approaching the road
- Camera rotation X: from 0 to -0.2 during descent, settling at -0.1 at road level (slight downward look at the road surface)
- All transitions via `THREE.MathUtils.damp()` with delta

**Update `CloudScene.tsx`:**
- Clouds remain at their positions. As the camera descends past them, they naturally appear to move upward (parallax). No code change needed — the camera movement handles this.

### Deliverable
Scrolling creates a continuous journey: clouds at the top → camera descends through cloud layers → road appears below → camera arrives at road level. Rain persists throughout. The transition should feel like one continuous camera movement through the monsoon world.

---

## PHASE 3 — Story Sequence (Boat + Girl + Signboard)

### Cursor Prompt

---

This is Phase 3 of 7 for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (Phase 1 + 2):**
- Full Next.js project with R3F canvas, ScrollControls (5 pages), Zustand store
- CloudScene with procedural clouds and "नमस्ते / Namaste" text
- RainSystem with 1500 instanced rain droplets
- ScrollCamera that descends from Y=10 (clouds) to Y=2 (road) based on scroll
- RoadScene with wet road ground plane, road markings, basic greenery, landscape backdrop
- MonsoonWorld orchestrator rendering all scenes
- Data constants: 9 projects, 4 timeline entries, 1 publication

**Assets needed for this phase (placed in `public/textures/`):**
- `boat.png` — small wooden rowboat illustration (transparent background)
- `girl-walk-right.png` — girl walking right, profile view
- `girl-bend-down.png` — girl bending to pick something up
- `girl-holding-boat.png` — girl holding boat, front-45°
- `girl-smile-camera.png` — girl facing camera, smiling, holding boat
- `girl-running-away.png` — girl running away, back view, carrying boat
- `signboard.png` — weathered wooden signboard with 3 directional signs (OR build in 3D — see below)

If the image assets are not available yet, use colored rectangle placeholders (yellow for girl, brown for boat, brown for signboard) and note them for replacement.

**What to build in this phase:**

### 1. Boat on the road

**In `RoadScene.tsx` or a new `GirlSequence.tsx`:**

Add a boat beside the road. If `boat.png` exists, use it as a texture on a plane:
```typescript
const boatTexture = useTexture('/textures/boat.png');
```
If not, use a brown rectangle placeholder.

Position: `[4, 0.3, -8]` (right side of road, slightly above ground, partway down the road). Slightly rotated to look tilted/casual. Only visible when scroll is past 0.45.

### 2. Girl character animation

**Create `app/scenes/GirlSequence.tsx`:**

The girl is a sprite that changes between 5 poses based on scroll position. Each pose is a textured plane.

Load all 5 textures (or placeholders):
```typescript
const walkTex = useTexture('/textures/girl-walk-right.png');
const bendTex = useTexture('/textures/girl-bend-down.png');
const holdTex = useTexture('/textures/girl-holding-boat.png');
const smileTex = useTexture('/textures/girl-smile-camera.png');
const runTex = useTexture('/textures/girl-running-away.png');
```

The girl is a single `<mesh>` with `<planeGeometry args={[2, 2.5]} />` and a material whose `map` (texture) changes based on scroll phase.

**Scroll-driven animation sequence:**

Use `useScroll()` and `useFrame()`:

| Scroll range | Phase | Girl position | Girl texture | Boat |
|---|---|---|---|---|
| `range(0.45, 0.04)` = 0→1 | Walk in | X: 12→5 (enters from right) | `walkTex` | Stays at [4, 0.3, -8] |
| `range(0.49, 0.03)` = 0→1 | Bend down | X: 4, slight Y dip | `bendTex` | Stays |
| `range(0.52, 0.03)` = 0→1 | Pick up boat | Standing at boat pos | `holdTex` | Boat disappears (or moves to girl) |
| `range(0.55, 0.03)` = 0→1 | Face camera | Same position | `smileTex` | Hidden (girl has it) |
| `range(0.58, 0.08)` = 0→1 | Run away | X stays, Z: -8→-50, scale shrinks 1→0.1 | `runTex` | Hidden |

For each range, use `THREE.MathUtils.damp()` to smoothly interpolate position, scale, and opacity.

When girl's scale reaches < 0.15, set her `visible = false`.

The texture swap should happen at the transition points between ranges. Use conditionals:
```typescript
const walkP = data.range(0.45, 0.04);
const bendP = data.range(0.49, 0.03);
// etc.
if (walkP > 0 && walkP < 1) currentTexture = walkTex;
else if (bendP > 0 && bendP < 1) currentTexture = bendTex;
// etc.
```

Make sure the plane has `<meshBasicMaterial map={currentTexture} transparent side={THREE.DoubleSide} />`.

### 3. Signboard

**Create `app/scenes/SignboardScene.tsx`:**

Build the signboard using 3D geometry (more interactive than a flat image):

```
<group position={[0, 1.5, -15]} visible={signboardVisible}>
  {/* Wooden post */}
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[0.15, 3, 0.15]} />
    <meshStandardMaterial color="#8B7355" roughness={0.8} />
  </mesh>

  {/* Sign 1: Work & Education — points right */}
  <mesh position={[0.8, 1.2, 0]} onClick={() => setActiveRoad('work')}>
    <boxGeometry args={[2.5, 0.5, 0.05]} />
    <meshStandardMaterial color="#6B4226" roughness={0.9} />
  </mesh>
  <Text position={[0.8, 1.2, 0.03]} fontSize={0.18} color="white" font="/Cormorant_Garamond/static/CormorantGaramond-SemiBold.ttf">
    WORK & EDUCATION →
  </Text>

  {/* Sign 2: Projects — points left */}
  <mesh position={[-0.6, 0.5, 0]} onClick={() => setActiveRoad('projects')}>
    <boxGeometry args={[2, 0.5, 0.05]} />
    <meshStandardMaterial color="#6B4226" roughness={0.9} />
  </mesh>
  <Text position={[-0.6, 0.5, 0.03]} fontSize={0.18} color="white" font="...">
    ← PROJECTS
  </Text>

  {/* Sign 3: Publications — points right */}
  <mesh position={[0.7, -0.2, 0]} onClick={() => setActiveRoad('publications')}>
    <boxGeometry args={[2.2, 0.5, 0.05]} />
    <meshStandardMaterial color="#6B4226" roughness={0.9} />
  </mesh>
  <Text position={[0.7, -0.2, 0.03]} fontSize={0.18} color="white" font="...">
    PUBLICATIONS →
  </Text>
</group>
```

**Signboard visibility:** Show only after girl runs away. Use scroll: visible when `data.range(0.65, 0.05) > 0`.

**Hover interactions:**
- `onPointerOver`: change `document.body.style.cursor = 'pointer'`, GSAP animate the sign's rotation slightly (tilt 3-5 degrees around Z)
- `onPointerOut`: reset cursor and rotation

**Click handler:** Call `useAppStore.getState().setActiveRoad('projects')` (or 'work' / 'publications').

### 4. Update MonsoonWorld for road navigation

**Update `app/scenes/MonsoonWorld.tsx`:**

```typescript
const activeRoad = useAppStore((s) => s.activeRoad);

if (activeRoad === 'main') {
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

// Placeholder for other roads (built in Phase 4 & 5)
return null;
```

**Important:** When `activeRoad` is not 'main', the ScrollControls in CanvasWrapper still exists but the main scenes are hidden. In Phase 4, we'll handle this by conditionally rendering different content.

### 5. Back button (HTML overlay)

**Create `app/components/BackButton.tsx`:**

An HTML overlay button (not 3D). Fixed position top-left. Only visible when `activeRoad !== 'main'`. On click, calls `setActiveRoad('main')`. Styled as a semi-transparent white circle with a left arrow. Use Framer Motion for fade in/out.

Add this to `CanvasWrapper.tsx` outside the Canvas element.

### Deliverable
The full main scroll story works: clouds → Namaste → descent → road → girl picks up boat and runs away → signboard appears with 3 clickable destinations. Clicking a sign changes `activeRoad` state (destinations built in next phases).

---

## PHASE 4 — Projects Road

### Cursor Prompt

---

This is Phase 4 of 7 for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (Phase 1-3):**
- Everything from prior phases: clouds, rain, scroll camera, road, girl animation, signboard
- Zustand store with `activeRoad` state (`'main' | 'projects' | 'work' | 'publications'`)
- Clicking "PROJECTS" on signboard sets `activeRoad = 'projects'`
- Data: 9 projects in `app/constants/projects.ts` with id, title, date, description, tech, github, live
- BackButton component that resets to 'main'

**What to build in this phase:**

### 1. Update CanvasWrapper for road modes

The CanvasWrapper currently has one `<ScrollControls pages={5}>` for the main scroll. When user clicks a destination, we need a different scroll context for the road.

**Approach:** Conditionally render different ScrollControls based on activeRoad:

```typescript
const activeRoad = useAppStore((s) => s.activeRoad);

// Inside Canvas:
{activeRoad === 'main' ? (
  <ScrollControls pages={5} damping={0.3}>
    <MonsoonWorld />
  </ScrollControls>
) : (
  <ScrollControls pages={4} damping={0.3} key={activeRoad}>
    <RoadRenderer road={activeRoad} />
  </ScrollControls>
)}
```

The `key={activeRoad}` forces ScrollControls to remount (reset scroll position) when switching roads.

Create `RoadRenderer.tsx` that picks the right road scene based on the prop.

### 2. Build ProjectsRoad

**Create `app/scenes/ProjectsRoad.tsx`:**

A rainy road stretching forward (along -Z axis) with 9 project milestones.

- **Camera:** Create a road-specific camera component that moves the camera forward along Z based on scroll. `useScroll()` maps offset 0→1 to camera Z from 0 to -70 (9 milestones * ~8 units apart).
- **Rain:** Reuse `<RainSystem />`.
- **Fog:** `<fog attach="fog" args={['#B4C7D9', 5, 40]} />`
- **Ground:** Same road plane as main scene but longer.
- **Ambient light:** `<ambientLight intensity={0.6} />`

**Project milestones:** Import `PROJECTS` from constants. Map each project to a milestone group placed along the road:

```typescript
PROJECTS.map((project, i) => (
  <group key={project.id} position={[i % 2 === 0 ? -3 : 3, 1, -i * 8]}>
    {/* Milestone marker */}
    <mesh>
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshStandardMaterial color="#8B7355" roughness={0.8} />
    </mesh>
    <Text position={[0, 0.3, 0.06]} fontSize={0.15} color="white" maxWidth={1.3} textAlign="center" font="...">
      {project.title}
    </Text>
    <Text position={[0, -0.3, 0.06]} fontSize={0.1} color="#D4D8DC" font="...">
      {project.date}
    </Text>
  </group>
))
```

Milestones alternate left and right sides of the road.

**Click to open info panel:** Each milestone mesh has `onClick={() => setActiveProject(project)}`. This sets local React state that triggers an HTML overlay panel.

### 3. Build ProjectPanel

**Create `app/components/ProjectPanel.tsx`:**

An HTML overlay (not 3D) that appears when a project milestone is clicked.

- **Position:** Fixed, centered on screen
- **Background:** Semi-transparent dark overlay + parchment-colored card
- **Content:**
  - Project title (large, Cormorant Garamond semibold)
  - Date
  - Description paragraph
  - Tech stack as small rounded pills/tags
  - GitHub button (links to `project.github`, opens in new tab)
  - Live Demo button (only shown if `project.live` is not null)
- **Close:** Click outside card or X button
- **Animation:** Framer Motion `AnimatePresence` with fade + scale entrance

Style the card to feel like weathered paper:
- Background: warm cream `#F5E6D3`
- Border: `1px solid rgba(139, 115, 85, 0.3)`
- Border-radius: 4px
- Box-shadow: soft warm shadow
- Subtle noise/texture via CSS (optional)

### Deliverable
Clicking "PROJECTS" on the signboard transitions to a rainy road with 9 project milestones. Scrolling moves the camera along the road. Clicking a milestone opens an info panel with full project details and working links. Back button returns to signboard.

---

## PHASE 5 — Work/Education + Publications Roads

### Cursor Prompt

---

This is Phase 5 of 7 for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (Phase 1-4):**
- Full main scroll experience (clouds, rain, girl, signboard)
- Projects road with 9 milestones and info panels
- CanvasWrapper conditionally renders different ScrollControls per road
- RoadRenderer component that picks the right road scene
- Data: 4 timeline entries in `constants/work.ts`, 1 publication in `constants/publications.ts`

**What to build:**

### 1. Work & Education Road

**Create `app/scenes/WorkRoad.tsx`:**

Similar road setup as ProjectsRoad (own camera, rain, ground, fog) but with a butterfly-driven timeline reveal.

**Butterfly:**
- A `<mesh>` with `<planeGeometry args={[0.5, 0.4]} />` textured with butterfly image (or a colored placeholder: lavender-blue `#9B8EC4`)
- Positioned in front of the camera, flying along the road
- Movement driven by scroll:
  - Z position follows scroll (moves forward along road)
  - X position oscillates with a sine wave: `Math.sin(scrollOffset * 12) * 3`
  - Y position oscillates gently: `2 + Math.sin(scrollOffset * 8) * 0.5`
- Wing animation: alternate between slight scale.x = 1 and scale.x = 0.6 using a time-based sine wave in useFrame

**Timeline items:** Import `TIMELINE` from constants. 4 entries.

Each timeline item is a group positioned along the road at Z = -i * 15.

**Reveal mechanic:** Each item starts with `visible={false}` and `opacity={0}`. When the butterfly's Z position passes the item's Z position, the item fades in. Use `useFrame` to check: if butterfly Z < item Z, trigger the reveal.

Reveal animation: GSAP `gsap.to(itemRef.current, { opacity: 1, y: 0, duration: 0.8 })` (items start 1 unit above and drop down).

Each timeline item is a `<group>` containing:
- A background plane (warm cream color `#F5E6D3`)
- `<Text>` for title, subtitle, date, detail
- A small colored indicator: green for education, blue for work

### 2. Publications Road

**Create `app/scenes/PublicationsRoad.tsx`:**

Shorter road (`ScrollControls pages={2}` in CanvasWrapper's conditional rendering).

Same setup as ProjectsRoad but with only 1 milestone for SPARTA.

On click, show `PublicationPanel.tsx` (similar to ProjectPanel but with publication-specific fields):
- Full title
- Authors
- Venue + year + location
- Highlight: "99.15% detection rate" in accent color
- DOI link button (opens in new tab)

### 3. Update RoadRenderer

Update the RoadRenderer component to pass the correct road:
- `'projects'` → `<ProjectsRoad />`
- `'work'` → `<WorkRoad />`
- `'publications'` → `<PublicationsRoad />`

Also update ScrollControls pages count: 4 for projects, 3 for work, 2 for publications.

### Deliverable
All three destination roads work end-to-end. Work road has a butterfly flying forward, revealing 4 timeline items. Publications road has 1 SPARTA milestone with full details. Back navigation works from all roads.

---

## PHASE 6 — Sound + Loading + UI

### Cursor Prompt

---

This is Phase 6 of 7 for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (Phase 1-5):**
- Complete portfolio experience: clouds, rain, girl, signboard, 3 destination roads all working
- Zustand store with `soundEnabled` boolean and `toggleSound()` method

**What to build:**

### 1. Sound system

Download and place 2 sound files in `public/sounds/`:
- `rain-loop.mp3` — gentle monsoon rain, 30-60 second seamless loop
- `thunder.mp3` — distant rolling thunder, 5-10 seconds

If sound files aren't available yet, create the sound system architecture anyway so sounds can be dropped in later.

**Create a `SoundManager` component** (mounted in CanvasWrapper, outside Canvas):

```typescript
import { Howl } from 'howler';

// Rain: continuous loop, low volume
const rain = new Howl({ src: ['/sounds/rain-loop.mp3'], loop: true, volume: 0.25 });

// Thunder: random interval
const thunder = new Howl({ src: ['/sounds/thunder.mp3'], volume: 0.15 });
```

- When `soundEnabled` becomes true (from store), play rain loop
- When false, fade out and stop
- Thunder: when sound enabled, set random interval (30-60 seconds) to play thunder once
- Respect browser autoplay: wrap play() in try/catch, only play after user interaction

### 2. Sound toggle

**Create `app/components/SoundToggle.tsx`:**
- Fixed position bottom-left, z-index above canvas
- Small circular button with speaker icon (SVG inline)
- On click: call `toggleSound()` from store
- Muted state: speaker with line through it, lower opacity
- Framer Motion for gentle scale animation on click
- Style: semi-transparent white/grey, subtle border, blends with monsoon world

### 3. Loading screen

**Create `app/components/LoadingScreen.tsx`:**
- Uses Drei's `useProgress()` to track asset loading
- Shows over the canvas as an HTML overlay
- Content: "The monsoon is arriving..." text in Cormorant Garamond
- Below text: subtle horizontal line that fills based on `progress` (0-100)
- Background: `#B4C7D9` (matches canvas background for seamless transition)
- When `progress === 100`: GSAP fades the overlay out over 1.5 seconds, revealing the canvas behind

Mount this in CanvasWrapper, outside the Canvas.

### 4. Custom cursor

**Create `app/components/CustomCursor.tsx`:**
- Only on desktop (check `window.matchMedia('(pointer: fine)')`)
- Set `document.body.style.cursor = 'none'` on mount
- Track mouse position via `mousemove` event
- Render a small dot (6px white circle) and an outer ring (28px circle, 1px white border)
- Both follow mouse with slight lag (ring lags more than dot — use requestAnimationFrame with lerp)
- When hovering interactive elements (data attribute `data-interactive` or over canvas pointer events), the ring scales up to 40px
- Semi-transparent, mix-blend-mode: difference (so it's visible on any background)

### 5. Season toggle

**Create `app/components/SeasonToggle.tsx`:**
- Fixed position top-right
- Shows current season: rain cloud SVG icon + "Monsoon" text
- Below it: sun SVG icon + "Summer" text, but greyed out with `opacity: 0.3` and `pointer-events: none`
- Tooltip on hover over Summer: "Coming Soon"
- When Summer is built later, this toggle will call `store.setSeason('summer')` and the MonsoonWorld will be swapped for SummerWorld
- Styled minimally: small, semi-transparent, doesn't compete with the world

### 6. SEO metadata

Update `app/layout.tsx` with complete metadata:
```typescript
export const metadata: Metadata = {
  title: 'Diksha Damahe — Portfolio',
  description: 'AI/ML engineer and full-stack developer. Explore my work through an interactive Indian monsoon world.',
  keywords: 'Diksha Damahe, AI, Machine Learning, Full Stack Developer, Portfolio, VIT Bhopal',
  authors: [{ name: 'Diksha Damahe' }],
  openGraph: {
    title: 'Diksha Damahe — Portfolio',
    description: 'An interactive monsoon world portfolio.',
    type: 'website',
  },
};
```

### Deliverable
The site has ambient rain/thunder audio with a toggle, a "The monsoon is arriving..." loading screen, a custom cursor on desktop, a season toggle (Summer greyed out), and proper SEO meta tags.

---

## PHASE 7 — Polish + Performance + Mobile

### Cursor Prompt

---

This is Phase 7 of 7 (final phase) for an immersive Indian monsoon portfolio website at `d:\Projects\Resume\Diksha\portfolio\`.

**What already exists (Phase 1-6):**
- Complete portfolio: clouds, rain, girl sequence, signboard, 3 destination roads, sound, loading screen, cursor, toggles, SEO
- All functional, needs visual polish and optimization

**What to build:**

### 1. Environmental details

Add these sparingly along the ProjectsRoad (and optionally the main road scene):

- **Puddles:** 3-4 semi-transparent blue-grey planes (`opacity={0.3}, color="#A3C1D4"`) placed on the ground between milestones. Slightly above ground plane (Y=0.01). Random oval shapes via `<circleGeometry args={[1, 32]} />`

- **Lotus flowers:** 1-2 lotus illustrations (if `lotus.png` exists) or small pink/green colored planes placed on puddle surfaces

- **Frog:** 1 small green mesh/plane near a puddle. Optional: subtle `useFrame` idle animation (slight Y bob every few seconds using sine wave)

- **Corn cart:** 1 illustration or brown/yellow colored group of boxes placed beside the road between milestone 4 and 5. Not detailed — just a suggestion of a roadside presence.

- **Electric poles:** 2-3 thin tall boxes (`args={[0.1, 8, 0.1]}, color="#5A4A3A"`) placed along the road edges at intervals. Optional thin line (Drei `<Line>`) between them for wires.

### 2. Replace placeholder assets

If AI-generated textures are available in `public/textures/`:
- Replace Drei procedural clouds with textured planes using cloud PNGs
- Replace colored rectangle girl/boat/signboard with illustrated textures
- Replace milestone markers with illustrated texture

If textures aren't ready yet, skip this — the procedural/colored version still looks good.

### 3. Performance optimization

- Add `<AdaptiveDpr pixelated />` inside Canvas (from Drei)
- Add `<Preload all />` if not already present
- Wrap static scene components in `React.memo()`
- In RainSystem: detect mobile and reduce COUNT from 1500 to 600
- In CloudScene: detect mobile and reduce cloud count
- Lazy import road scenes: `const ProjectsRoad = lazy(() => import('./scenes/ProjectsRoad'))`

### 4. Mobile adaptation

Detect mobile:
```typescript
const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
```

Apply mobile adjustments:
- **Rain:** 600 particles instead of 1500
- **Clouds:** 4 clouds instead of 8+
- **ScrollCamera:** disable mouse parallax on mobile
- **CustomCursor:** don't render on mobile
- **ProjectPanel / PublicationPanel:** full-width on mobile (`w-full` instead of centered card)
- **SignboardScene:** larger sign click targets on mobile
- **ScrollControls:** increase damping on mobile for smoother touch scrolling

### 5. Responsive CSS

In `globals.css`, add mobile-specific styles if needed. The Canvas is full viewport so it naturally works on all sizes. The HTML overlays (panels, toggles, loading) need responsive styling.

### 6. Final QA checklist (test manually)

- [ ] Loading screen appears, then fades to clouds
- [ ] Scrolling: clouds → Namaste → descent → road → girl → signboard
- [ ] Girl animation plays smoothly through scroll
- [ ] Signboard signs are clickable, change cursor on hover
- [ ] Each road loads correctly with correct milestones/content
- [ ] Project panel shows correct data with working GitHub/Live links
- [ ] Work road butterfly reveals timeline items
- [ ] Publications road shows SPARTA with DOI link
- [ ] Back button returns to signboard from each road
- [ ] Sound toggle works (rain plays/stops)
- [ ] Season toggle shows Monsoon active, Summer greyed
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] No console errors
- [ ] Reasonable performance (check with React DevTools profiler)

### Deliverable
A polished, performant monsoon portfolio world. All environmental details added, performance optimized, mobile-friendly. Ready for Vercel deployment with `npm run build`.

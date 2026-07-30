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

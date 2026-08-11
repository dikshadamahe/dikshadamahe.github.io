'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@stores';

export default function BackButton() {
  const activeRoad = useAppStore((s) => s.activeRoad);
  const setActiveRoad = useAppStore((s) => s.setActiveRoad);

  return (
    <AnimatePresence>
      {activeRoad !== 'main' && (
        <motion.button
          type="button"
          aria-label="Back to main road"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          onClick={() => setActiveRoad('main')}
          className="fixed top-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-[#243B53] shadow-sm backdrop-blur-sm transition hover:bg-white/90"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

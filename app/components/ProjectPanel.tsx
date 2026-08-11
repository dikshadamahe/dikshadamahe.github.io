'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@app-types';

type ProjectPanelProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const handleClose = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded border border-[rgba(139,115,85,0.3)] bg-[#F5E6D3] p-6 shadow-[0_12px_40px_rgba(90,60,30,0.25)]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
            }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center text-[#5C4A3A] hover:text-[#2C2118]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <p className="mb-1 text-sm tracking-wide text-[#8B7355]">{project.date}</p>
            <h2
              id="project-panel-title"
              className="pr-8 text-2xl font-semibold leading-tight text-[#2C2118]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {project.title}
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-[#4A3B2F]">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-[rgba(139,115,85,0.15)] px-2.5 py-1 text-xs tracking-wide text-[#5C4A3A]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[#8B7355]/40 bg-[#8B7355] px-4 py-2 text-sm text-[#F5E6D3] transition hover:bg-[#7A6448]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#8B7355]/50 bg-transparent px-4 py-2 text-sm text-[#5C4A3A] transition hover:bg-[rgba(139,115,85,0.12)]"
                >
                  Live Demo
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

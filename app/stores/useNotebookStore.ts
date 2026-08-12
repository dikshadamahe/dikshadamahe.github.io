import { create } from 'zustand';
import { View } from '@app-types';

/** How deep a view sits in the notebook, which decides the turn direction. */
function depth(view: View): number {
  if (view.kind === 'home') return 0;
  if (view.kind === 'project') return 2;
  return 1;
}

export function sameView(a: View, b: View): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'grid' && b.kind === 'grid') return a.filter === b.filter;
  if (a.kind === 'project' && b.kind === 'project') return a.id === b.id;
  if (a.kind === 'page' && b.kind === 'page') return a.page === b.page;
  return true;
}

interface NotebookState {
  isOpen: boolean;
  /** The spread currently settled on the base pages. */
  view: View;
  /** Set while a sheet is mid-turn; becomes `view` when the turn lands. */
  pending: View | null;
  direction: 1 | -1;
  search: string;
  openBook: () => void;
  navigate: (next: View) => void;
  setSearch: (value: string) => void;
  clearSearch: () => void;
  commit: () => void;
}

const HOME: View = { kind: 'home' };

export const useNotebookStore = create<NotebookState>((set, get) => ({
  isOpen: false,
  view: HOME,
  pending: null,
  direction: 1,
  search: '',

  openBook: () => set({ isOpen: true }),

  // Any deliberate navigation abandons the search, so a stray query can never
  // strand the reader on a filtered spread.
  navigate: (next) => {
    const { view, pending } = get();
    if (pending || (sameView(view, next) && !get().search)) return;
    set({
      search: '',
      pending: next,
      direction: depth(next) >= depth(view) ? 1 : -1,
    });
  },

  // Typing only swaps the facing page, so the input never unmounts mid-word
  // and no sheet turns on every keystroke.
  setSearch: (value) => set({ search: value }),

  clearSearch: () => set({ search: '' }),

  commit: () => {
    const { pending } = get();
    if (!pending) return;
    set({ view: pending, pending: null });
  },
}));

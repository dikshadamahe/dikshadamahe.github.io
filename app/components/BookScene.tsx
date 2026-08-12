'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNotebookStore } from '@stores';
import { resolveSpread } from '@components/views';
import Cover from '@components/Cover';
import Bookmarks from '@components/Bookmarks';
import StickyNotes from '@components/StickyNotes';

const MOBILE_QUERY = '(max-width: 900px)';
const DURATION = 1.5;
const EASE = 'power3.inOut';

const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;
const isReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BookScene() {
  const isOpen = useNotebookStore((state) => state.isOpen);
  const openBook = useNotebookStore((state) => state.openBook);
  const view = useNotebookStore((state) => state.view);
  const pending = useNotebookStore((state) => state.pending);
  const direction = useNotebookStore((state) => state.direction);
  const search = useNotebookStore((state) => state.search);
  const commit = useNotebookStore((state) => state.commit);

  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const openTweenRef = useRef<gsap.core.Timeline | null>(null);

  const current = resolveSpread(view, search);
  const next = pending ? resolveSpread(pending, search) : null;
  const forward = direction === 1;

  // Mid-turn, the destination is already painted on whichever base page the
  // travelling sheet is about to uncover.
  const base = next
    ? forward
      ? { left: current.left, leftIsCover: current.isLeftCover, right: next.right }
      : { left: next.left, leftIsCover: next.isLeftCover, right: current.right }
    : { left: current.left, leftIsCover: current.isLeftCover, right: current.right };

  const sheet = next
    ? forward
      ? { front: current.right, back: next.left, backIsCover: next.isLeftCover }
      : { front: next.right, back: current.left, backIsCover: current.isLeftCover }
    : null;

  /* --- Static states ----------------------------------------------------- */

  const snapTo = useCallback((open: boolean) => {
    const book = bookRef.current;
    if (!book) return;

    const bookmarks = book.querySelectorAll('.bookmark');
    const noteTabs = book.querySelectorAll('.sticky-note-tab');

    // `x` has to be pinned alongside `xPercent`, otherwise GSAP keeps the
    // pixel offset it read from the stylesheet's translateX(-25%) and the two
    // shifts stack.
    if (open) {
      gsap.set(book, { x: 0, xPercent: 0 });
      gsap.set(coverRef.current, { rotateY: -180, pointerEvents: 'none' });
      gsap.set(leftPageRef.current, { rotateY: 0 });
      gsap.set(bookmarks, { y: '0rem', opacity: 1, clearProps: 'transform' });
      gsap.set(notesRef.current, { opacity: 1, pointerEvents: 'auto' });
      gsap.set(noteTabs, { x: '0rem', opacity: 1, clearProps: 'transform' });
      return;
    }

    gsap.set(book, { x: 0, xPercent: -25 });
    gsap.set(coverRef.current, { rotateY: 0, pointerEvents: 'auto' });
    gsap.set(leftPageRef.current, { rotateY: 180 });
    gsap.set(bookmarks, { y: '1.25rem', opacity: 0 });
    gsap.set(notesRef.current, { opacity: 0, pointerEvents: 'none' });
  }, []);

  useLayoutEffect(() => {
    // The cover is hidden below 900px, so the notebook has to start open there.
    if (isMobile()) {
      openBook();
      return;
    }
    if (!useNotebookStore.getState().isOpen) snapTo(false);
  }, [openBook, snapTo]);

  // A viewport change must never strand the book in a half-turned transform.
  useEffect(() => {
    const onResize = () => {
      if (openTweenRef.current?.isActive()) return;
      snapTo(useNotebookStore.getState().isOpen);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [snapTo]);

  /* --- Opening the cover ------------------------------------------------- */

  const handleOpen = useCallback(() => {
    if (useNotebookStore.getState().isOpen) return;
    openBook();

    const book = bookRef.current;
    if (!book) return;

    if (isMobile() || isReduced()) {
      snapTo(true);
      return;
    }

    const bookmarks = book.querySelectorAll('.bookmark');
    const noteTabs = book.querySelectorAll('.sticky-note-tab');

    openTweenRef.current = gsap
      .timeline()
      .to(coverRef.current, { rotateY: -180, duration: DURATION, ease: EASE }, 0)
      .to(leftPageRef.current, { rotateY: 0, duration: DURATION, ease: EASE }, 0)
      .to(book, { x: 0, xPercent: 0, duration: DURATION, ease: EASE }, 0)
      .to(
        bookmarks,
        {
          y: '0rem',
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          clearProps: 'transform',
        },
        1.0,
      )
      .set(notesRef.current, { opacity: 1, pointerEvents: 'auto' }, 1.0)
      .fromTo(
        noteTabs,
        { x: '-1.25rem', opacity: 0 },
        {
          x: '0rem',
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          clearProps: 'transform',
        },
        1.1,
      )
      .set(coverRef.current, { pointerEvents: 'none' });
  }, [openBook, snapTo]);

  /* --- Page turns -------------------------------------------------------- */

  useEffect(() => {
    if (!pending) return;

    if (isMobile() || isReduced()) {
      commit();
      return;
    }

    const tween = gsap.fromTo(
      flipRef.current,
      { rotateY: forward ? 0 : -180 },
      {
        rotateY: forward ? -180 : 0,
        duration: DURATION,
        ease: EASE,
        onComplete: commit,
      },
    );

    return () => {
      // Land the sheet rather than abandoning it part-way through the arc.
      tween.progress(1).kill();
    };
  }, [pending, forward, commit]);

  return (
    <div className="book-scene">
      <div className="book" ref={bookRef}>
        <Cover ref={coverRef} onOpen={handleOpen} />

        <Bookmarks />
        <StickyNotes ref={notesRef} />

        <div
          ref={leftPageRef}
          className={`page base-left-page${base.leftIsCover ? ' is-cover-back' : ''}`}
        >
          <div className="notebook-margin-line" />
          <div className="page-content">{base.left}</div>
        </div>

        <div className="page base-right-page">
          <div className="notebook-margin-line" />
          <div className="page-content">{base.right}</div>
        </div>

        {sheet && (
          <div className="page flip-page" ref={flipRef} aria-hidden="true">
            <div className="page-face front">
              <div className="notebook-margin-line" />
              <div className="page-content">{sheet.front}</div>
            </div>
            <div className={`page-face back${sheet.backIsCover ? ' is-cover-back' : ''}`}>
              <div className="notebook-margin-line" />
              <div className="page-content">{sheet.back}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

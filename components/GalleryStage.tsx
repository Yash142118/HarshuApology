"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PhotoGallery } from "./PhotoGallery";

type GalleryStageProps = {
  onContinue: () => void;
};

/**
 * The gallery can run taller than one screen, so it needs its own
 * scroll — but toggling document.body's overflow on some devices
 * (notably a few iOS Safari versions, combined with
 * overscroll-behavior: none) can end up blocking scroll entirely.
 * Giving this stage its own fixed-height, internally-scrolling
 * container sidesteps that regardless of what the body is doing.
 *
 * On top of that: a fixed "Continue →" button that's reachable with
 * zero scrolling, as a guaranteed fallback, plus a scroll hint that
 * fades once she's scrolled a little.
 */
export function GalleryStage({ onContinue }: GalleryStageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      setShowHint(el.scrollTop < 40);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className="pretty-scroll relative h-[100dvh] w-full overflow-y-auto">
      <button
        type="button"
        onClick={onContinue}
        className="glass fixed right-5 top-5 z-50 rounded-full border-white/15 px-5 py-2 font-body text-xs tracking-wide text-white shadow-glow"
      >
        Continue →
      </button>

      <PhotoGallery />

      <div className="flex justify-center pb-20">
        <button
          type="button"
          onClick={onContinue}
          className="glass rounded-full border-white/15 px-8 py-3 font-body text-sm tracking-wide text-white"
        >
          Continue
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-1 text-white/50"
          >
            <span className="font-body text-[10px] tracking-[0.25em]">
              SCROLL FOR MORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ImageOff, Heart } from "lucide-react";
import { closingPhotos } from "@/data/closingPhotos";
import { SlideshowTrackPlayer } from "./SlideshowTrackPlayer";

const INTERVAL_MS = 4000;

export function ClosingSlideshow() {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % closingPhotos.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      setAtTop(el.scrollTop < 40);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const photo = closingPhotos[index];

  return (
    <div
      ref={scrollRef}
      className="pretty-scroll relative h-[100dvh] w-full overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-full w-full flex-col items-center justify-center gap-8 px-6 py-16 text-center"
      >
        <div className="flex items-center gap-2 text-white/40">
          <Heart size={14} className="fill-rose text-rose" />
          <span className="font-body text-xs tracking-[0.25em]">
            A FEW LAST LOOKS
          </span>
        </div>

        <div className="glass relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border-white/10 shadow-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {!broken[index] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.src}
                  alt={photo.caption}
                  onError={() =>
                    setBroken((b) => ({ ...b, [index]: true }))
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-plumLight text-white/25">
                  <ImageOff size={28} />
                  <span className="px-6 text-center text-xs">
                    Add a photo at {photo.src}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={photo.caption}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
            className="max-w-sm font-hand text-2xl text-blush"
          >
            {photo.caption}
          </motion.p>
        </AnimatePresence>

        <div className="flex gap-2">
          {closingPhotos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-rose" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>

        <SlideshowTrackPlayer />
      </motion.div>

      <AnimatePresence mode="wait">
        {atTop ? (
          <motion.div
            key="down-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-1 text-white/50"
          >
            <span className="font-body text-[10px] tracking-[0.2em]">
              SCROLL DOWN TO CHANGE THE SONG
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="up-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 top-5 z-40 flex flex-col items-center gap-1 text-white/50"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <ChevronUp size={16} />
            </motion.div>
            <span className="font-body text-[10px] tracking-[0.2em]">
              SCROLL UP TO SEE THE PHOTOS
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
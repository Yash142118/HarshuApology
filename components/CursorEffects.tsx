"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkle } from "lucide-react";

type Sparkle = { id: number; x: number; y: number };
type FloatingHeart = { id: number; x: number; y: number };

let idCounter = 0;

export function CursorEffects() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const lastSparkleAt = useRef(0);

  useEffect(() => {
    const isDesktop =
      window.matchMedia("(hover: hover)").matches &&
      window.matchMedia("(pointer: fine)").matches;
    setEnabled(isDesktop);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      const now = performance.now();
      if (now - lastSparkleAt.current > 60) {
        lastSparkleAt.current = now;
        const id = idCounter++;
        setSparkles((prev) => [
          ...prev.slice(-14),
          { id, x: e.clientX, y: e.clientY },
        ]);
        window.setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 650);
      }
    }

    function handleClick(e: MouseEvent) {
      const id = idCounter++;
      setHearts((prev) => [
        ...prev.slice(-8),
        { id, x: e.clientX, y: e.clientY },
      ]);
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 900);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-white"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.2 }}
      />
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="absolute text-gold"
            style={{ left: s.x - 6, top: s.y - 6 }}
            initial={{ opacity: 0.9, scale: 0.4, rotate: 0 }}
            animate={{ opacity: 0, scale: 1, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkle size={12} />
          </motion.span>
        ))}
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-rose"
            style={{ left: h.x - 8, top: h.y - 8 }}
            initial={{ opacity: 1, scale: 0.3, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Heart size={16} className="fill-rose" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

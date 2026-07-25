"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { randomPetName } from "@/data/petNames";

type WordPop = { id: number; x: number; y: number; text: string };

let idCounter = 0;
const COLORS = ["text-rose", "text-roseLight", "text-gold", "text-blush"];

export function ClickWords() {
  const [pops, setPops] = useState<WordPop[]>([]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      // Don't fire while the person is interacting with the PIN field.
      if (target && target.tagName === "INPUT") return;

      const id = idCounter++;
      const text = `${randomPetName()}, sorry`;
      setPops((prev) => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY, text }]);
      window.setTimeout(() => {
        setPops((prev) => prev.filter((p) => p.id !== id));
      }, 1300);
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[75] overflow-hidden">
      <AnimatePresence>
        {pops.map((p, i) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, scale: 0.6, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -60 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-2xl ${
              COLORS[i % COLORS.length]
            }`}
            style={{ left: p.x, top: p.y }}
          >
            {p.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

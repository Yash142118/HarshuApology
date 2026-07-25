"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { range, seededRandom } from "@/lib/utils";

export function FloatingHeartsBurst({ active }: { active: boolean }) {
  const hearts = useMemo(
    () =>
      range(24).map((i) => ({
        left: seededRandom(i * 11.3 + (active ? 1 : 0)) * 100,
        size: 16 + seededRandom(i * 6.1) * 26,
        delay: seededRandom(i * 2.9) * 0.8,
        duration: 3 + seededRandom(i * 4.4) * 2.5,
      })),
    [active]
  );

  return (
    <AnimatePresence>
      {active && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          {hearts.map((h, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 text-rose"
              style={{ left: `${h.left}%` }}
              initial={{ y: "10vh", opacity: 0 }}
              animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}
            >
              <Heart size={h.size} className="fill-rose" />
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

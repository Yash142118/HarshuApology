"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { range, seededRandom } from "@/lib/utils";

/**
 * Purely decorative, fixed-position ambient layer:
 * slow aurora gradient wash + twinkling stars + drifting particles + tiny hearts.
 * Kept as one component so the rest of the app never has to think about z-index.
 */
export function AmbientBackground() {
  const stars = useMemo(
    () =>
      range(60).map((i) => ({
        left: seededRandom(i * 1.7) * 100,
        top: seededRandom(i * 3.3 + 1) * 100,
        size: 1 + seededRandom(i * 5.1) * 1.6,
        delay: seededRandom(i * 7.7) * 5,
        duration: 3 + seededRandom(i * 9.2) * 4,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      range(14).map((i) => ({
        left: seededRandom(i * 4.4 + 2) * 100,
        size: 10 + seededRandom(i * 6.6) * 14,
        delay: seededRandom(i * 8.8) * 10,
        duration: 14 + seededRandom(i * 2.2) * 10,
        opacity: 0.15 + seededRandom(i * 3.9) * 0.25,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-aurora-gradient"
    >
      {/* slow moving aurora blobs */}
      <motion.div
        className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full bg-rose/10 blur-[120px]"
        animate={{ x: [0, 60, -40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-gold/10 blur-[120px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* stars */}
      {stars.map((s, i) => (
        <motion.span
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* drifting tiny hearts */}
      {hearts.map((h, i) => (
        <motion.span
          key={`heart-${i}`}
          className="absolute bottom-0"
          style={{ left: `${h.left}%`, opacity: h.opacity }}
          initial={{ y: "10vh" }}
          animate={{ y: "-120vh", x: [0, 20, -10, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart size={h.size} className="fill-roseLight text-roseLight" />
        </motion.span>
      ))}
    </div>
  );
}

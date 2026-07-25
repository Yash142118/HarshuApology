"use client";

import { motion } from "framer-motion";

type StoryProgressProps = {
  total: number;
  current: number;
};

export function StoryProgress({ total, current }: StoryProgressProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex gap-1.5 px-4 pt-4 sm:px-8 sm:pt-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose to-gold"
            initial={{ width: "0%" }}
            animate={{ width: i < current ? "100%" : i === current ? "100%" : "0%" }}
            transition={{ duration: i === current ? 0.5 : 0.3, ease: "easeOut" }}
          />
        </div>
      ))}
    </div>
  );
}

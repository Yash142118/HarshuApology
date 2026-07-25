"use client";

import { motion } from "framer-motion";
import { timelineEntries } from "@/data/timeline";

type RelationshipTimelineProps = {
  onContinue: () => void;
};

export function RelationshipTimeline({ onContinue }: RelationshipTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pretty-scroll relative h-[100dvh] w-full overflow-y-auto"
    >
      <button
        type="button"
        onClick={onContinue}
        className="glass fixed right-5 top-5 z-50 rounded-full border-white/15 px-5 py-2 font-body text-xs tracking-wide text-white shadow-glow"
      >
        Continue →
      </button>

      <div className="flex min-h-full w-full flex-col items-center gap-12 px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-gradient-rose sm:text-4xl">
          Us, so far
        </h2>

        <div className="relative flex w-full max-w-sm flex-col gap-10">
          <div className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-rose/50 via-white/15 to-rose/50" />

          {timelineEntries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-start gap-1 pl-8 text-left"
            >
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-rose bg-void shadow-glow" />
              <span className="font-hand text-xl text-blush">{entry.date}</span>
              <span className="font-body text-sm text-white/70">
                {entry.caption}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="mt-2 rounded-full bg-gradient-to-r from-rose to-roseLight px-8 py-3 font-body text-sm tracking-wide text-white shadow-glow"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

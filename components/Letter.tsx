"use client";

import { motion } from "framer-motion";
import { letterText } from "@/data/cards";
import { BlurRevealPhoto } from "./BlurRevealPhoto";

type LetterProps = {
  onContinue: () => void;
};

export function Letter({ onContinue }: LetterProps) {
  const paragraphs = letterText.split("\n\n");

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

      <div className="flex min-h-full w-full items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
          className="glass relative w-full max-w-xl rounded-2xl border-white/10 p-8 shadow-glow sm:p-12"
        >
          <div className="absolute -top-8 right-6 sm:-top-10 sm:right-10">
            <BlurRevealPhoto src="/photos/letter.jpg" alt="letter" size="sm" rotate={6} />
          </div>

          <div className="flex flex-col gap-5 font-hand text-2xl leading-relaxed text-blush sm:text-3xl">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.35 }}
                className="whitespace-pre-line"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + paragraphs.length * 0.35 + 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            className="mt-10 rounded-full bg-gradient-to-r from-rose to-roseLight px-8 py-3 font-body text-sm tracking-wide text-white shadow-glow"
          >
            Keep going
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { GlowHeart } from "./GlowHeart";
import { BlurRevealPhoto } from "./BlurRevealPhoto";
import { useViewportSize } from "@/hooks/useViewportSize";

type FinalPageProps = {
  onContinue: () => void;
  onAnswer: (answer: "yes" | "wait") => void;
  onNeedTime: () => void;
};

export function FinalPage({ onContinue, onAnswer, onNeedTime }: FinalPageProps) {
  const [answer, setAnswer] = useState<"yes" | "wait" | null>(null);
  const { width, height } = useViewportSize();

  function choose(value: "yes" | "wait") {
    onAnswer(value);
    if (value === "wait") {
      onNeedTime();
      return;
    }
    setAnswer(value);
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 overflow-hidden px-6 text-center">
      <div className="absolute right-5 top-8 z-10 sm:right-10 sm:top-10">
        <BlurRevealPhoto src="/photos/shinchan.jpg" alt="final" size="sm" rotate={-4} />
      </div>

      {answer === "yes" && width > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={260}
          recycle={false}
          gravity={0.25}
          colors={["#FF4D6D", "#FF6B81", "#E8C468", "#FFD6E0", "#FFFFFF"]}
          className="!fixed !inset-0 z-[65]"
        />
      )}

      <GlowHeart size={110} />

      <AnimatePresence mode="wait">
        {!answer && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="font-display text-4xl text-gradient-rose sm:text-5xl">
              Will you forgive me?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => choose("yes")}
                className="rounded-full bg-gradient-to-r from-rose to-roseLight px-8 py-3 font-body text-base text-white shadow-glow"
              >
                ❤️ Yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => choose("wait")}
                className="glass rounded-full border-white/15 px-8 py-3 font-body text-base text-white"
              >
                🤍 I Need Time
              </motion.button>
            </div>
          </motion.div>
        )}

        {answer === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md font-display text-2xl leading-relaxed text-white/90 sm:text-3xl"
          >
            Thank you ❤️
            <br />
            I&apos;ll keep trying every single day to deserve your smile.
          </motion.div>
        )}

      </AnimatePresence>

      {answer === "yes" && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="glass rounded-full border-white/15 px-8 py-3 font-body text-sm tracking-wide text-white"
        >
          One more thing →
        </motion.button>
      )}
    </div>
  );
}

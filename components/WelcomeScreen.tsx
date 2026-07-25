"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BlurRevealPhoto } from "./BlurRevealPhoto";

type WelcomeScreenProps = {
  onContinue: () => void;
};

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-6 text-center"
    >
      <div className="absolute right-5 top-8 sm:right-10 sm:top-10">
        <BlurRevealPhoto src="/photos/welcome.jpg" alt="welcome" size="sm" rotate={-5} />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-display text-4xl text-gradient-rose sm:text-6xl"
      >
        Hi Harshu ❤️
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="font-display text-xl text-white/80 sm:text-2xl"
      >
        I made something just for you.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="glass shadow-glow rounded-full px-10 py-3 font-body text-base tracking-wide text-white transition-shadow hover:shadow-[0_0_50px_rgba(255,77,109,0.5)]"
      >
        Continue
      </motion.button>

      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="flex flex-col items-center gap-1 text-white/40"
      >
        <span className="font-body text-[10px] tracking-[0.25em]">
          Scroll Right left moving forward
        </span>
        {/* <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div> */}
      </motion.button>
    </motion.div>
  );
}

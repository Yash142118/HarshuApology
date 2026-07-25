"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

type WaitingScreenProps = {
  onContinue: () => void;
  onChangeMind: () => void;
};

/**
 * Shown as its own screen when she picks "I Need Time" on the final page,
 * instead of just a line of text inline. Drop a gif at
 * public/photos/waiting.gif (see public/photos/README.txt).
 */
export function WaitingScreen({ onContinue, onChangeMind }: WaitingScreenProps) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-md font-display text-2xl leading-relaxed text-white/90 sm:text-3xl"
      >
        That&apos;s okay.
        <br />
        I&apos;ll wait.
        <br />
        Because you&apos;re worth waiting for.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="glass w-full max-w-xs overflow-hidden rounded-2xl border-white/10 shadow-glow"
      >
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-plumLight">
          {!broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/photos/waiting.gif"
              alt="waiting for you"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/25">
              <ImageOff size={28} />
              <span className="px-6 text-center text-xs">
                Add a gif at /photos/waiting.gif
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="glass rounded-full border-white/15 px-8 py-3 font-body text-sm tracking-wide text-white"
      >
        Continue →
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onChangeMind}
        className="font-hand text-xl text-blush underline decoration-blush/40 underline-offset-4"
      >
        Changed your mind? Click here 🥺
      </motion.button>
    </motion.div>
  );
}

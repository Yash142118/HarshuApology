"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, MessageCircle } from "lucide-react";
import { firstChat } from "@/data/firstChat";

type WhatsAppCardProps = {
  onContinue: () => void;
};

/**
 * Shown right after the welcome screen, before the story cards.
 * Edit the image path / date / caption in data/firstChat.ts.
 */
export function WhatsAppCard({ onContinue }: WhatsAppCardProps) {
  const [broken, setBroken] = useState(false);

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

      <div className="flex min-h-full w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <div className="flex items-center gap-2 text-white/40">
          <MessageCircle size={14} className="text-rose" />
          <span className="font-body text-xs tracking-[0.25em]">
            WHERE IT STARTED
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass w-full max-w-xs overflow-hidden rounded-2xl border-white/10 p-2 shadow-glow"
        >
          <div className="relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-xl bg-plumLight">
            {!broken ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={firstChat.image}
                alt="our first chat"
                onError={() => setBroken(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-6 text-center text-white/25">
                <ImageOff size={28} />
                <span className="text-xs">
                  Add a screenshot at {firstChat.image}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-hand text-2xl text-blush"
        >
          {firstChat.date}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-xs font-display text-lg text-white/70"
        >
          {firstChat.caption}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
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

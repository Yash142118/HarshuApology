"use client";

import { motion } from "framer-motion";
import { StoryCard as StoryCardType } from "@/data/cards";
import { GlowHeart } from "./GlowHeart";
import { BlurRevealPhoto } from "./BlurRevealPhoto";
import { CardBackgroundPhoto } from "./CardBackgroundPhoto";

type StoryCardProps = {
  card: StoryCardType;
};

export function StoryCardView({ card }: StoryCardProps) {
  const isHeading = card.kind === "heading";
  const isHeart = card.kind === "heart";
  const isBackgroundPhoto = card.photoStyle === "background";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 px-6 text-center"
    >
      {isBackgroundPhoto ? (
        <CardBackgroundPhoto src={card.photo} />
      ) : (
        <div className="absolute right-5 top-20 z-[45] sm:right-10 sm:top-24">
          <BlurRevealPhoto src={card.photo} alt={card.id} size="md" rotate={5} />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8">
        {isHeart && <GlowHeart size={84} />}

        <div className="flex max-w-xl flex-col gap-4">
          {card.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.18 }}
              className={
                isHeading
                  ? "font-display text-5xl text-gradient-rose sm:text-7xl"
                  : "font-display text-2xl leading-relaxed text-white/90 sm:text-3xl"
              }
            >
              {line}
            </motion.p>
          ))}
        </div>

        {isHeading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <GlowHeart size={64} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

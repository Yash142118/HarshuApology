"use client";

import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { storyCards } from "@/data/cards";
import { StoryCardView } from "./StoryCard";
import { StoryProgress } from "./StoryProgress";

type StoryDeckProps = {
  onComplete: () => void;
};

export function StoryDeck({ onComplete }: StoryDeckProps) {
  const [index, setIndex] = useState(0);

  function goNext() {
    if (index >= storyCards.length - 1) {
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
  }

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) goNext();
    else if (info.offset.x > 60) goPrev();
  }

  return (
    <div className="relative min-h-[100dvh] w-full">
      <StoryProgress total={storyCards.length} current={index} />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        className="h-full w-full"
      >
        <AnimatePresence mode="wait">
          <StoryCardView key={storyCards[index].id} card={storyCards[index]} />
        </AnimatePresence>
      </motion.div>

      {/* invisible tap zones, left = back, right = forward */}
      <button
        aria-label="Previous"
        onClick={goPrev}
        className="absolute inset-y-0 left-0 z-40 w-1/4 outline-none"
      />
      <button
        aria-label="Next"
        onClick={goNext}
        className="absolute inset-y-0 right-0 z-40 w-1/4 outline-none"
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center gap-6 text-white/40">
        <ChevronLeft size={18} />
        <span className="font-body text-xs tracking-widest">TAP OR SWIPE</span>
        <ChevronRight size={18} />
      </div>
    </div>
  );
}

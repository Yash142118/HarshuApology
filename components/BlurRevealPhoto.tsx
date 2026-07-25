"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type BlurRevealPhotoProps = {
  src: string;
  alt: string;
  rotate?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<BlurRevealPhotoProps["size"]>, string> = {
  sm: "w-20 sm:w-24",
  md: "w-28 sm:w-36",
  lg: "w-40 sm:w-52",
};

/**
 * A small tilted polaroid. Shows the photo directly — no blur,
 * no tap interaction. Purely decorative, so it doesn't intercept
 * clicks meant for navigation underneath it.
 */
export function BlurRevealPhoto({
  src,
  alt,
  rotate = -4,
  className,
  size = "md",
}: BlurRevealPhotoProps) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "glass pointer-events-none shrink-0 rounded-sm border-white/10 bg-white/5 p-2 pb-4 shadow-xl",
        sizeClasses[size],
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-plumLight">
        {!broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setBroken(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-white/25">
            <ImageOff size={18} />
            <span className="px-2 text-center text-[10px]">Add photo at {src}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

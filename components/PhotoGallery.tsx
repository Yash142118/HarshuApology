"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

export type Photo = {
  src: string;
  caption?: string;
  rotate?: number;
};

/**
 * Drop image files into /public/photos and list them here.
 * Example: { src: "/photos/beach-day.jpg", caption: "Beach day", rotate: -4 }
 */
const photos: Photo[] = [
  { src: "/photos/welcome.jpg", caption: "One of my favorites", rotate: -5 },
  { src: "/photos/card-4.jpg", caption: "That day", rotate: 4 },
  { src: "/photos/card-7.jpg", caption: "Us", rotate: -3 },
];

function PolaroidCard({ photo }: { photo: Photo }) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate ?? 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass w-48 shrink-0 rounded-sm border-white/10 bg-white/5 p-3 pb-6 shadow-xl sm:w-56"
    >
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-plumLight">
        {!broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.src}
            alt={photo.caption ?? "A memory"}
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/30">
            <ImageOff size={28} />
            <span className="px-4 text-center text-xs">
              Add a photo at {photo.src}
            </span>
          </div>
        )}
      </div>
      {photo.caption && (
        <p className="mt-3 text-center font-hand text-lg text-blush">
          {photo.caption}
        </p>
      )}
    </motion.div>
  );
}

export function PhotoGallery() {
  return (
    <section className="relative w-full px-6 py-24 sm:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center font-display text-3xl text-gradient-rose sm:text-4xl"
      >
        A few of my favorite memories
      </motion.h2>
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-6 sm:gap-10">
        {photos.map((photo, i) => (
          <PolaroidCard key={i} photo={photo} />
        ))}
      </div>
    </section>
  );
}

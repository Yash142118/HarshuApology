"use client";

import { useState } from "react";

type CardBackgroundPhotoProps = {
  src: string;
};

/**
 * Sits behind a story card's text as a faint, centered backdrop — the
 * memory is felt rather than seen in full, and the words stay readable.
 * If the file is missing, this just renders nothing (no broken-image
 * placeholder here, since it's meant to be subtle by design).
 */
export function CardBackgroundPhoto({ src }: CardBackgroundPhotoProps) {
  const [broken, setBroken] = useState(false);

  if (broken) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onError={() => setBroken(true)}
        className="h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/50 to-void/85" />
    </div>
  );
}

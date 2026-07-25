"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { closingTracks } from "@/data/closingTracks";

export function SlideshowTrackPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current?.pause();

    const track = closingTracks[index];
    const audio = new Audio(track.src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, [index]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  function next() {
    setIndex((i) => (i + 1) % closingTracks.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + closingTracks.length) % closingTracks.length);
  }

  const track = closingTracks[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass flex flex-col items-center gap-2 rounded-2xl border-white/10 px-6 py-4 shadow-glow"
    >
      <span className="font-hand text-lg text-blush">{track.title}</span>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous song"
          className="text-white/60 transition-colors hover:text-white"
        >
          <SkipBack size={18} />
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="glass flex h-10 w-10 items-center justify-center rounded-full border-white/15 text-white"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next song"
          className="text-white/60 transition-colors hover:text-white"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <span className="font-body text-[10px] tracking-widest text-white/40">
        {index + 1} / {closingTracks.length}
      </span>
    </motion.div>
  );
}
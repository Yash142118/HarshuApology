"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

type MusicPlayerProps = {
  /** Which track to play — swapped by the parent as the stage changes. */
  trackSrc: string;
  /** While true, pauses playback (e.g. a riddle sound clip is playing).
   *  Resumes automatically once false, but only if it was actually
   *  playing before being suppressed — a manual pause stays respected. */
  suppressed?: boolean;
  /** While true, hides the floating button but keeps audio playing —
   *  used on the lock screen so she can't pause the intro song there. */
  hidden?: boolean;
};

export type MusicPlayerHandle = {
  /** Attempts playback immediately — call this synchronously from
   *  inside a real click/tap handler for the most reliable autoplay
   *  unlock on strict browsers like iOS Safari. */
  playNow: () => void;
};

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  function MusicPlayer({ trackSrc, suppressed = false, hidden = false }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const wasPlayingBeforeSuppress = useRef(false);

    useImperativeHandle(ref, () => ({
      playNow: () => {
        audioRef.current?.play().catch(() => {});
      },
    }));

    useEffect(() => {
      audioRef.current?.pause();

      const audio = new Audio(trackSrc);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;

      const handlePlay = () => setPlaying(true);
      const handlePause = () => setPlaying(false);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      function attemptPlay() {
        audio.play().catch(() => {
          // Blocked — most likely no user gesture yet. The listeners
          // below retry the moment she taps, clicks, or types anything.
        });
      }

      attemptPlay();

      function retryOnFirstInteraction() {
        attemptPlay();
        window.removeEventListener("pointerdown", retryOnFirstInteraction);
        window.removeEventListener("keydown", retryOnFirstInteraction);
      }
      window.addEventListener("pointerdown", retryOnFirstInteraction);
      window.addEventListener("keydown", retryOnFirstInteraction);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        window.removeEventListener("pointerdown", retryOnFirstInteraction);
        window.removeEventListener("keydown", retryOnFirstInteraction);
        audio.pause();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackSrc]);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (suppressed) {
        wasPlayingBeforeSuppress.current = !audio.paused;
        audio.pause();
      } else if (wasPlayingBeforeSuppress.current) {
        audio.play().catch(() => {});
      }
    }, [suppressed]);

    function toggle() {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    if (hidden) return null;

    return (
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border-white/10 px-4 py-2.5 text-sm text-white shadow-glow"
        aria-label={playing ? "Pause our song" : "Play our song"}
      >
        {playing ? <Pause size={16} className="text-rose" /> : <Music size={16} className="text-rose" />}
        <span className="hidden sm:inline">{playing ? "Playing our song" : "Play Our Song"}</span>
      </motion.button>
    );
  }
);
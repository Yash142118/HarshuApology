"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type GlowHeartProps = {
  size?: number;
  className?: string;
};

const LONG_PRESS_MS = 700;

export function GlowHeart({ size = 96, className }: GlowHeartProps) {
  const [tapCount, setTapCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  function showMessage(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2200);
  }

  function handlePointerDown() {
    longPressFired.current = false;
    pressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      showMessage("Forever.");
    }, LONG_PRESS_MS);
  }

  function handlePointerUp() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (longPressFired.current) return;

    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 10) {
      showMessage("I Love You ❤️");
      setTapCount(0);
    }
  }

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <motion.button
        type="button"
        aria-label="A little heart, tap it"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => pressTimer.current && clearTimeout(pressTimer.current)}
        whileTap={{ scale: 0.85 }}
        className="animate-pulseGlow select-none outline-none"
      >
        <Heart
          size={size}
          className="fill-rose text-rose drop-shadow-[0_0_25px_rgba(255,77,109,0.6)]"
        />
      </motion.button>

      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-4 whitespace-nowrap font-display text-xl text-gradient-rose"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

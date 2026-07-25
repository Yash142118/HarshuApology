"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CORRECT_PIN = "2830";
const INTRO_LINES = [
  "This page isn't for everyone.",
  "Some memories belong only to two people.",
  "If you aren't one of us, please close this page.",
];

/**
 * Two extra "only we'd know this" multiple-choice riddles that run after
 * the birthday PIN, before the site unlocks.
 */
type Riddle = {
  question: string;
  options: string[];
  correctAnswer: string;
  /** Optional image/gif shown above the question. */
  image?: string;
  /** Optional short audio clip that plays once this riddle appears. */
  audio?: string;
  /** Custom teasing message for a specific wrong option; otherwise a generic one is used. */
  wrongHints?: Record<string, string>;
};

const RIDDLES: Riddle[] = [
  {
    question: "Shinchan kasa dance karto?",
    options: ["Dhichik Dhichik", "Dhamal Dhamal", "Dhoom Machale", "Nacho Nacho"],
    correctAnswer: "Nacho Nacho",
    image: "/photos/shinchan-dance.gif",
    audio: "/music/shinchan-song.mp3",
  },
  {
    question: "What does Peppa Pig say?",
    options: ["Im Peppa Peg", "Im Peppa Fig", "Im Peppa Brick", "Im Peppa Pig"],
    correctAnswer: "Im Peppa Pig",
    image: "/photos/pepapig-dance.gif",
    audio: "/music/peppa-song.mp3",
    wrongHints: {
      'Im Peppa Peg': "hihihi, nice try but nooooo",
    },
  },
];

type Step = "start" | "revealing" | "intro" | "pin" | `riddle-${number}` | "unlocking";

type LockScreenProps = {
  onUnlock: () => void;
  onRiddleAudioActive?: (active: boolean) => void;
  onBegin?: () => void;
};

export function LockScreen({ onUnlock, onRiddleAudioActive, onBegin }: LockScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [step, setStep] = useState<Step>("start");
  const [digits, setDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleBegin() {
    // Call this first and synchronously — it needs to run inside the
    // actual click event, not after any state update, for strict
    // mobile browsers to treat the audio play() as user-initiated.
    onBegin?.();
    setStep("revealing");
    window.setTimeout(() => setStep("intro"), 1200);
  }

  useEffect(() => {
    if (step !== "intro") return;
    if (lineIndex >= INTRO_LINES.length) {
      const t = setTimeout(() => setStep("pin"), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 2000);
    return () => clearTimeout(t);
  }, [lineIndex, step]);

  useEffect(() => {
    if (step === "pin") inputRef.current?.focus();
  }, [step]);

  function handlePinChange(value: string) {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    setDigits(clean.split(""));
    setPinError(false);

    if (clean.length === 4) {
      if (clean === CORRECT_PIN) {
        setStep("riddle-0");
      } else {
        setPinError(true);
        window.setTimeout(() => {
          setDigits([]);
          setPinError(false);
        }, 900);
      }
    }
  }

  function handleRiddleSolved(index: number) {
    if (index + 1 < RIDDLES.length) {
      setStep(`riddle-${index + 1}`);
    } else {
      setStep("unlocking");
      window.setTimeout(onUnlock, 1400);
    }
  }

  const activeRiddleIndex =
    step.startsWith("riddle-") ? Number(step.split("-")[1]) : null;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AnimatePresence mode="wait">
        {step === "start" && (
          <motion.div
            key="start"
            className="flex max-w-xl flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 1.03 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Heart size={40} className="animate-pulseGlow fill-rose text-rose" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-display text-2xl leading-relaxed text-white/90 sm:text-3xl"
            >
              Before anything else...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="font-display text-xl leading-relaxed text-blush sm:text-2xl"
            >
              close your eyes for a second, and just feel this moment.
            </motion.p>

            <motion.button
              type="button"
              onClick={handleBegin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass shadow-glow rounded-full px-10 py-3 font-body text-base tracking-wide text-white"
            >
              Click here to begin ❤️
            </motion.button>
          </motion.div>
        )}

        {step === "revealing" && (
          <motion.div
            key="revealing"
            className="fixed inset-0 z-50 flex items-center justify-center bg-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 30, opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="h-8 w-8 rounded-full bg-rose"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 1.2] }}
              transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1] }}
              className="absolute"
            >
              <Heart size={56} className="fill-rose text-rose" />
            </motion.div>
          </motion.div>
        )}

        {step === "intro" && (
          <motion.div
            key="intro"
            className="flex max-w-xl flex-col items-center gap-8"
            exit={{ opacity: 0 }}
          >
            {INTRO_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className={cn(
                  "font-display text-2xl leading-relaxed text-white/90 sm:text-3xl",
                  i === INTRO_LINES.length - 1 && "text-blush"
                )}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}

        {step === "pin" && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="glass flex h-12 w-12 items-center justify-center rounded-full">
                <Lock size={18} className="text-blush" />
              </div>
              <p className="font-display text-xl text-white/90 sm:text-2xl">
                Enter our birthday initials.
              </p>
            </div>

            <motion.div
              animate={pinError ? { x: [0, -12, 12, -8, 8, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="flex gap-3" onClick={() => inputRef.current?.focus()}>
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "glass flex h-14 w-12 items-center justify-center rounded-xl font-display text-2xl transition-colors",
                      pinError ? "text-rose" : "",
                      digits[i] && "shadow-glow"
                    )}
                    style={{
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: pinError
                        ? "rgba(255, 77, 109, 0.8)"
                        : "rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    {digits[i] ?? ""}
                  </div>
                ))}
              </div>
              <input
                ref={inputRef}
                value={digits.join("")}
                onChange={(e) => handlePinChange(e.target.value)}
                inputMode="numeric"
                autoComplete="off"
                aria-label="Enter 4 digit PIN"
                className="absolute inset-0 h-full w-full opacity-0"
              />
            </motion.div>

            <AnimatePresence>
              {pinError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-rose"
                >
                  That&apos;s not our memory ❤️
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeRiddleIndex !== null && (
          <RiddleStep
            key={step}
            riddle={RIDDLES[activeRiddleIndex]}
            onSolved={() => handleRiddleSolved(activeRiddleIndex)}
            onAudioActive={onRiddleAudioActive}
          />
        )}

        {step === "unlocking" && (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1 }}
            >
              <Sparkles className="text-gold" size={40} />
            </motion.div>
            <p className="font-display text-2xl text-gradient-rose">
              Welcome back, us.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type RiddleStepProps = {
  riddle: Riddle;
  onSolved: () => void;
  onAudioActive?: (active: boolean) => void;
};

function RiddleStep({ riddle, onSolved, onAudioActive }: RiddleStepProps) {
  const [wrongOption, setWrongOption] = useState<string | null>(null);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const [imageBroken, setImageBroken] = useState(false);

  useEffect(() => {
    if (!riddle.audio) return;
    const clip = new Audio(riddle.audio);
    clip.volume = 0.6;
    clip.loop = true;
    onAudioActive?.(true);
    clip.play().catch(() => {
      // Autoplay can be blocked in rare cases — not critical, the
      // riddle still works fine without the clip.
    });
    return () => {
      clip.pause();
      onAudioActive?.(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riddle.audio]);

  function handleSelect(option: string) {
    if (option === riddle.correctAnswer) {
      onSolved();
      return;
    }
    setWrongOption(option);
    setShakeOption(option);
    window.setTimeout(() => setShakeOption(null), 450);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="flex w-full max-w-sm flex-col items-center gap-6"
    >
      {riddle.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.6 }}
          className="glass w-40 overflow-hidden rounded-xl border-white/10 p-2 shadow-glow"
        >
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-plumLight">
            {!imageBroken ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={riddle.image}
                alt=""
                onError={() => setImageBroken(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="px-3 text-center text-[10px] text-white/30">
                Add image at {riddle.image}
              </span>
            )}
          </div>
        </motion.div>
      )}

      <p className="font-display text-xl text-white/90 sm:text-2xl">
        {riddle.question}
      </p>

      <div className="grid w-full grid-cols-2 gap-3">
        {riddle.options.map((option) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            animate={shakeOption === option ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "glass rounded-xl border-white/10 px-3 py-3 font-body text-sm text-white/90 transition-colors",
              wrongOption === option && "border-rose/60 text-rose"
            )}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {wrongOption && (
          <motion.p
            key={wrongOption}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-hand text-xl text-blush"
          >
            {riddle.wrongHints?.[wrongOption] ?? "Not quite, try again ❤️"}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
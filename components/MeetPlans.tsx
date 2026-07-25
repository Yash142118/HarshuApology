"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Loader2 } from "lucide-react";
import { randomPetName } from "@/data/petNames";
import { sendResponse } from "@/lib/collectResponse";
import { cn } from "@/lib/utils";

type PlanItem = {
  id: string;
  label: string;
  emoji: string;
};

const ITEMS: PlanItem[] = [
  { id: "frankie", label: "Frankie", emoji: "🌯" },
  { id: "pastry", label: "Pastry", emoji: "🥐" },
  { id: "momos", label: "Momos", emoji: "🥟" },
  { id: "shawarma", label: "Shawarma", emoji: "🧆" },
  { id: "waffle", label: "Waffle", emoji: "🧇" },
];

const ALL_ID = "all";

type MeetPlansProps = {
  forgivenessAnswer: "yes" | "wait" | null;
  onContinue: () => void;
};

export function MeetPlans({ forgivenessAnswer, onContinue }: MeetPlansProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [petName] = useState(randomPetName);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const allSelected = ITEMS.every((item) => selected.has(item.id));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);

      if (id === ALL_ID) {
        if (allSelected) {
          return new Set();
        }
        return new Set(ITEMS.map((i) => i.id));
      }

      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasAnySelection = selected.size > 0;

  async function handleSend() {
    setStatus("sending");
    const foodChoices = ITEMS.filter((item) => selected.has(item.id)).map(
      (item) => item.label
    );
    await sendResponse({ forgivenessAnswer, foodChoices });
    setStatus("sent");
  }

  return (
    <div className="pretty-scroll relative h-[100dvh] w-full overflow-y-auto">
      {status === "sent" && (
        <button
          type="button"
          onClick={onContinue}
          className="glass fixed right-5 top-5 z-50 rounded-full border-white/15 px-5 py-2 font-body text-xs tracking-wide text-white shadow-glow"
        >
          Continue →
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-full w-full flex-col items-center justify-center gap-10 px-6 py-20 text-center"
      >
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-4xl text-gradient-rose sm:text-5xl">
            When we meet next...
          </h2>
        <p className="font-body text-sm tracking-wide text-white/50">
          pick everything we&apos;re not leaving without
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        {ITEMS.map((item) => {
          const active = selected.has(item.id);
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "glass flex items-center gap-4 rounded-2xl border-white/10 px-5 py-3.5 text-left transition-colors",
                active && "border-rose/60 shadow-glow"
              )}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="flex-1 font-display text-lg text-white/90">
                {item.label}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
                  active ? "border-rose bg-rose" : "border-white/25"
                )}
              >
                {active && <Check size={14} className="text-white" />}
              </span>
            </motion.button>
          );
        })}

        <motion.button
          type="button"
          onClick={() => toggle(ALL_ID)}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "glass flex items-center gap-4 rounded-2xl border-white/10 px-5 py-3.5 text-left transition-colors",
            allSelected && "border-gold/60 shadow-goldGlow"
          )}
        >
          <span className="text-2xl">✨</span>
          <span className="flex-1 font-display text-lg text-white/90">
            All of the above
          </span>
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
              allSelected ? "border-gold bg-gold" : "border-white/25"
            )}
          >
            {allSelected && <Check size={14} className="text-plum" />}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {hasAnySelection && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-sm font-hand text-2xl text-blush"
          >
            It&apos;s a date, {petName}. I&apos;m already hungry.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status !== "sent" ? (
          <motion.button
            key="send"
            type="button"
            onClick={handleSend}
            disabled={status === "sending"}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-roseLight px-8 py-3 font-body text-sm text-white shadow-glow disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Continue 💌"
            )}
          </motion.button>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
              className="glass rounded-full border-white/15 px-8 py-3 font-body text-sm tracking-wide text-white"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
}
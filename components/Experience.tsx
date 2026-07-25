"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientBackground } from "./AmbientBackground";
import { CursorEffects } from "./CursorEffects";
import { ClickWords } from "./ClickWords";
import { LockScreen } from "./LockScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import { WhatsAppCard } from "./WhatsAppCard";
import { StoryDeck } from "./StoryDeck";
import { Letter } from "./Letter";
import { RelationshipTimeline } from "./RelationshipTimeline";
import { GalleryStage } from "./GalleryStage";
import { FinalPage } from "./FinalPage";
import { WaitingScreen } from "./WaitingScreen";
import { MeetPlans } from "./MeetPlans";
import { ClosingSlideshow } from "./ClosingSlideshow";
import { MusicPlayer, MusicPlayerHandle } from "./MusicPlayer";
import { FloatingHeartsBurst } from "./FloatingHeartsBurst";
import { useTypedWord } from "@/hooks/useTypedWord";
import { notifySiteOpened } from "@/lib/collectResponse";

type Stage =
  | "lock"
  | "welcome"
  | "whatsapp"
  | "story"
  | "letter"
  | "timeline"
  | "gallery"
  | "final"
  | "waiting"
  | "plans"
  | "afterglow";

// Intro song plays from the very start (the lock/riddle screens);
// the main song takes over the moment "Hi Harshu" appears on the
// welcome screen, and stays on that for the rest of the site.
const INTRO_TRACK = "/music/intro-song.mp3";
const MAIN_TRACK = "/music/our-song.mp3";
const INTRO_STAGES: Stage[] = ["lock"];

export function Experience() {
  const [stage, setStage] = useState<Stage>("lock");
  const [heartsBurstActive, setHeartsBurstActive] = useState(false);
  const [forgivenessAnswer, setForgivenessAnswer] = useState<
    "yes" | "wait" | null
  >(null);
  const hasNotifiedOpen = useRef(false);
  const [riddleAudioActive, setRiddleAudioActive] = useState(false);
  const [hasEnteredRiddles, setHasEnteredRiddles] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  function handleBeginAudio() {
    // Called directly inside the "Click here to begin" button's own
    // click handler — the most reliable way to unlock autoplay on
    // strict browsers (notably iOS Safari), since the play() call
    // happens synchronously within her actual tap.
    musicPlayerRef.current?.playNow();
  }

  function handleRiddleAudioActive(active: boolean) {
    setRiddleAudioActive(active);
    if (active) setHasEnteredRiddles(true);
  }

  const triggerHeartsBurst = useCallback(() => {
    setHeartsBurstActive(true);
    window.setTimeout(() => setHeartsBurstActive(false), 3500);
  }, []);

  useTypedWord("HARSHU", triggerHeartsBurst);

  // Every stage is a fixed, full-screen "card" with its own centered
  // content, so the page body itself never needs to scroll. Stages that
  // can run taller than one viewport (gallery, timeline, letter,
  // afterglow, the WhatsApp card) each get their own internally-scrolling
  // container instead — more reliable across devices than toggling
  // document.body's overflow, which some mobile browsers handle oddly.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function unlock() {
    setStage("welcome");
    // Fire once, quietly, the moment she's actually in — before she's
    // answered anything. Doesn't touch or wait on her actual response.
    if (!hasNotifiedOpen.current) {
      hasNotifiedOpen.current = true;
      notifySiteOpened();
    }
  }

  return (
    <main className="relative min-h-[100dvh] w-full">
      <AmbientBackground />
      <CursorEffects />
      <ClickWords />
      <FloatingHeartsBurst active={heartsBurstActive} />
      <MusicPlayer
        ref={musicPlayerRef}
        trackSrc={INTRO_STAGES.includes(stage) ? INTRO_TRACK : MAIN_TRACK}
        suppressed={
          (stage === "lock" && (riddleAudioActive || hasEnteredRiddles)) ||
          stage === "afterglow"
        }
        hidden={stage === "lock" || stage === "afterglow"}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === "lock" && (
            <LockScreen
              key="lock"
              onUnlock={unlock}
              onRiddleAudioActive={handleRiddleAudioActive}
              onBegin={handleBeginAudio}
            />
          )}

          {stage === "welcome" && (
            <WelcomeScreen
              key="welcome"
              onContinue={() => setStage("whatsapp")}
            />
          )}

          {stage === "whatsapp" && (
            <WhatsAppCard
              key="whatsapp"
              onContinue={() => setStage("story")}
            />
          )}

          {stage === "story" && (
            <StoryDeck key="story" onComplete={() => setStage("letter")} />
          )}

          {stage === "letter" && (
            <Letter key="letter" onContinue={() => setStage("timeline")} />
          )}

          {stage === "timeline" && (
            <RelationshipTimeline
              key="timeline"
              onContinue={() => setStage("gallery")}
            />
          )}
        </AnimatePresence>

        {stage === "gallery" && (
          <GalleryStage onContinue={() => setStage("final")} />
        )}

        {stage === "final" && (
          <FinalPage
            key="final"
            onContinue={() => setStage("plans")}
            onAnswer={setForgivenessAnswer}
            onNeedTime={() => setStage("waiting")}
          />
        )}

        {stage === "waiting" && (
          <WaitingScreen
            key="waiting"
            onContinue={() => setStage("plans")}
            onChangeMind={() => setStage("final")}
          />
        )}

        {stage === "plans" && (
          <MeetPlans
            key="plans"
            forgivenessAnswer={forgivenessAnswer}
            onContinue={() => setStage("afterglow")}
          />
        )}

        {stage === "afterglow" && <ClosingSlideshow key="afterglow" />}
      </div>
    </main>
  );
}
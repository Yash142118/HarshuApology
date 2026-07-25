"use client";

import { useEffect, useRef } from "react";

/**
 * Listens to keystrokes anywhere on the page and fires a callback
 * whenever the given word has just been typed in sequence.
 */
export function useTypedWord(word: string, onMatch: () => void) {
  const bufferRef = useRef("");

  useEffect(() => {
    const target = word.toUpperCase();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toUpperCase()).slice(
        -target.length
      );
      if (bufferRef.current === target) {
        onMatch();
        bufferRef.current = "";
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [word, onMatch]);
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  triggerOnMount?: boolean;
  trigger?: unknown;
  cursorChars?: string[];
  glyphChars?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@_!∆*&%$";
const DEFAULT_CURSORS = ["█", "▓", "▒", "░"];

export function ScrambleText({
  text,
  className = "",
  duration = 750,
  delay = 0,
  triggerOnMount = true,
  trigger,
  cursorChars = DEFAULT_CURSORS,
  glyphChars = DEFAULT_GLYPHS,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    isScramblingRef.current = true;
    const startTime = performance.now();
    const len = text.length;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Number of locked-in original characters
      const settledCount = Math.floor(progress * len);

      let result = "";
      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < settledCount) {
          result += text[i];
        } else if (i === settledCount && progress < 1) {
          // Glitch cursor glyph at the leading decode edge
          const cursorIdx = Math.floor((elapsed / 60) % cursorChars.length);
          result += cursorChars[cursorIdx];
        } else {
          // Random glyph from pool
          const glyphIdx = Math.floor(Math.random() * glyphChars.length);
          result += glyphChars[glyphIdx];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, [text, duration, cursorChars, glyphChars]);

  useEffect(() => {
    if (triggerOnMount) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(scramble, delay);
      } else {
        scramble();
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scramble, triggerOnMount, delay]);

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (trigger !== undefined) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(scramble, delay);
      } else {
        scramble();
      }
    }
  }, [trigger, scramble, delay]);

  const handlePointerEnter = () => {
    scramble();
  };

  return (
    <Component
      onPointerEnter={handlePointerEnter}
      className={cn("inline-block select-none", className)}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
}

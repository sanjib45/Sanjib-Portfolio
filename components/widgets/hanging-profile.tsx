"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface HangingProfileProps {
  onOpenModal?: () => void;
}

export function HangingProfile({ onOpenModal }: HangingProfileProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const gravity = 1.2;
  const ropeLength = 175;
  const damping = 0.996;

  const dragStartRef = useRef<{ x: number; y: number; moved: boolean }>({
    x: 0,
    y: 0,
    moved: false,
  });

  const state = useRef({
    angle: 0.18,
    velocity: 0.004,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    currentLength: ropeLength,
  });

  useEffect(() => {
    let animationFrameId = 0;
    let isVisible = false;
    let idleCounter = 0;

    const updatePhysics = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      idleCounter++;

      if (!state.current.isDragging) {
        // Subtle ambient natural sway when pendulum comes to rest
        if (
          Math.abs(state.current.velocity) < 0.0003 &&
          Math.abs(state.current.angle) < 0.02
        ) {
          state.current.velocity +=
            Math.sin(idleCounter * 0.025) * 0.00018;
        }

        state.current.currentLength +=
          (ropeLength - state.current.currentLength) * 0.1;

        const acceleration =
          (-gravity / state.current.currentLength) *
          Math.sin(state.current.angle);

        state.current.velocity += acceleration;
        state.current.velocity *= damping;
        state.current.angle += state.current.velocity;
      } else {
        const dx = state.current.dragX;
        const dy = Math.max(state.current.dragY, 10);

        const targetAngle = Math.atan2(dx, dy);
        let targetLength = Math.sqrt(dx * dx + dy * dy);

        if (targetLength > ropeLength) {
          targetLength = ropeLength + (targetLength - ropeLength) * 0.25;
        } else if (targetLength < ropeLength * 0.3) {
          targetLength = ropeLength * 0.3;
        }

        state.current.angle += (targetAngle - state.current.angle) * 0.4;
        state.current.currentLength +=
          (targetLength - state.current.currentLength) * 0.4;
        state.current.velocity = 0;
      }

      if (boxRef.current && ropeRef.current) {
        const x = state.current.currentLength * Math.sin(state.current.angle);
        const y = state.current.currentLength * Math.cos(state.current.angle);

        ropeRef.current.setAttribute("x2", (150 + x).toString());
        ropeRef.current.setAttribute("y2", y.toString());

        boxRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${-state.current.angle}rad)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const startLoop = () => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      stopLoop();
      observer.disconnect();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    state.current.isDragging = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY, moved: false };

    if (boxRef.current) {
      boxRef.current.style.cursor = "grabbing";
    }

    const updateMousePos = (ev: PointerEvent) => {
      if (!containerRef.current) return;
      const dist = Math.hypot(
        ev.clientX - dragStartRef.current.x,
        ev.clientY - dragStartRef.current.y
      );
      if (dist > 5) {
        dragStartRef.current.moved = true;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const originX = rect.width / 2;
      const originY = 0;

      state.current.dragX = ev.clientX - rect.left - originX;
      state.current.dragY = ev.clientY - rect.top - originY;
    };

    const handlePointerUp = () => {
      state.current.isDragging = false;
      if (boxRef.current) {
        boxRef.current.style.cursor = "grab";
      }
      window.removeEventListener("pointermove", updateMousePos);
      window.removeEventListener("pointerup", handlePointerUp);

      // If user clicked without dragging, trigger open modal
      if (!dragStartRef.current.moved && onOpenModal) {
        onOpenModal();
      }
    };

    updateMousePos(e.nativeEvent as PointerEvent);

    window.addEventListener("pointermove", updateMousePos);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[300px] h-[370px] flex justify-center -mt-4 select-none"
    >
      {/* Pendulum Rope SVG */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="ropeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <line
          ref={ropeRef}
          x1="150"
          y1="0"
          x2="150"
          y2="175"
          stroke="url(#ropeGradient)"
          strokeWidth="2.5"
          className="text-foreground/30"
          strokeLinecap="round"
        />
        {/* Anchor Ring at ceiling */}
        <circle cx="150" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/70" />
        <circle cx="150" cy="0" r="3" fill="currentColor" className="text-primary" />
      </svg>

      {/* Hanging Physical ID Badge Card */}
      <div
        ref={boxRef}
        onPointerDown={handlePointerDown}
        className="absolute top-0 flex flex-col items-center p-3.5 w-[156px] rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/80 cursor-grab shadow-2xl select-none group hover:border-primary/40 hover:bg-zinc-950/95 transition-all duration-300"
        style={{
          left: "50%",
          marginLeft: "-78px",
          transformOrigin: "center top",
          touchAction: "none",
        }}
        title="Drag to swing • Click to view full bio"
      >
        {/* Metallic Lanyard Clip / Slot */}
        <div className="w-8 h-2 rounded-full bg-zinc-800 border border-zinc-700/80 -mt-1.5 mb-2.5 shadow-inner flex items-center justify-center">
          <div className="w-3 h-0.5 rounded-full bg-zinc-950" />
        </div>

        {/* Profile Photo with Ambient Glow Ring */}
        <div className="relative mb-2.5">
          <div className="w-[84px] h-[84px] rounded-full p-[2px] bg-gradient-to-tr from-primary/80 via-emerald-400/40 to-primary/40 group-hover:from-primary group-hover:to-emerald-400 transition-all duration-300 shadow-lg">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
              <Image
                src="/resume/sanjib-profile.jpg"
                alt="Sanjib Santra"
                fill
                sizes="84px"
                className="object-cover scale-105"
                unoptimized={true}
                priority
              />
            </div>
          </div>

          {/* Active Status Pulse */}
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-md flex items-center justify-center"
            title="Available for opportunities"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        {/* Identity & Title */}
        <div className="flex flex-col items-center gap-0.5 pointer-events-none text-center">
          <span className="text-[11px] font-bold tracking-[0.16em] text-zinc-100 font-mono">
            SANJIB SANTRA
          </span>
          <span className="text-[9px] uppercase tracking-wider text-primary font-semibold">
            Full Stack Engineer
          </span>
        </div>

        {/* Interactive Action Hint Badge */}
        <div className="mt-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[8px] font-mono text-zinc-400 group-hover:text-primary group-hover:border-primary/40 transition-colors pointer-events-none">
          <Sparkles className="w-2.5 h-2.5 text-primary" />
          <span className="tracking-wider">VIEW BIO</span>
        </div>

        {/* Top attachment ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 rounded-full border-2 border-zinc-700 bg-zinc-900 shadow-xs" />
      </div>
    </div>
  );
}

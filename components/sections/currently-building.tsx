"use client";

import { useLanguage } from "@/providers/language-provider";
import { ArrowUpRight, Cpu, Sparkles, Terminal } from "lucide-react";

export function CurrentlyBuilding() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="w-full bg-background border-y border-border/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto px-container py-5 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
          
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded-full">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold">
                {isEn ? "CURRENTLY BUILDING" : "ŞU AN GELİŞTİRİLİYOR"}
              </span>
            </span>
          </div>

          {/* Core Focus & Tech Highlights */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 min-w-0">
            <div>
              <p className="text-sm md:text-base font-semibold text-foreground tracking-tight flex items-center gap-2 flex-wrap">
                <span>WorkFlowAI Engine</span>
                <span className="text-muted-foreground font-normal text-xs md:text-sm">
                  — {isEn 
                    ? "Autonomous Agent Orchestrator, Next.js 15 Streaming SSR & Distributed Task Pipeline" 
                    : "Otonom Ajan Orkestratörü, Next.js 15 Streaming SSR ve Dağıtık Görev Hattı"}
                </span>
              </p>

              {/* Sub-tags */}
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-foreground/80 font-medium">Claude 3.5 & Tool Calling</span>
                  <span className="text-muted-foreground/60 text-[11px] hidden sm:inline">· Multi-agent consensus</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-foreground/80 font-medium">BullMQ & Redis Streams</span>
                  <span className="text-muted-foreground/60 text-[11px] hidden sm:inline">· Resilient message queue</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-foreground/80 font-medium">Next.js 15 App Router</span>
                  <span className="text-muted-foreground/60 text-[11px] hidden sm:inline">· Server Actions</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Link */}
          <div className="shrink-0 flex items-center">
            <a
              href="https://github.com/sanjib45"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground/70 hover:text-primary transition-colors border border-border/80 hover:border-primary/40 rounded-full px-4 py-2 bg-secondary/20 hover:bg-secondary/40"
            >
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="tracking-wider uppercase text-[11px]">{isEn ? "View GitHub" : "GitHub'da İncele"}</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

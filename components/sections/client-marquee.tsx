"use client";

import { useLanguage } from "@/providers/language-provider";
import { Building2, ShieldCheck, CheckCircle2, Award, Globe, Database } from "lucide-react";

interface BrandItem {
  name: string;
  domain: string;
  scope: string;
  isProduction?: boolean;
}

const BRANDS: BrandItem[] = [
  {
    name: "Help Create Families",
    domain: "Surrogacy & Parentage Monorepo",
    scope: "United States (50 States)",
    isProduction: true,
  },
  {
    name: "HOVSOL Technologies",
    domain: "Healthcare Technology & CMS",
    scope: "Enterprise Health Systems",
    isProduction: true,
  },
  {
    name: "Dooars Green FPO",
    domain: "Agricultural Procurement ERP",
    scope: "Live Client Deployment",
    isProduction: true,
  },
  {
    name: "EasilyJob SaaS",
    domain: "Recruitment & Outbox Queue",
    scope: "Commercial Platform",
    isProduction: true,
  },
  {
    name: "Multi-Role LIMS",
    domain: "Diagnostics & Clinic Portal",
    scope: "Role-Based Access Control",
    isProduction: true,
  },
  {
    name: "Coding Ninjas",
    domain: "Full Stack Web Engineering",
    scope: "Team Player of the Year",
    isProduction: false,
  },
];

export function ClientMarquee() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="w-full bg-background/80 py-10 sm:py-14 border-b border-border/50 select-none overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Eyebrow Label */}
      <div className="container mx-auto px-container mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            {isEn 
              ? "PRODUCTION ARCHITECTURE DELIVERED ACROSS HEALTHCARE, SAAS & ENTERPRISE" 
              : "SAĞLIK, SAAS VE KURUMSAL ALANLARDA SUNULAN ÜRETİM MİMARİSİ"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest hidden lg:block">
          {isEn ? "5+ LIVE CLIENT DEPLOYMENTS" : "5+ CANLI MÜŞTERİ DAĞITIMI"}
        </span>
      </div>

      {/* Marquee Track */}
      <div className="flex w-full overflow-hidden marquee-track">
        {/* Track 1 */}
        <div className="animate-scroll flex min-w-full shrink-0 items-center justify-around gap-6 pr-6">
          {BRANDS.map((brand, i) => (
            <div
              key={`b1-${i}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-border/40 hover:border-primary/40 transition-colors shrink-0 group"
            >
              <div className="w-8 h-8 rounded-xl bg-foreground/5 border border-border/50 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-foreground font-mono">
                    {brand.name}
                  </span>
                  {brand.isProduction && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                  <span>{brand.domain}</span>
                  <span>·</span>
                  <span className="text-muted-foreground/70">{brand.scope}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (Clone for infinite seamless loop) */}
        <div className="animate-scroll flex min-w-full shrink-0 items-center justify-around gap-6 pr-6">
          {BRANDS.map((brand, i) => (
            <div
              key={`b2-${i}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-border/40 hover:border-primary/40 transition-colors shrink-0 group"
            >
              <div className="w-8 h-8 rounded-xl bg-foreground/5 border border-border/50 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-foreground font-mono">
                    {brand.name}
                  </span>
                  {brand.isProduction && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                  <span>{brand.domain}</span>
                  <span>·</span>
                  <span className="text-muted-foreground/70">{brand.scope}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

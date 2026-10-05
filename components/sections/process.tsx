"use client";

import { useState } from "react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { Compass, Cpu, Layers, Rocket, ShieldCheck, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: typeof Compass;
}

const STEPS_EN: ProcessStep[] = [
  {
    step: "01",
    phase: "DISCOVERY & SCOPE",
    title: "Domain Discovery",
    subtitle: "Understanding business rules before writing code",
    description:
      "I partner with stakeholders to discover domain constraints, audit existing bottlenecks, and map end-to-end workflows. Requirements are translated into precise data schemas, API contracts, and an unambiguous delivery timeline.",
    deliverables: ["Domain Requirements", "Data Schema Models", "API Contracts", "Sprint Roadmap"],
    icon: Compass,
  },
  {
    step: "02",
    phase: "SYSTEM ARCHITECTURE",
    title: "Architecture & Security",
    subtitle: "Built to scale without architectural rework",
    description:
      "System design is solidified before implementation: monorepo boundaries, resilient database modeling, transactional outbox guarantees, and enterprise security boundaries (JWT rotation, RBAC, CSRF, and rate limiting).",
    deliverables: ["Monorepo Topology", "Auth Hardening", "RBAC Matrix", "Queue Infrastructure"],
    icon: Layers,
  },
  {
    step: "03",
    phase: "HARDENED SPRINT",
    title: "Iterative Build & Polish",
    subtitle: "Tight, visible iterations with staging reviews",
    description:
      "Rapid, modular implementation using Next.js 15, React 19, TypeScript, and Express/Node.js. Features are delivered incrementally with live staging deployments, atomic component design, and zero dropped event guarantees.",
    deliverables: ["Next.js 15 Frontend", "Hardened REST APIs", "Live Staging Demos", "Type-Safe Contracts"],
    icon: Cpu,
  },
  {
    step: "04",
    phase: "GO-LIVE & MONITORING",
    title: "Deployment & Handover",
    subtitle: "Zero-downtime launch and operational stability",
    description:
      "Containerized deployment via Docker and CI/CD pipelines to Vercel and Render. P99 latency tuning, Puppeteer PDF verification, health monitoring, and complete technical handover documentation so teams can operate independently.",
    deliverables: ["Zero-Downtime CI/CD", "Performance Tuning", "Health Monitoring", "Handover Docs"],
    icon: Rocket,
  },
];

const STEPS_TR: ProcessStep[] = [
  {
    step: "01",
    phase: "KEŞİF VE KAPSAM",
    title: "Alan Keşfi",
    subtitle: "Kod yazmadan önce iş kurallarını anlamak",
    description:
      "Paydaşlarla doğrudan çalışarak alan kısıtlamalarını belirler, mevcut darboğazları inceler ve uçtan uca iş akışlarını haritalandırırım. Gereksinimler net veri modellerine ve teslimat takvimine dönüştürülür.",
    deliverables: ["Alan Gereksinimleri", "Veri Modeli Şemaları", "API Sözleşmeleri", "Sprint Yol Haritası"],
    icon: Compass,
  },
  {
    step: "02",
    phase: "SİSTEM MİMARİSİ",
    title: "Mimari ve Güvenlik",
    subtitle: "Mimari yeniden yazıma gerek kalmadan ölçeklenir",
    description:
      "Uygulama öncesinde sistem tasarımı sağlamlaştırılır: monorepo sınırları, dayanıklı veri tabanı modellemesi, Transactional Outbox garantileri ve kurumsal güvenlik sınırları (JWT rotasyonu, RBAC, CSRF).",
    deliverables: ["Monorepo Yapısı", "Güvenlik Sıkılaştırma", "RBAC Matrisi", "Kuyruk Altyapısı"],
    icon: Layers,
  },
  {
    step: "03",
    phase: "GÜÇLÜ SPRINT",
    title: "Yinelemeli Geliştirme",
    subtitle: "Canlı hazırlık URL'leri ile şeffaf ilerleme",
    description:
      "Next.js 15, React 19, TypeScript ve Express ile modüler ve hızlı geliştirme. Özellikler aşamalı olarak canlı test ortamında sunulur, atomik bileşen tasarımı ve sıfır veri kaybı güvencesi sağlanır.",
    deliverables: ["Next.js 15 Ön Yüz", "Dayanıklı REST API'ler", "Canlı Test Sunumları", "Tip Güvenli Sözleşmeler"],
    icon: Cpu,
  },
  {
    step: "04",
    phase: "CANLIYA ALMA",
    title: "Dağıtım ve Teslimat",
    subtitle: "Sıfır kesinti süreli yayın ve operasyonel kararlılık",
    description:
      "Docker ve CI/CD ile Vercel ve Render üzerine kesintisiz dağıtım. P99 gecikme optimizasyonu, Puppeteer PDF doğrulaması ve ekiplerin bağımsız yönetebileceği eksiksiz teknik dokümantasyon teslimi.",
    deliverables: ["Kesintisiz CI/CD", "Performans İyileştirme", "Sistem İzleme", "Devir Dokümanları"],
    icon: Rocket,
  },
];

export function Process() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const steps = isEn ? STEPS_EN : STEPS_TR;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="w-full bg-background text-foreground py-20 sm:py-28 relative overflow-hidden border-b border-border/50">
      <div className="container mx-auto px-container">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-24 mb-16 sm:mb-20">
          <div className="xl:w-1/3">
            <BlurReveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="title-counter">[003]</span>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-semibold">
                  {isEn ? "ENGINEERING PROCESS" : "MÜHENDİSLİK SÜRECİ"}
                </span>
              </div>
            </BlurReveal>
            <BlurReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {isEn ? "How I Deliver" : "Nasıl Üretirim"}
              </h2>
            </BlurReveal>
          </div>

          <div className="xl:w-2/3 flex flex-col justify-end">
            <BlurReveal>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {isEn
                  ? "Engineering ownership means predictability. From initial architectural discovery to production monitoring, every phase is designed to eliminate risk and deliver clean, hardened code."
                  : "Mühendislik mülkiyeti öngörülebilirlik demektir. İlk mimari keşiften üretim izlemeye kadar her aşama riski ortadan kaldırmak ve temiz, dayanıklı kod sunmak için tasarlanmıştır."}
              </p>
            </BlurReveal>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BlurReveal key={item.step}>
                <div className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-secondary/15 hover:bg-secondary/30 border border-border/50 hover:border-primary/40 transition-all duration-300 h-full">
                  {/* Step Top Bar */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border/40">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tighter text-primary">
                          {item.step}
                        </span>
                        <div className="h-4 w-px bg-border/60" />
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                          {item.phase}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-2xl bg-foreground/5 border border-border/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-primary/80 mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Deliverables tags */}
                  <div className="pt-4 border-t border-border/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 block mb-2.5">
                      {isEn ? "Key Deliverables" : "Temel Çıktılar"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.deliverables.map((del) => (
                        <span
                          key={del}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/60 border border-border/50 text-[11px] font-mono text-foreground/80"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary/70 shrink-0" />
                          <span>{del}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurReveal>
            );
          })}
        </div>

        {/* Currently Accepting Projects Banner */}
        <BlurReveal>
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-border/50 bg-secondary/15 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm sm:text-base text-foreground/80 font-mono">
                {isEn ? "Currently accepting new projects — " : "Şu anda yeni projeler kabul ediyorum — "}
                <span className="font-serif italic font-normal text-muted-foreground">
                  {isEn ? "limited slots this quarter." : "bu çeyrekte sınırlı kontenjan."}
                </span>
              </p>
            </div>

            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-2.5 border border-border/80 hover:border-primary/50 bg-background/60 hover:bg-primary/10 px-6 py-3 rounded-full text-foreground/80 hover:text-foreground text-xs font-mono uppercase tracking-[0.18em] transition-all duration-300 shrink-0 cursor-pointer"
            >
              <span>{isEn ? "Start a Project" : "Proje Başlat"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </BlurReveal>

        <ContactModal open={contactOpen} onOpenChange={setContactOpen} />

      </div>
    </section>
  );
}

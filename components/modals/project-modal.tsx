"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";
import { 
    Github, 
    ExternalLink, 
    Layers, 
    Cpu, 
    ShieldCheck, 
    Activity, 
    Wrench, 
    Sparkles, 
    CheckCircle2,
    Boxes,
    FileText
} from "lucide-react";
import Image from "next/image";
import type { ProjectItem } from "@/types/project";
import { ShineButton } from "@/components/ui/shine-button";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: ProjectItem | null;
}

type TabType = "overview" | "ecosystem" | "challenges" | "stack";

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
    useLenisModal(open);
    const { dict } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    useEffect(() => {
        if (open) {
            setActiveTab("overview");
        }
    }, [open, project]);

    if (!project) return null;

    const isCaseStudy = !!(project.problem || project.solution || project.architectureHighlights);
    const hasAdvancedCaseStudy = !!(project.ecosystem?.length || project.technicalChallenges?.length);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[850px] w-[95vw] max-h-[92vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl shrink-0 shadow-2xl"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{dict.projectDetails} {project.title}</DialogDescription>
                </DialogHeader>

                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

                <div className="overflow-y-auto w-full h-full flex-1" data-lenis-prevent="true">

                    {/* Hero Banner */}
                    <div className="relative w-full h-[36vh] sm:h-[46vh] shrink-0">
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover rounded-t-lg"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                        {/* Live in Production badge */}
                        {project.isLiveProduction && (
                            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-xs font-mono tracking-widest uppercase shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-foreground/90 font-medium">Live in Production</span>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-2">
                                    {project.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-widest text-muted-foreground uppercase">
                                    <span>{project.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span>{project.year}</span>
                                    {project.type && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="text-primary font-semibold">{project.type}</span>
                                        </>
                                    )}
                                </div>
                                {project.org && project.role && (
                                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground/90 font-mono">
                                        {project.role} · {project.org} {project.timeline ? `· ${project.timeline}` : ""}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 flex flex-col gap-8">

                        {/* Quick Key Metrics Ribbon (if available) */}
                        {project.metrics && project.metrics.length > 0 && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {project.metrics.map((metric, i) => (
                                    <div
                                        key={i}
                                        className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 hover:bg-secondary/35 transition-colors flex flex-col justify-between"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-primary">
                                                {metric.value}
                                            </span>
                                            <Activity className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                                        </div>
                                        <div className="mt-2">
                                            <div className="text-xs font-semibold text-foreground tracking-tight">
                                                {metric.label}
                                            </div>
                                            <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug font-light">
                                                {metric.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Summary / Description */}
                        <div>
                            <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                {dict.aboutProject}
                            </h3>
                            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </div>

                        {/* Tab Switcher for Rich Case Studies */}
                        {hasAdvancedCaseStudy && (
                            <div className="flex items-center gap-1.5 p-1 bg-secondary/30 border border-border/50 rounded-xl overflow-x-auto select-none">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={cn(
                                        "px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2",
                                        activeTab === "overview"
                                            ? "bg-foreground text-background font-semibold shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                    )}
                                >
                                    <FileText className="w-3.5 h-3.5" />
                                    Overview & Outcomes
                                </button>
                                {project.ecosystem && project.ecosystem.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab("ecosystem")}
                                        className={cn(
                                            "px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2",
                                            activeTab === "ecosystem"
                                                ? "bg-foreground text-background font-semibold shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                        )}
                                    >
                                        <Boxes className="w-3.5 h-3.5" />
                                        Ecosystem ({project.ecosystem.length})
                                    </button>
                                )}
                                {project.technicalChallenges && project.technicalChallenges.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab("challenges")}
                                        className={cn(
                                            "px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2",
                                            activeTab === "challenges"
                                                ? "bg-foreground text-background font-semibold shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                        )}
                                    >
                                        <Cpu className="w-3.5 h-3.5" />
                                        Engineering Deep Dives
                                    </button>
                                )}
                                {project.stackCategorized && (
                                    <button
                                        onClick={() => setActiveTab("stack")}
                                        className={cn(
                                            "px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2",
                                            activeTab === "stack"
                                                ? "bg-foreground text-background font-semibold shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                        )}
                                    >
                                        <Wrench className="w-3.5 h-3.5" />
                                        ATS Tech Stack
                                    </button>
                                )}
                            </div>
                        )}

                        {/* TAB 1: OVERVIEW & OUTCOMES */}
                        {(!hasAdvancedCaseStudy || activeTab === "overview") && isCaseStudy && (
                            <div className="flex flex-col gap-8">
                                {project.problem && (
                                    <div>
                                        <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                                            The Problem & Operational Bottlenecks
                                        </h3>
                                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                                            {project.problem}
                                        </p>
                                    </div>
                                )}

                                {project.solution && (
                                    <div>
                                        <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                                            The Engineered Solution
                                        </h3>
                                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                                            {project.solution}
                                        </p>
                                    </div>
                                )}

                                {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                                            Architecture Highlights
                                        </h3>
                                        <ul className="flex flex-col gap-2.5">
                                            {project.architectureHighlights.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed font-light">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.keyFeatures && project.keyFeatures.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                                            Core Operational Features
                                        </h3>
                                        <ul className="flex flex-col gap-2.5">
                                            {project.keyFeatures.map((feat, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed font-light">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.impact && project.impact.length > 0 && (
                                    <div className="border border-border/50 bg-secondary/15 p-6 rounded-xl">
                                        <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                            Impact & Production Outcomes
                                        </h3>
                                        <ul className="flex flex-col gap-2.5">
                                            {project.impact.map((outcome, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed font-light">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB 2: MODULAR ECOSYSTEM EXPLORER */}
                        {hasAdvancedCaseStudy && activeTab === "ecosystem" && project.ecosystem && (
                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                                    Distributed Monorepo Structure & Portal Breakdown
                                </p>
                                <div className="grid grid-cols-1 gap-3.5">
                                    {project.ecosystem.map((mod, i) => (
                                        <div
                                            key={i}
                                            className="p-5 rounded-xl border border-border/50 bg-secondary/15 hover:bg-secondary/25 transition-colors"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <h4 className="text-base font-bold font-mono tracking-tight text-foreground flex items-center gap-2">
                                                    <Layers className="w-4 h-4 text-primary shrink-0" />
                                                    {mod.name}
                                                </h4>
                                                <span className="self-start sm:self-auto text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                                                    {mod.role}
                                                </span>
                                            </div>
                                            <p className="text-sm text-foreground/80 leading-relaxed font-light">
                                                {mod.description}
                                            </p>
                                            {mod.features && mod.features.length > 0 && (
                                                <ul className="mt-3 flex flex-col gap-1.5 pt-3 border-t border-border/30">
                                                    {mod.features.map((feat, fIdx) => (
                                                        <li key={fIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                                            <span className="mt-1 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                                                            {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: ENGINEERING DEEP DIVES (CHALLENGES SOLVED) */}
                        {hasAdvancedCaseStudy && activeTab === "challenges" && project.technicalChallenges && (
                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                                    High-Impact Technical Problems & Solved Architectures
                                </p>
                                <div className="grid grid-cols-1 gap-4">
                                    {project.technicalChallenges.map((ch, i) => (
                                        <div
                                            key={i}
                                            className="p-5 rounded-xl border border-border/50 bg-secondary/15 flex flex-col gap-3"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h4 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                                                    <Cpu className="w-4 h-4 text-primary shrink-0" />
                                                    {ch.title}
                                                </h4>
                                                {ch.metric && (
                                                    <span className="self-start sm:self-auto text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                                        {ch.metric}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-amber-500/50">
                                                <strong className="text-amber-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                                                    The Challenge
                                                </strong>
                                                {ch.problem}
                                            </div>
                                            <div className="text-xs sm:text-sm text-foreground/85 leading-relaxed pl-3 border-l-2 border-emerald-500/50">
                                                <strong className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                                                    Engineered Solution
                                                </strong>
                                                {ch.solution}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: CATEGORIZED ATS TECH STACK */}
                        {hasAdvancedCaseStudy && activeTab === "stack" && project.stackCategorized && (
                            <div className="flex flex-col gap-5">
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                    Categorized ATS Keyword Stack
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(project.stackCategorized).map(([category, items]) => (
                                        <div
                                            key={category}
                                            className="p-4 rounded-xl border border-border/40 bg-secondary/10 flex flex-col gap-2.5"
                                        >
                                            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                                                {category}
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {items?.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2.5 py-1 rounded-md border border-border/40 bg-secondary/40 text-xs font-mono text-foreground/90"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Standard Flat Tech Stack (Shown in Overview tab or when no advanced tabs) */}
                        {(!hasAdvancedCaseStudy || activeTab === "overview") && project.stack && project.stack.length > 0 && (
                            <div>
                                <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                                    {dict.technologies}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3.5 py-1 rounded-full border border-border/50 bg-secondary/40 text-xs font-mono text-foreground/90"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Links */}
                        {(project.demo || project.repo) && (
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                                {project.demo && (
                                    <ShineButton
                                        href={project.demo}
                                        className="h-11 bg-foreground px-6 sm:px-8 text-background hover:bg-background hover:text-foreground shadow-lg hover:-translate-y-0.5"
                                        shineClassName="w-8 bg-background/20 dark:bg-foreground/10"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-xs font-medium tracking-widest uppercase">
                                            {dict.liveDemo}
                                            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </ShineButton>
                                )}

                                {project.repo && (
                                    <ShineButton
                                        href={project.repo}
                                        className="h-11 bg-secondary/15 backdrop-blur-md px-6 sm:px-8 text-foreground hover:bg-foreground hover:text-background shadow-sm hover:-translate-y-0.5"
                                        shineClassName="w-8 bg-foreground/10 dark:bg-background/20"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-xs font-medium tracking-widest uppercase">
                                            {dict.sourceCode}
                                            <Github className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                                        </span>
                                    </ShineButton>
                                )}
                            </div>
                        )}

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}

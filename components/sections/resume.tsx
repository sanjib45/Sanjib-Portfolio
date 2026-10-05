"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import {
    Briefcase,
    GraduationCap,
    MapPin,
    Calendar,
    Award,
    Download,
    ExternalLink,
    ChevronRight,
    Code2,
    Server,
    Shield,
    Wrench,
    Terminal,
    Database,
    Sparkles,
    Layers,
} from "lucide-react";

interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    type: string;
    current: boolean;
    description: string;
    highlights: string[];
}

interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    description: string;
    highlights: string[];
}

interface CertificationItem {
    name: string;
    issuer: string;
    period: string;
    description: string;
}

const SKILL_CATEGORY_META: Record<
    string,
    { icon: typeof Code2; label: string; gradient: string }
> = {
    languages: {
        icon: Terminal,
        label: "Languages",
        gradient: "from-amber-500/20 to-yellow-500/20",
    },
    frontend: {
        icon: Code2,
        label: "Frontend",
        gradient: "from-blue-500/20 to-cyan-500/20",
    },
    backend: {
        icon: Server,
        label: "Backend",
        gradient: "from-emerald-500/20 to-green-500/20",
    },
    databases: {
        icon: Database,
        label: "Databases",
        gradient: "from-teal-500/20 to-emerald-500/20",
    },
    ai: {
        icon: Sparkles,
        label: "AI / LLM",
        gradient: "from-violet-500/20 to-purple-500/20",
    },
    security: {
        icon: Shield,
        label: "Security",
        gradient: "from-rose-500/20 to-red-500/20",
    },
    integrations: {
        icon: Layers,
        label: "Integrations & APIs",
        gradient: "from-indigo-500/20 to-blue-500/20",
    },
    tools: {
        icon: Wrench,
        label: "Tools & DevOps",
        gradient: "from-orange-500/20 to-amber-500/20",
    },
    architecture: {
        icon: Shield,
        label: "Architecture & Security",
        gradient: "from-purple-500/20 to-pink-500/20",
    },
};

export default function Resume() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const { content, dict } = useLanguage();

    const resumeData = (content as Record<string, unknown>).resume as {
        title: string;
        subtitle: string;
        summary: string;
        experience: ExperienceItem[];
        education: EducationItem[];
        skills: Record<string, string[]>;
        skillCategories?: Record<string, string>;
        certifications: CertificationItem[];
        downloadLabel: string;
        viewLabel?: string;
        experienceLabel: string;
        educationLabel: string;
        skillsLabel: string;
        certificationsLabel: string;
        presentLabel?: string;
        currentLabel: string;
    };

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    if (!resumeData) return null;

    return (
        <section
            ref={containerRef}
            className="relative container-void overflow-hidden border-t border-border/50"
        >
            {/* Background decorative elements */}
            <div className="absolute top-1/3 right-0 w-full max-w-2xl h-[600px] bg-primary/3 blur-[150px] rounded-full pointer-events-none translate-x-1/3" />
            <div className="absolute bottom-1/4 left-0 w-full max-w-xl h-[400px] bg-primary/3 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />

            {/* Giant watermark text */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center opacity-[0.02] z-0 overflow-hidden"
            >
                <div className="text-[18vw] font-black tracking-tighter uppercase whitespace-nowrap">
                    {(dict.title as Record<string, string>).resume || "Resume"}
                </div>
            </motion.div>

            <div className="container mx-auto px-container max-w-6xl relative z-10">
                {/* ─── Section Header ─── */}
                <div className="flex flex-col md:items-center mb-16 md:mb-24 gap-4 text-center">
                    <BlurReveal>
                        <span className="title-counter">[005]</span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">
                            {(dict.title as Record<string, string>).resume || "Resume"}
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="text-lg mt-3 max-w-2xl italic font-medium tracking-tight text-foreground/60">
                            {resumeData.subtitle}
                        </p>
                    </BlurReveal>
                </div>

                {/* ─── Title + Summary Card ─── */}
                <BlurReveal>
                    <div className="relative mb-20 md:mb-28 p-8 md:p-12 border border-border/50 bg-secondary/5 backdrop-blur-md overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                            <div>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-foreground">
                                    Sanjib Santra
                                </h3>
                                <p className="text-lg md:text-xl font-medium text-primary mt-2 tracking-tight">
                                    {resumeData.title}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href="/resume/Sanjib_Santra_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-fit group relative flex h-12 xl:h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/70 bg-secondary/15 hover:bg-secondary/30 px-6 xl:px-7 text-foreground transition-all duration-300 hover:border-primary/50 shadow-md hover:-translate-y-0.5"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-xs xl:text-sm font-semibold tracking-[0.15em] uppercase">
                                        <ExternalLink className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        {resumeData.viewLabel || "View PDF"}
                                    </span>
                                </a>

                                <a
                                    href="/resume/Sanjib_Santra_Resume.pdf"
                                    download="Sanjib_Santra_Resume.pdf"
                                    className="w-fit group relative flex h-12 xl:h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-8 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
                                >
                                    <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
                                        <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                                    </div>
                                    <span className="relative z-10 flex items-center gap-2 text-xs xl:text-sm font-semibold tracking-[0.15em] uppercase">
                                        <Download className="w-4 h-4" />
                                        {resumeData.downloadLabel}
                                    </span>
                                </a>
                            </div>
                        </div>

                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            {resumeData.summary}
                        </p>

                        {/* Decorative watermark */}
                        <div className="absolute -bottom-8 -right-4 text-[8rem] md:text-[12rem] font-black italic text-foreground/[0.02] select-none pointer-events-none leading-none">
                            SR
                        </div>
                    </div>
                </BlurReveal>

                {/* ─── Experience Timeline ─── */}
                <div className="mb-20 md:mb-28" ref={timelineRef}>
                    <BlurReveal>
                        <div className="flex items-center gap-4 mb-12 md:mb-16">
                            <div className="w-12 h-12 rounded-full border border-border/50 bg-secondary/10 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase text-foreground">
                                {resumeData.experienceLabel}
                            </h3>
                        </div>
                    </BlurReveal>

                    <div className="relative">
                        {/* Static timeline line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border/30" />

                        {/* Animated progress line */}
                        <motion.div
                            style={{ scaleY, originY: 0 }}
                            className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.3)] z-10"
                        />

                        <div className="flex flex-col gap-12 md:gap-16">
                            {resumeData.experience.map(
                                (exp: ExperienceItem, index: number) => (
                                    <ExperienceCard
                                        key={exp.id}
                                        item={exp}
                                        index={index}
                                        currentLabel={resumeData.currentLabel}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Education ─── */}
                <div className="mb-20 md:mb-28">
                    <BlurReveal>
                        <div className="flex items-center gap-4 mb-12 md:mb-16">
                            <div className="w-12 h-12 rounded-full border border-border/50 bg-secondary/10 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase text-foreground">
                                {resumeData.educationLabel}
                            </h3>
                        </div>
                    </BlurReveal>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {resumeData.education.map(
                            (edu: EducationItem, index: number) => (
                                <EducationCard key={edu.id} item={edu} index={index} />
                            )
                        )}
                    </div>
                </div>

                {/* ─── Skills Grid ─── */}
                <div className="mb-20 md:mb-28">
                    <BlurReveal>
                        <div className="flex items-center gap-4 mb-12 md:mb-16">
                            <div className="w-12 h-12 rounded-full border border-border/50 bg-secondary/10 flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase text-foreground">
                                {resumeData.skillsLabel}
                            </h3>
                        </div>
                    </BlurReveal>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {Object.entries(resumeData.skills).map(
                            ([category, skills], index) => (
                                <SkillCategory
                                    key={category}
                                    category={category}
                                    skills={skills as string[]}
                                    index={index}
                                    categoryLabels={resumeData.skillCategories}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* ─── Certifications ─── */}
                {resumeData.certifications &&
                    resumeData.certifications.length > 0 && (
                        <div>
                            <BlurReveal>
                                <div className="flex items-center gap-4 mb-12 md:mb-16">
                                    <div className="w-12 h-12 rounded-full border border-border/50 bg-secondary/10 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase text-foreground">
                                        {resumeData.certificationsLabel}
                                    </h3>
                                </div>
                            </BlurReveal>

                            <div className="grid gap-6">
                                {resumeData.certifications.map(
                                    (cert: CertificationItem, index: number) => (
                                        <CertificationCard
                                            key={cert.name}
                                            item={cert}
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

const ExperienceCard = ({
    item,
    index,
    currentLabel,
}: {
    item: ExperienceItem;
    index: number;
    currentLabel: string;
}) => {
    return (
        <div className="relative pl-16 md:pl-20 group">
            {/* Timeline dot */}
            <div className="absolute left-6 md:left-8 -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-border/60 bg-background z-20 flex items-center justify-center shadow-md group-hover:border-primary/60 transition-colors duration-500 top-2">
                <div
                    className={cn(
                        "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shadow-sm",
                        item.current
                            ? "bg-emerald-500 shadow-emerald-500/50 animate-pulse"
                            : "bg-primary shadow-primary/50"
                    )}
                />
            </div>

            <BlurReveal delay={index * 0.08}>
                <div className="relative p-6 md:p-8 border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out hover:bg-secondary/15 hover:border-border/60 hover:shadow-2xl group/card">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover/card:text-primary transition-colors duration-500">
                                {item.role}
                            </h4>
                            <p className="text-base md:text-lg font-medium text-muted-foreground mt-1">
                                {item.company}
                            </p>
                        </div>

                        {item.current && (
                            <span className="w-fit px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full shrink-0">
                                {currentLabel}
                            </span>
                        )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                        </span>
                        <span className="px-2.5 py-0.5 text-[10px] tracking-[0.15em] uppercase font-semibold border border-border/40 rounded-full bg-background/50">
                            {item.type}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                        {item.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2.5">
                        {item.highlights.map((highlight: string, i: number) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-foreground/80"
                            >
                                <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Decorative index */}
                    <div className="absolute -bottom-4 -right-2 text-[7rem] font-black italic text-foreground/[0.02] select-none pointer-events-none leading-none">
                        {String(index + 1).padStart(2, "0")}
                    </div>
                </div>
            </BlurReveal>
        </div>
    );
};

const EducationCard = ({
    item,
    index,
}: {
    item: EducationItem;
    index: number;
}) => {
    return (
        <BlurReveal delay={index * 0.1}>
            <div className="relative h-full p-6 md:p-8 border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out hover:bg-secondary/15 hover:border-border/60 hover:shadow-2xl group">
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Degree */}
                <h4 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500 mb-2">
                    {item.degree}
                </h4>

                {/* Institution */}
                <p className="text-sm md:text-base font-medium text-muted-foreground mb-3">
                    {item.institution}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                    </span>
                </div>

                {/* CGPA Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-5">
                    <span className="text-xs font-bold tracking-wider uppercase text-primary">
                        CGPA
                    </span>
                    <span className="text-sm font-black text-foreground">
                        {item.cgpa}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                </p>

                {/* Focus areas */}
                <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h: string) => (
                        <span
                            key={h}
                            className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2.5 py-1 rounded-full border border-border/40 bg-background/50"
                        >
                            {h}
                        </span>
                    ))}
                </div>

                {/* Decorative */}
                <div className="absolute -bottom-6 -right-4 text-[8rem] font-black italic text-foreground/[0.02] select-none pointer-events-none leading-none">
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>
        </BlurReveal>
    );
};

const SkillCategory = ({
    category,
    skills,
    index,
    categoryLabels,
}: {
    category: string;
    skills: string[];
    index: number;
    categoryLabels?: Record<string, string>;
}) => {
    const meta = SKILL_CATEGORY_META[category] || {
        icon: Code2,
        label: category,
        gradient: "from-primary/20 to-primary/10",
    };
    const Icon = meta.icon;
    const title = categoryLabels?.[category] || meta.label;

    return (
        <BlurReveal delay={index * 0.08}>
            <div className="relative h-full p-6 md:p-8 border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out hover:bg-secondary/15 hover:border-border/60 hover:shadow-xl group">
                {/* Gradient accent bg */}
                <div
                    className={cn(
                        "absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                        meta.gradient
                    )}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-border/40 bg-background/80 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold tracking-tight uppercase text-foreground">
                        {title}
                    </h4>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                    {skills.map((skill: string, i: number) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{
                                delay: 0.02 * i,
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                            className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-foreground/80 border border-border/40 rounded-full bg-background/60 hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-all duration-300 cursor-default"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </BlurReveal>
    );
};

const CertificationCard = ({
    item,
    index,
}: {
    item: CertificationItem;
    index: number;
}) => {
    return (
        <BlurReveal delay={index * 0.1}>
            <div className="relative p-6 md:p-8 border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out hover:bg-secondary/15 hover:border-border/60 hover:shadow-xl group">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-amber-500" />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-amber-500 transition-colors duration-500">
                            {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                            {item.issuer}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                            <Calendar className="w-3 h-3" />
                            {item.period}
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                        {item.description}
                    </p>
                </div>
            </div>
        </BlurReveal>
    );
};

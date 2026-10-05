"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${isDesktop
                        ? "sticky top-0 h-screen flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [003]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center">

                            <div className="flex flex-col gap-4">

                                <BlurReveal>
                                    <span className="title-counter">
                                        [003]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-5xl font-light leading-tight">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>

                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border" />
                                        <span className="text-sm font-mono text-foreground/40 uppercase">
                                            {dict.projectsScrollText}
                                        </span>
                                    </div>
                                </BlurReveal>

                            </div>

                        </div>

                        {content.projects.map((project: ProjectItem) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[40vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                            <h3 className="text-[10vw] font-black tracking-tighter text-border uppercase">
                                {dict.projectsEndText}
                            </h3>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    return (
        <BlurReveal>
            <div
                onClick={onClick}
                className="group relative w-full xl:w-[45vw] aspect-4/3 shrink-0 xl:mx-6 perspective-1000 cursor-pointer"
            >
                <div className="relative w-full h-full overflow-hidden bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/30 shadow-xl">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1280px) 100vw, 45vw"
                            loading="lazy"
                            className="object-cover opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-10 pointer-events-none">
                        <div className="flex justify-between items-start gap-4 pointer-events-auto">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase">
                                    {project.category}
                                </span>
                                {project.isLiveProduction && (
                                    <div className="flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-border/60 text-[10px] font-mono tracking-widest uppercase shadow-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-foreground/90 font-medium">Live Production</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 rounded-full bg-background/85 hover:bg-foreground hover:text-background border border-border/60 text-foreground transition-all duration-300 shadow-xs"
                                        aria-label="Open Live Demo"
                                        title="Open Live Demo"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                {project.repo && (
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 rounded-full bg-background/85 hover:bg-foreground hover:text-background border border-border/60 text-foreground transition-all duration-300 shadow-xs"
                                        aria-label="View Source Code"
                                        title="View Source Code"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                <span className="text-xs xl:text-sm font-mono text-muted-foreground ml-2">
                                    {project.year}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-end justify-between gap-4">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase text-foreground transition-transform duration-500 group-hover:translate-x-1 drop-shadow-sm">
                                    {project.title}
                                </h3>
                                <div className="hidden sm:flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                                    <span>Case Study</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                            </div>

                            {project.stack && project.stack.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.stack.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-secondary/30 backdrop-blur-sm border border-border/40 text-muted-foreground uppercase"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.stack.length > 4 && (
                                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-secondary/20 text-muted-foreground/60">
                                            +{project.stack.length - 4}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </BlurReveal>
    );
});
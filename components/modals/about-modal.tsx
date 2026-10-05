import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useLanguage } from "@/providers/language-provider";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { Github, Linkedin, MapPin, Mail } from "lucide-react";

interface AboutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// Parse **bold**, *italic*, bullet lines (• ...) into JSX
// Handles: standalone headings, heading+content blocks, bullet blocks, mixed, regular paragraphs
function RichBio({ text }: { text: string }) {
    const paragraphs = text.split("\n\n");

    return (
        <div className="flex flex-col gap-5">
            {paragraphs.map((para, pIdx) => {
                const lines = para.split("\n");
                const firstLine = lines[0];

                // Standalone heading: only line is **Something**
                if (lines.length === 1 && /^\*\*[^*]+\*\*$/.test(firstLine.trim())) {
                    const label = firstLine.trim().replace(/^\*\*|\*\*$/g, "");
                    return (
                        <h4
                            key={pIdx}
                            className="text-xs font-bold tracking-[0.2em] uppercase text-primary border-b border-border/40 pb-2 mt-2"
                        >
                            {label}
                        </h4>
                    );
                }

                // Heading + content block: first line is **Heading**, rest is content
                const headingLineMatch = firstLine.trim().match(/^\*\*([^*]+)\*\*$/);
                if (headingLineMatch && lines.length > 1) {
                    const restLines = lines.slice(1);
                    return (
                        <div key={pIdx} className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-primary border-b border-border/40 pb-2 mt-2">
                                {headingLineMatch[1]}
                            </h4>
                            {renderLines(restLines)}
                        </div>
                    );
                }

                // Pure bullet block
                const allBullets = lines.every(
                    (l) => l.startsWith("• ") || l.startsWith("- ")
                );
                if (allBullets) {
                    return (
                        <ul key={pIdx} className="flex flex-col gap-2 pl-1">
                            {lines.map((line, lIdx) => {
                                const cnt = line.replace(/^[•\-]\s+/, "");
                                return (
                                    <li key={lIdx} className="flex items-start gap-2.5 text-sm text-foreground/75 leading-relaxed">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                                        <span>{parseInlineText(cnt)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                }

                // Mixed / regular paragraph
                return (
                    <div key={pIdx} className="flex flex-col gap-2">
                        {renderLines(lines)}
                    </div>
                );
            })}
        </div>
    );
}

function renderLines(lines: string[]) {
    return lines.map((line, idx) => {
        if (line.startsWith("• ") || line.startsWith("- ")) {
            const cnt = line.replace(/^[•\-]\s+/, "");
            return (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/75 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                    <span>{parseInlineText(cnt)}</span>
                </div>
            );
        }
        return (
            <p key={idx} className="text-sm text-foreground/80 leading-relaxed font-light">
                {parseInlineText(line)}
            </p>
        );
    });
}

function parseInlineText(text: string): React.ReactNode {
    const regex = /\*{2}(.+?)\*{2}|\*(.+?)\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const isBold = match[1] !== undefined;
        parts.push(
            <span
                key={match.index}
                className={
                    isBold
                        ? "text-foreground font-semibold"
                        : "text-foreground/80 italic"
                }
            >
                {isBold ? match[1] : match[2]}
            </span>
        );
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    if (parts.length === 0) return text;
    if (parts.length === 1) return parts[0];
    return <>{parts}</>;
}



const QUICK_STATS = [
    { value: "2+", label: "Yrs Experience" },
    { value: "5+", label: "Live Platforms" },
    { value: "MERN", label: "Core Stack" },
    { value: "9.30", label: "BCA CGPA" },
];

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
    const { content, dict } = useLanguage();
    useLenisModal(open);

    const bioContent = content.about.full;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[700px] max-h-[88vh] p-0 gap-0 border-border/50 bg-background/97 backdrop-blur-xl"
            >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent z-10" />

                {/* ── Identity Header ── */}
                <div className="relative px-8 pt-7 pb-5 shrink-0 border-b border-border/40">
                    <DialogHeader className="gap-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    Sanjib Santra
                                </DialogTitle>
                                <p className="text-sm font-mono tracking-[0.15em] text-primary uppercase">
                                    Full Stack Engineer
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    <span>Kolkata, West Bengal, India</span>
                                </div>
                            </div>

                            {/* Open to Work badge */}
                            <div className="shrink-0 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-[10px] font-mono font-semibold text-green-400 uppercase tracking-wider whitespace-nowrap">
                                    Open to Work
                                </span>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-4 gap-3 mt-5">
                        {QUICK_STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center justify-center bg-secondary/30 border border-border/40 rounded-xl py-2.5 px-1 gap-0.5"
                            >
                                <span className="text-base font-bold text-foreground tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest text-center">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Scrollable Bio Content ── */}
                <div
                    className="overflow-y-auto px-8 pb-6 pt-5 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50"
                    data-lenis-prevent="true"
                >
                    {bioContent ? (
                        typeof bioContent === "string" ? (
                            <RichBio text={bioContent} />
                        ) : (
                            <div className="text-sm text-foreground/85 leading-relaxed font-light space-y-4">
                                {bioContent as React.ReactNode}
                            </div>
                        )
                    ) : (
                        <p className="text-sm text-muted-foreground italic">
                            Bio not available
                        </p>
                    )}
                </div>

                {/* ── Footer: Social + Contact ── */}
                <div className="px-8 py-4 border-t border-border/50 bg-secondary/10 flex items-center justify-between text-xs font-mono shrink-0">
                    <div className="flex items-center gap-5">
                        <a
                            href="https://www.linkedin.com/in/sanjib-santra/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                        >
                            <Linkedin className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                            <span>LinkedIn ↗</span>
                        </a>
                        <a
                            href="https://github.com/sanjib45"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                        >
                            <Github className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                            <span>GitHub ↗</span>
                        </a>
                        <a
                            href="mailto:santrasanjib199@gmail.com"
                            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                        >
                            <Mail className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                            <span>Email ↗</span>
                        </a>
                    </div>
                    <span className="text-muted-foreground/50 hidden sm:inline tracking-widest uppercase">
                        MERN · Next.js · TypeScript
                    </span>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}

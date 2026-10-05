export type ProjectItem = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    demo?: string;
    repo?: string;
    stack?: string[];
    // Case-study fields — populated for full-depth projects (1–3) only
    role?: string;
    org?: string;
    timeline?: string;
    /** "Production" | "Freelance / Live Client" | "Internal Tool" | "Academic" */
    type?: string;
    problem?: string;
    solution?: string;
    architectureHighlights?: string[];
    keyFeatures?: string[];
    impact?: string[];
    isLiveProduction?: boolean;
};

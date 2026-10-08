export interface KeyMetric {
    label: string;
    value: string;
    description: string;
}

export interface ProjectEcosystemModule {
    name: string;
    role: string;
    description: string;
    features?: string[];
}

export interface TechnicalChallenge {
    title: string;
    problem: string;
    solution: string;
    metric?: string;
}

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
    // Case-study fields
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

    // Advanced case study deep-dives
    metrics?: KeyMetric[];
    ecosystem?: ProjectEcosystemModule[];
    technicalChallenges?: TechnicalChallenge[];
    stackCategorized?: {
        frontend?: string[];
        backend?: string[];
        database?: string[];
        documents?: string[];
        integrations?: string[];
        security?: string[];
    };
};


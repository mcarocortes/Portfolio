import projectVideoHealth from "../assets/img/Projects/Health/resiplus.mp4";

export const CASE_ICON_NAMES = [
    "search",
    "layers",
    "check",
    "users",
    "mobile",
    "spark",
    "heart",
    "clock",
    "shield",
    "target",
    "code",
    "palette",
    "box",
    "waves",
    "chat",
    "chart",
] as const;

export type CaseIconName = (typeof CASE_ICON_NAMES)[number];

export type ProjectCaseKey =
    | "healthcare"
    | "modular"
    | "vc"
    | "bank"
    | "movies"
    | "vinos"
    | "packaging"
    | "catamaran";

export type ProjectCatalogSection = "items" | "beyond";

export type ProjectCaseRoute = {
    key: ProjectCaseKey;
    slug: string;
};

/** Hero del case study: mockup Hand + vídeo, o imagen estática (Beyond Code). */
export type ProjectHeroMedia =
    | { type: "hand"; videoSrc: string | null }
    | { type: "image"; src: string | null };

/**
 * Un proyecto = una entrada.
 * Textos ES/EN viven en locales; aquí solo datos que no se traducen.
 * `cardId` es la clase CSS del carrusel (ProyectA, ProyectB…).
 */
export type ProjectDefinition = {
    key: ProjectCaseKey;
    slug: string;
    section: ProjectCatalogSection;
    cardId: string;
    images: (string | null)[];
    hero: ProjectHeroMedia;
    opportunityImage: string | null;
    opportunityIcons: [CaseIconName, CaseIconName, CaseIconName];
    impactIcons: [CaseIconName, CaseIconName, CaseIconName];
};

export const PROJECTS: ProjectDefinition[] = [
    {
        key: "healthcare",
        slug: "/healthcare",
        section: "items",
        cardId: "ProyectA",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: projectVideoHealth },
        opportunityImage: null,
        opportunityIcons: ["search", "layers", "check"],
        impactIcons: ["mobile", "clock", "spark"],
    },
    {
        key: "modular",
        slug: "/modulAR",
        section: "items",
        cardId: "ProyectB",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: null },
        opportunityImage: null,
        opportunityIcons: ["search", "layers", "check"],
        impactIcons: ["spark", "users", "target"],
    },
    {
        key: "vc",
        slug: "/Vc",
        section: "items",
        cardId: "ProyectC",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: null },
        opportunityImage: null,
        opportunityIcons: ["heart", "palette", "check"],
        impactIcons: ["shield", "heart", "users"],
    },
    {
        key: "bank",
        slug: "/Bank",
        section: "items",
        cardId: "ProyectD",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: null },
        opportunityImage: null,
        opportunityIcons: ["chart", "layers", "check"],
        impactIcons: ["chart", "target", "code"],
    },
    {
        key: "movies",
        slug: "/Movies",
        section: "items",
        cardId: "ProyectE",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: null },
        opportunityImage: null,
        opportunityIcons: ["chat", "spark", "check"],
        impactIcons: ["spark", "chat", "code"],
    },
    {
        key: "vinos",
        slug: "/Vinos",
        section: "items",
        cardId: "ProyectF",
        images: [null, null, null, null],
        hero: { type: "hand", videoSrc: null },
        opportunityImage: null,
        opportunityIcons: ["palette", "heart", "check"],
        impactIcons: ["palette", "target", "heart"],
    },
    {
        key: "packaging",
        slug: "/Design",
        section: "beyond",
        cardId: "ProyectG",
        images: [null, null, null, null],
        hero: { type: "image", src: null },
        opportunityImage: null,
        opportunityIcons: ["box", "palette", "check"],
        impactIcons: ["box", "target", "spark"],
    },
    {
        key: "catamaran",
        slug: "/Catamaran",
        section: "beyond",
        cardId: "ProyectH",
        images: [null, null, null, null],
        hero: { type: "image", src: null },
        opportunityImage: null,
        opportunityIcons: ["waves", "search", "check"],
        impactIcons: ["waves", "users", "spark"],
    },
];

export const PROJECTS_ITEMS = PROJECTS.filter((project) => project.section === "items");
export const PROJECTS_BEYOND = PROJECTS.filter((project) => project.section === "beyond");

/** Orden de navegación prev/next (el del catálogo). */
export const PROJECT_CASE_ORDER: ProjectCaseRoute[] = PROJECTS.map(({ key, slug }) => ({
    key,
    slug,
}));

export function getProjectByKey(key: ProjectCaseKey) {
    return PROJECTS.find((project) => project.key === key);
}

export function getProjectCatalogPath(key: ProjectCaseKey) {
    const project = getProjectByKey(key);
    return project ? `projectsSection.${project.section}.${key}` : "";
}

export function getProjectNeighbors(slug: string) {
    const index = PROJECTS.findIndex((project) => project.slug === slug);

    if (index === -1) {
        return { prev: null, next: null, index: -1 };
    }

    const toRoute = (project: ProjectDefinition): ProjectCaseRoute => ({
        key: project.key,
        slug: project.slug,
    });

    return {
        prev: index > 0 ? toRoute(PROJECTS[index - 1]) : null,
        next: index < PROJECTS.length - 1 ? toRoute(PROJECTS[index + 1]) : null,
        index,
    };
}

export function getProjectRoute(key: ProjectCaseKey) {
    const project = getProjectByKey(key);
    return project ? { key: project.key, slug: project.slug } : undefined;
}

export function projectLink(slug: string) {
    return { pathname: slug, hash: "" };
}

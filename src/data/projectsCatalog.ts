import handHealth from "../assets/img/Projects/Health/resiplus.mp4";
import healthOpportunityImage from "../assets/img/Projects/Health/health_oppor.png";
import health1 from "../assets/img/Projects/Health/health_1.png";
import health2 from "../assets/img/Projects/Health/health_2.png";
import health3 from "../assets/img/Projects/Health/health_3.png";
import health4 from "../assets/img/Projects/Health/health_4.png";

import handModular from "../assets/img/Projects/modulAR/handModular.mp4";
import modularOpportunity from "../assets/img/Projects/modulAR/modular_Oppor.png";
import modular1 from "../assets/img/Projects/modulAR/modular1.png";
import modular2 from "../assets/img/Projects/modulAR/modular2.png";
import modular3 from "../assets/img/Projects/modulAR/modular3.png";
import modular4 from "../assets/img/Projects/modulAR/modular4.png";

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
    /** Web, PDF o repo del proyecto. Si es null, no se muestra el botón. */
    externalUrl: string | null;
    opportunityIcons: [CaseIconName, CaseIconName, CaseIconName];
    impactIcons: [CaseIconName, CaseIconName, CaseIconName];
};

export const PROJECTS: ProjectDefinition[] = [
    {
        key: "healthcare",
        slug: "/healthcare",
        section: "items",
        cardId: "ProyectA",
        images: [health1, health2, health3, health4],
        hero: { type: "hand", videoSrc: handHealth },
        opportunityImage: healthOpportunityImage,
        externalUrl: "https://addinformatica.com/",
        opportunityIcons: ["search", "layers", "check"],
        impactIcons: ["mobile", "clock", "spark"],
    },
    {
        key: "modular",
        slug: "/modulAR",
        section: "items",
        cardId: "ProyectB",
        images: [modular1, modular2, modular3, modular4],
        hero: { type: "hand", videoSrc: handModular },
        opportunityImage: modularOpportunity,
        externalUrl: "https://drive.google.com/file/d/11xp-0XL6avpjykezN0eSKZbl05MKdB-M/view",
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
        externalUrl: null,
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
        externalUrl: null,
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
        externalUrl: null,
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
        externalUrl: null,
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
        externalUrl: null,
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
        externalUrl: null,
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

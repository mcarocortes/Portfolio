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
    | "menta"
    | "mimi"
    | "vinos"
    | "packaging"
    | "catamaran";

export type ProjectCatalogSection = "items" | "beyond";

export type ProjectCaseRoute = {
    key: ProjectCaseKey;
    slug: string;
};

/**
 * Un proyecto = una entrada.
 * Textos ES/EN viven en locales; aquí solo datos que no se traducen.
 * Imágenes y vídeos viven en projectMedia.ts y solo se cargan al abrir el proyecto.
 * `cardId` es la clase CSS del carrusel (ProyectA, ProyectB…).
 */
export type ProjectDefinition = {
    key: ProjectCaseKey;
    slug: string;
    section: ProjectCatalogSection;
    cardId: string;
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
        externalUrl: "https://addinformatica.com/",
        opportunityIcons: ["search", "layers", "check"],
        impactIcons: ["mobile", "clock", "spark"],
    },
    {
        key: "modular",
        slug: "/modulAR",
        section: "items",
        cardId: "ProyectB",
        externalUrl: "https://drive.google.com/file/d/11xp-0XL6avpjykezN0eSKZbl05MKdB-M/view",
        opportunityIcons: ["search", "layers", "check"],
        impactIcons: ["spark", "users", "target"],
    },
    {
        key: "vc",
        slug: "/Vc",
        section: "items",
        cardId: "ProyectC",
        externalUrl: "https://www.psicologiaymediacion.com/",
        opportunityIcons: ["heart", "palette", "check"],
        impactIcons: ["shield", "heart", "users"],
    },
    {
        key: "menta",
        slug: "/Menta",
        section: "items",
        cardId: "ProyectD",
        externalUrl: "https://mcarocortes.github.io/Menta-Front/",
        opportunityIcons: ["chart", "layers", "check"],
        impactIcons: ["chart", "target", "code"],
    },
    {
        key: "mimi",
        slug: "/Mimi",
        section: "items",
        cardId: "ProyectE",
        externalUrl: "https://mcarocortes.github.io/Mimi-AI/",
        opportunityIcons: ["chat", "spark", "check"],
        impactIcons: ["spark", "chat", "code"],
    },
    {
        key: "vinos",
        slug: "/Vinos",
        section: "items",
        cardId: "ProyectF",
        externalUrl: null,
        opportunityIcons: ["palette", "heart", "check"],
        impactIcons: ["palette", "target", "heart"],
    },
    {
        key: "packaging",
        slug: "/Design",
        section: "beyond",
        cardId: "ProyectG",
        externalUrl: null,
        opportunityIcons: ["box", "palette", "check"],
        impactIcons: ["box", "target", "spark"],
    },
    {
        key: "catamaran",
        slug: "/Catamaran",
        section: "beyond",
        cardId: "ProyectH",
        externalUrl: "https://wiki-ead.b-cdn.net/images/7/78/UCD6134_01.pdf",
        opportunityIcons: ["waves", "search", "check"],
        impactIcons: ["waves", "users", "spark"],
    },
];

/** Ocultos por ahora. Quitar la clave para volver a publicarlos. */
const HIDDEN_PROJECTS = new Set<ProjectCaseKey>(["vinos"]);

export const VISIBLE_PROJECTS = PROJECTS.filter((project) => !HIDDEN_PROJECTS.has(project.key));

export const PROJECTS_ITEMS = VISIBLE_PROJECTS.filter((project) => project.section === "items");
export const PROJECTS_BEYOND = VISIBLE_PROJECTS.filter((project) => project.section === "beyond");

/** Orden de navegación prev/next (el del catálogo). */
export const PROJECT_CASE_ORDER: ProjectCaseRoute[] = VISIBLE_PROJECTS.map(({ key, slug }) => ({
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
    const index = VISIBLE_PROJECTS.findIndex((project) => project.slug === slug);

    if (index === -1) {
        return { prev: null, next: null, index: -1 };
    }

    const toRoute = (project: ProjectDefinition): ProjectCaseRoute => ({
        key: project.key,
        slug: project.slug,
    });

    return {
        prev: index > 0 ? toRoute(VISIBLE_PROJECTS[index - 1]) : null,
        next: index < VISIBLE_PROJECTS.length - 1 ? toRoute(VISIBLE_PROJECTS[index + 1]) : null,
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

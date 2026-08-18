import projectPreviewVideo from "../assets/img/HandProjects/video.mp4";

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

/** Sección i18n en projectsSection (items = dev, beyond = beyond code). */
export const PROJECT_CATALOG_SECTION: Record<ProjectCaseKey, ProjectCatalogSection> = {
    healthcare: "items",
    modular: "items",
    vc: "items",
    bank: "items",
    movies: "items",
    vinos: "items",
    packaging: "beyond",
    catamaran: "beyond",
};

/** Orden de navegación prev/next (mismo que el carrusel de Projects). */
export const PROJECT_CASE_ORDER: ProjectCaseRoute[] = [
    { key: "healthcare", slug: "/healthcare" },
    { key: "modular", slug: "/modulAR" },
    { key: "vc", slug: "/Vc" },
    { key: "bank", slug: "/Bank" },
    { key: "movies", slug: "/Movies" },
    { key: "vinos", slug: "/Vinos" },
    { key: "packaging", slug: "/Design" },
    { key: "catamaran", slug: "/Catamaran" },
];

/**
 * Rutas de imagen por proyecto. `null` = placeholder (reemplazar luego).
 * Ejemplo: healthcare: ["/Portfolio/img/healthcare-01.jpg", null, ...]
 */
export const PROJECT_IMAGE_SOURCES: Record<ProjectCaseKey, (string | null)[]> = {
    healthcare: [null, null, null, null],
    modular: [null, null, null, null],
    vc: [null, null, null, null],
    bank: [null, null, null, null],
    movies: [null, null, null, null],
    vinos: [null, null, null, null],
    packaging: [null, null, null, null],
    catamaran: [null, null, null, null],
};

/** Hero del case study: mockup Hand + vídeo, o imagen estática (Beyond Code). */
export type ProjectHeroMedia =
    | { type: "hand"; videoSrc: string | null }
    | { type: "image"; src: string | null };

export const PROJECT_HERO_MEDIA: Record<ProjectCaseKey, ProjectHeroMedia> = {
    healthcare: { type: "hand", videoSrc: projectPreviewVideo },
    modular: { type: "hand", videoSrc: null },
    vc: { type: "hand", videoSrc: null },
    bank: { type: "hand", videoSrc: null },
    movies: { type: "hand", videoSrc: null },
    vinos: { type: "hand", videoSrc: null },
    packaging: { type: "image", src: null },
    catamaran: { type: "image", src: null },
};

/**
 * Imagen grande bajo las cajas de oportunidades (`.img_oportunities`).
 * Importa el asset aquí o usa ruta public. `null` = placeholder.
 */
export const PROJECT_OPPORTUNITY_IMAGES: Record<ProjectCaseKey, string | null> = {
    healthcare: null,
    modular: null,
    vc: null,
    bank: null,
    movies: null,
    vinos: null,
    packaging: null,
    catamaran: null,
};

export function getProjectCatalogPath(key: ProjectCaseKey) {
    const section = PROJECT_CATALOG_SECTION[key];
    return `projectsSection.${section}.${key}`;
}

export function getProjectNeighbors(slug: string) {
    const index = PROJECT_CASE_ORDER.findIndex((project) => project.slug === slug);

    if (index === -1) {
        return { prev: null, next: null, index: -1 };
    }

    return {
        prev: index > 0 ? PROJECT_CASE_ORDER[index - 1] : null,
        next: index < PROJECT_CASE_ORDER.length - 1 ? PROJECT_CASE_ORDER[index + 1] : null,
        index,
    };
}

export function getProjectRoute(key: ProjectCaseKey) {
    return PROJECT_CASE_ORDER.find((project) => project.key === key);
}

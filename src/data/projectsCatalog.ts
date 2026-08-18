export type ProjectCaseKey =
    | "healthcare"
    | "modular"
    | "vc"
    | "bank"
    | "movies"
    | "vinos";

export type ProjectCaseRoute = {
    key: ProjectCaseKey;
    slug: string;
};

/** Orden de navegación prev/next (mismo que el carrusel de Projects). */
export const PROJECT_CASE_ORDER: ProjectCaseRoute[] = [
    { key: "healthcare", slug: "/healthcare" },
    { key: "modular", slug: "/modulAR" },
    { key: "vc", slug: "/Vc" },
    { key: "bank", slug: "/Bank" },
    { key: "movies", slug: "/Movies" },
    { key: "vinos", slug: "/Vinos" },
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
};

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

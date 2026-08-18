import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

const SCROLL_DURATION = 1.35;

export function setLenisInstance(instance: Lenis | null) {
    lenisInstance = instance;
}

/** Como un refresh: salta al top sin animación (cambios de ruta). */
export function resetScrollInstant() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (!lenisInstance) return;

    lenisInstance.scrollTo(0, { immediate: true, force: true });
    lenisInstance.resize();
    lenisInstance.scrollTo(0, { immediate: true, force: true });
}

export function scrollToTop() {
    if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: SCROLL_DURATION });
        return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToHash(hash: string) {
    if (!hash || hash === "#" || hash === "#Home") {
        scrollToTop();
        return;
    }

    const target = document.querySelector(hash);
    if (!target) return;

    if (lenisInstance) {
        lenisInstance.scrollTo(target as HTMLElement, { duration: SCROLL_DURATION });
        return;
    }

    target.scrollIntoView({ behavior: "smooth" });
}

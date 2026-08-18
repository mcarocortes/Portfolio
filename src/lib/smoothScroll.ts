import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

const SCROLL_DURATION = 1.35;

export function setLenisInstance(instance: Lenis | null) {
    lenisInstance = instance;
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
        lenisInstance.scrollTo(target, { duration: SCROLL_DURATION });
        return;
    }

    target.scrollIntoView({ behavior: "smooth" });
}

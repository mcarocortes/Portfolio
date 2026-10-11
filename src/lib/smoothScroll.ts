import type Lenis from "lenis";
import type { MouseEvent } from "react";

let lenisInstance: Lenis | null = null;

const SCROLL_DURATION = 1.3;
const HASH_RETRY_MS = 3000;

let suppressActiveSectionUntil = 0;

export function setLenisInstance(instance: Lenis | null) {
    lenisInstance = instance;
}

export function getLenisInstance() {
    return lenisInstance;
}

export function shouldSuppressActiveSectionUpdate() {
    return performance.now() < suppressActiveSectionUntil;
}

function markProgrammaticScroll(durationMs = SCROLL_DURATION * 1000 + 500) {
    suppressActiveSectionUntil = performance.now() + durationMs;
}

/** Como un refresh: salta al top sin animación (cambios de ruta). */
export function resetScrollInstant() {
    markProgrammaticScroll();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (!lenisInstance) return;

    lenisInstance.scrollTo(0, { immediate: true, force: true });
    lenisInstance.resize();
    lenisInstance.scrollTo(0, { immediate: true, force: true });
}

export function scrollToTop() {
    markProgrammaticScroll();

    if (lenisInstance) {
        lenisInstance.resize();
        const nativeTop = window.scrollY || document.documentElement.scrollTop || 0;
        if (Math.abs(lenisInstance.animatedScroll - nativeTop) > 1) {
            lenisInstance.scrollTo(nativeTop, { immediate: true, force: true });
        }
        lenisInstance.scrollTo(0, { duration: SCROLL_DURATION, force: true });
        return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToHash(hash: string, options?: { immediate?: boolean }) {
    if (!hash || hash === "#" || hash === "#Home") {
        if (options?.immediate) {
            resetScrollInstant();
            return;
        }
        scrollToTop();
        return;
    }

    const immediate = options?.immediate === true;
    markProgrammaticScroll(immediate ? 80 : SCROLL_DURATION * 1000 + 500);
    const startedAt = performance.now();

    const attempt = () => {
        const target = document.querySelector(hash);

        if (target) {
            if (lenisInstance) {
                lenisInstance.resize();
                lenisInstance.scrollTo(target as HTMLElement, {
                    duration: immediate ? 0 : SCROLL_DURATION,
                    immediate,
                    force: true,
                });
            } else {
                target.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
            }

            if (immediate) {
                requestAnimationFrame(() => {
                    suppressActiveSectionUntil = 0;
                    window.dispatchEvent(new Event("lenis-scroll"));
                });
            }
            return;
        }

        if (performance.now() - startedAt < HASH_RETRY_MS) {
            requestAnimationFrame(attempt);
        }
    };

    attempt();
}

/** En home: scroll directo. Fuera de home: deja que el Link navegue a /#sección. */
export function handleSectionLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    hash: string,
    pathname: string,
    beforeNavigate?: () => void
) {
    beforeNavigate?.();

    if (pathname !== "/") return;

    event.preventDefault();
    window.history.replaceState(null, "", hash);
    scrollToHash(hash);
}

import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetScrollInstant } from "./lib/smoothScroll";

/**
 * Al cambiar de ruta, deja el scroll arriba al instante (como un refresh).
 * Si vuelves a Home con hash (p. ej. /#Projects), lo deja a ScrollToHash.
 */
export default function ScrollToTopOnNavigate() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (pathname === "/" && hash) return;
        if (pathname !== "/" && hash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        resetScrollInstant();
    }, [pathname, hash]);

    // Refuerzo tras el layout: Lenis recalcula altura cuando cambia el DOM.
    useEffect(() => {
        if (pathname === "/" && hash) return;

        const frame = requestAnimationFrame(() => {
            resetScrollInstant();
        });

        return () => cancelAnimationFrame(frame);
    }, [pathname, hash]);

    return null;
}

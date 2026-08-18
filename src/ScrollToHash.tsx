import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "./lib/smoothScroll";

export default function ScrollToHash() {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (pathname !== "/" || !hash) return;

        scrollToHash(hash);

        // Refuerzo: la landing tarda en montar todas las secciones.
        const retry = window.setTimeout(() => scrollToHash(hash), 150);
        const retryLate = window.setTimeout(() => scrollToHash(hash), 500);

        return () => {
            window.clearTimeout(retry);
            window.clearTimeout(retryLate);
        };
    }, [hash, pathname]);

    return null;
}

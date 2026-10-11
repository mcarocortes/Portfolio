import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "./lib/smoothScroll";

export default function ScrollToHash({ enabled = true }: { enabled?: boolean }) {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (!enabled || pathname !== "/" || !hash) return;

        const go = () => scrollToHash(hash, { immediate: true });
        go();

        // Refuerzo: la landing tarda en montar todas las secciones.
        const retry = window.setTimeout(go, 150);
        const retryLate = window.setTimeout(go, 500);

        return () => {
            window.clearTimeout(retry);
            window.clearTimeout(retryLate);
        };
    }, [enabled, hash, pathname]);

    return null;
}

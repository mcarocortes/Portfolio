import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "./lib/smoothScroll";

export default function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            scrollToHash(hash);
        }
    }, [hash]);

    return null;
}

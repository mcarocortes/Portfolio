import { useEffect, useRef, useState } from "react";

const NAV_IDS = ["Home", "About", "Projects", "Evolution", "WhatIDo", "Contact"];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("Home");
  const currentRef = useRef("Home");

  useEffect(() => {
    const handleScroll = () => {
      // ── 1) Home: arriba del todo ──
      if (window.scrollY < window.innerHeight * 0.35) {
        if (currentRef.current !== "Home") {
          currentRef.current = "Home";
          setActiveSection("Home");
          window.history.replaceState(null, "", "#Home");
        }
        return;
      }

      // ── 2) Resto: la sección con más área visible ──
      let bestId = "";
      let bestVisible = 0;

      NAV_IDS.forEach((id) => {
        if (id === "Home") return;

        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const visible =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visible > bestVisible) {
          bestVisible = visible;
          bestId = id;
        }
      });

      if (bestId && bestId !== currentRef.current) {
        currentRef.current = bestId;
        setActiveSection(bestId);
        window.history.replaceState(null, "", `#${bestId}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleScroll as EventListener);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleScroll as EventListener);
    };
  }, []);

  return activeSection;
}
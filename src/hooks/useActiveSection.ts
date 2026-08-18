import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { shouldSuppressActiveSectionUpdate } from "../lib/smoothScroll";

const NAV_IDS = ["Home", "About", "Projects", "Evolution", "WhatIDo", "Contact"];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("Home");
  const currentRef = useRef("Home");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("Home");
      currentRef.current = "Home";
      return;
    }

    const handleScroll = () => {
      if (shouldSuppressActiveSectionUpdate()) return;

      if (window.scrollY < window.innerHeight * 0.35) {
        if (currentRef.current !== "Home") {
          currentRef.current = "Home";
          setActiveSection("Home");
          window.history.replaceState(null, "", "#Home");
        }
        return;
      }

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
  }, [pathname]);

  return activeSection;
}

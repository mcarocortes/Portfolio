import { useEffect, useState } from "react";
import {
  getProjectsEntranceFade,
  PROJECTS_PANEL_SELECTOR,
} from "../lib/projectsEntranceFade";

/** Fade 0→1 sincronizado con la entrada del panel sticky de Projects. */
export default function useProjectsEntranceFade() {
  const [fade, setFade] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const panel = document.querySelector(PROJECTS_PANEL_SELECTOR) as HTMLElement | null;
      if (!panel) return;

      setFade(getProjectsEntranceFade(panel.getBoundingClientRect().top, window.innerHeight));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis-scroll", onScroll as EventListener);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis-scroll", onScroll as EventListener);
    };
  }, []);

  return fade;
}

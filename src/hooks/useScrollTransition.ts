import { useEffect, useState } from "react";
import { scrollTransition } from "../lib/scrollTransitionState";

/** Cuántas pantallas de scroll dura la transición completa (0 → 1) */
export const SCROLL_VIEWPORTS = 2.8;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

/** Curva suave sin acelerón brusco al final */
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function useScrollTransition() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const raw = scrollY / (viewport * SCROLL_VIEWPORTS);
      setProgress(clamp(raw));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fases más separadas y solapadas para transición prolongada */
  const act1 = smoothstep(clamp(progress / 0.28));
  const act2 = smoothstep(clamp((progress - 0.18) / 0.28));
  const act3 = smoothstep(clamp((progress - 0.42) / 0.32));
  const act4 = smoothstep(clamp((progress - 0.68) / 0.32));

  scrollTransition.act1 = act1;
  scrollTransition.act2 = act2;
  scrollTransition.act3 = act3;
  scrollTransition.act4 = act4;

  return { progress, act1, act2, act3, act4 };
}

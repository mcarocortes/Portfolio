import { useEffect } from "react";
import {
  publishScrollTransition,
  scrollTransition,
} from "../lib/scrollTransitionState";

/** Cuántas pantallas de scroll dura la transición completa (0 → 1) */
export const SCROLL_VIEWPORTS = 2.35;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

/** Curva suave sin acelerón brusco al final */
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function useScrollTransition() {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const viewport = window.innerHeight || 1;
      const progress = clamp(window.scrollY / (viewport * SCROLL_VIEWPORTS));
      const act1 = smoothstep(clamp((progress - 0.08) / 0.32));
      const act2 = smoothstep(clamp((progress - 0.18) / 0.46));
      const act3 = smoothstep(clamp((progress - 0.58) / 0.26));
      const act4 = smoothstep(clamp((progress - 0.8) / 0.2));

      scrollTransition.act1 = act1;
      scrollTransition.act2 = act2;
      scrollTransition.act3 = act3;
      scrollTransition.act4 = act4;

      publishScrollTransition({ progress, act1, act2, act3, act4 });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

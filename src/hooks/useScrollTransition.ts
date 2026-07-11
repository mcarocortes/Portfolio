import { useEffect, useState } from "react";
import { scrollTransition } from "../lib/scrollTransitionState";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export default function useScrollTransition() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const raw = scrollY / (viewport * 1.2);
      setProgress(easeOutCubic(clamp(raw)));
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

  const act1 = easeOutCubic(clamp(progress / 0.3));
  const act2 = easeOutCubic(clamp((progress - 0.25) / 0.3));
  const act3 = easeOutCubic(clamp((progress - 0.5) / 0.3));
  const act4 = easeOutCubic(clamp((progress - 0.75) / 0.25));

  scrollTransition.act1 = act1;
  scrollTransition.act2 = act2;
  scrollTransition.act3 = act3;
  scrollTransition.act4 = act4;

  return { progress, act1, act2, act3, act4 };
}

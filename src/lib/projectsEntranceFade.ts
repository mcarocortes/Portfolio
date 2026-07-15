function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * Progreso 0→1 mientras el panel de Projects sube desde About.
 * Usa `.wrapperA` (sticky 100vh) como referencia visual.
 */
export function getProjectsEntranceFade(panelTop: number, viewportHeight: number) {
  const fadeStart = viewportHeight * 1.35;
  const fadeEnd = viewportHeight * -0.12;
  const raw = (fadeStart - panelTop) / (fadeStart - fadeEnd);
  return smoothstep(clamp(raw));
}

export const PROJECTS_PANEL_SELECTOR = "#Projects .wrapperA";

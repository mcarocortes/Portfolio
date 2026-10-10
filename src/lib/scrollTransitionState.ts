/** Valores de transición leídos en useFrame sin provocar un render de React. */
export const scrollTransition = {
  act1: 0,
  act2: 0,
  act3: 0,
  act4: 0,
};

export type ScrollTransitionSnapshot = {
  progress: number;
  act1: number;
  act2: number;
  act3: number;
  act4: number;
};

let snapshot: ScrollTransitionSnapshot = {
  progress: 0,
  act1: 0,
  act2: 0,
  act3: 0,
  act4: 0,
};

const listeners = new Set<() => void>();

export function subscribeScrollTransition(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getScrollTransitionSnapshot() {
  return snapshot;
}

/** Solo avisa a Hero y About. El resto de la página no se vuelve a pintar. */
export function publishScrollTransition(next: ScrollTransitionSnapshot) {
  if (
    Math.abs(next.progress - snapshot.progress) < 0.001 &&
    Math.abs(next.act1 - snapshot.act1) < 0.001 &&
    Math.abs(next.act2 - snapshot.act2) < 0.001 &&
    Math.abs(next.act3 - snapshot.act3) < 0.001 &&
    Math.abs(next.act4 - snapshot.act4) < 0.001
  ) {
    return;
  }

  snapshot = next;
  listeners.forEach((listener) => listener());
}

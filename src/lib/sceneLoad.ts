type SceneLoadState = {
  progress: number;
  active: boolean;
  failed: boolean;
  ready: boolean;
};

let state: SceneLoadState = {
  progress: 0,
  active: false,
  failed: false,
  ready: false,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function publishAssetProgress(progress: number, active: boolean, failed: boolean) {
  const nextProgress = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
  const nextFailed = state.failed || failed;

  if (
    state.progress === nextProgress &&
    state.active === active &&
    state.failed === nextFailed
  ) {
    return;
  }

  state = {
    ...state,
    progress: nextProgress,
    active,
    failed: nextFailed,
  };
  emit();
}

export function markSceneReady() {
  if (state.ready) return;
  state = { ...state, ready: true, active: false, progress: 100 };
  emit();
}

export function subscribeSceneLoad(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSceneLoad() {
  return state;
}

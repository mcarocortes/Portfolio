import { useSyncExternalStore } from "react";
import useScrollTransition from "../hooks/useScrollTransition";
import {
  getScrollTransitionSnapshot,
  subscribeScrollTransition,
} from "../lib/scrollTransitionState";

export function ScrollTransitionProvider({ children }: { children: React.ReactNode }) {
  useScrollTransition();
  return children;
}

export function useScrollTransitionContext() {
  return useSyncExternalStore(
    subscribeScrollTransition,
    getScrollTransitionSnapshot,
    getScrollTransitionSnapshot
  );
}

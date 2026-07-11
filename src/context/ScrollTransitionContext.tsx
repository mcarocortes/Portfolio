import { createContext, useContext } from "react";
import useScrollTransition from "../hooks/useScrollTransition";

type ScrollTransitionValue = ReturnType<typeof useScrollTransition>;

const ScrollTransitionContext = createContext<ScrollTransitionValue | null>(null);

export function ScrollTransitionProvider({ children }: { children: React.ReactNode }) {
  const value = useScrollTransition();

  return (
    <ScrollTransitionContext.Provider value={value}>
      {children}
    </ScrollTransitionContext.Provider>
  );
}

export function useScrollTransitionContext() {
  const ctx = useContext(ScrollTransitionContext);

  if (!ctx) {
    throw new Error("useScrollTransitionContext debe usarse dentro de ScrollTransitionProvider");
  }

  return ctx;
}

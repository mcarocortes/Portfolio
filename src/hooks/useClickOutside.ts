import { useEffect } from "react";
import type { RefObject } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  enabled: boolean = true
) {

  useEffect(() => {

    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {

      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        callback();
      }

    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);

  }, [ref, callback, enabled]);

}
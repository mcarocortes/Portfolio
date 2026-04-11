import { useRef } from "react";
import "./AccessibilityPanel.css";

import useClickOutside from "../../hooks/useClickOutside"
import useDarkMode from "../../hooks/useDarkMode";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  variant?: "desktop" | "mobile",
  hidden?: boolean
}

export default function AccessibilityPanel({ open, setOpen, variant = "desktop", hidden }: Props) {

  const panelRef = useRef<HTMLDivElement>(null);

  /*Hooks */
  useClickOutside(panelRef, () => setOpen(false), open);
  const { darkMode, toggleDarkMode } = useDarkMode();


  /* Increase/Decrease Size-font */
  const increaseText = () => {
    document.documentElement.style.fontSize = "20px";
  };

  const decreaseText = () => {
    document.documentElement.style.fontSize = "14px";
  };

  const defaultText = () => {
    document.documentElement.style.fontSize = "18px";
  };

  if (!open) return null;

  return (
    <div
      className={`accessibility-panel ${variant} ${hidden ? "navbar-hidden" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >

      <div className="d-flex justify-content-between mb-3">
        <p>ACCESSIBILITY</p>

        {variant === "desktop" && (
          <button
            className="btn-close"
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      <div className="mb-3">

        <label>Dark mode</label>

        <div className="form-check form-switch">

          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />

        </div>

      </div>

      <div>

        <div className="d-flex">
          <label>Text size |</label>
          <button className="defaultText" onClick={defaultText}>
            Default text
          </button>
        </div>

        <div>

          <button
            className="btn btn-outline-secondary me-2"
            onClick={decreaseText}
          >
            A−
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={increaseText}
          >
            A+
          </button>

        </div>

      </div>

    </div>
  );
}
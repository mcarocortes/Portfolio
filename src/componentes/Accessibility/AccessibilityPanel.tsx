import { useEffect, useRef, useState } from "react";
import "./AccessibilityPanel.css";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  variant?: "desktop" | "mobile",
  hidden?: boolean
}

export default function AccessibilityPanel({ open, setOpen, variant = "desktop", hidden }: Props) {

  const panelRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  /* Set DarkMode */
  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    document.body.classList.toggle("dark-mode");

    localStorage.setItem("darkMode", String(newMode));
  };


  useEffect(() => {

    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

  }, []);


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


  /* Handle Click Outside Menu */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {

      if (!panelRef.current) return;

      const target = event.target as Node;

      if (panelRef.current.contains(target)) return;

      setOpen(false);

    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, setOpen]);


  if (!open) return null;

  return (
    <div
      ref={panelRef}
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
import { useEffect, useRef, useState } from "react";
import "./Accessibility.css";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AccessibilityPanel({ open, setOpen }: Props) {

  const panelRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    document.body.classList.toggle("dark-mode");

    localStorage.setItem("darkMode", String(newMode));
  };

  const increaseText = () => {
    document.documentElement.style.fontSize = "20px";
  };

  const decreaseText = () => {
    document.documentElement.style.fontSize = "14px";
  };

  const defaultText = () => {
    document.documentElement.style.fontSize = "18px";
  };

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [setOpen]);

  useEffect(() => {

    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

  }, []);

  if (!open) return null;

  return (
    <div ref={panelRef} className="accessibility-panel">

      <div className="d-flex justify-content-between mb-3">
        <p>ACCESSIBILITY</p>

        <button
          className="btn-close"
          onClick={() => setOpen(false)}
        ></button>
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
import { useState, useRef, useEffect } from "react";
import "./Accessibility.css";

const AccessibilityPanel = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setOpen(!open);
  };

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
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setOpen(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  const saved = localStorage.getItem("darkMode");

  if (saved === "true") {
    setDarkMode(true);
    document.body.classList.add("dark-mode");
  }
}, []);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        className="navbartext accessibility-button"
        onClick={togglePanel}
      >
        <i className="bi bi-universal-access"></i>
      </button>

      {/* PANEL */}
      {open && (
        <div ref={panelRef} className="accessibility-panel">

          <div className="d-flex justify-content-between mb-3">
            <p>ACCESSIBILITY</p>
            <button
              className="btn-close"
              onClick={togglePanel}
            ></button>
          </div>

          {/* DARK MODE */}
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

          {/* TEXT SIZE */}
          <div>
            <div className="d-flex">
              <label>Text size |</label> 
              <button className="defaultText" onClick={defaultText} >Default text</button> 
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
      )}
    </>
  );
};

export default AccessibilityPanel;
import { useEffect, useState } from "react";

export default function useDarkMode() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

  }, []);

  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    document.body.classList.toggle("dark-mode");

    localStorage.setItem("darkMode", String(newMode));

  };

  return { darkMode, toggleDarkMode };

}
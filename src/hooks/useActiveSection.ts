import { useEffect, useState } from "react";

export default function useActiveSection() {

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {

    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {

      let currentSection = "";

      sections.forEach((section) => {

        const rect = section.getBoundingClientRect();

        if (rect.top <= 120) {
          currentSection = section.id;
        }

      });

      if (currentSection) {

        setActiveSection(currentSection);

        window.history.replaceState(null, "", `#${currentSection}`);

      }

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return activeSection;

}
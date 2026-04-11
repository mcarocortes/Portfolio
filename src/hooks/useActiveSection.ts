import { useEffect, useState } from "react";

export default function useActiveSection() {

  const [activeSection, setActiveSection] = useState(""); //Link Activo

  useEffect(() => {

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });

      },
      {
        rootMargin: "-40% 0px -40% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();

  }, []);

  return activeSection;

}
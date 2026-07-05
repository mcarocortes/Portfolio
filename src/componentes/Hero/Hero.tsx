import { useEffect, useState } from "react";
import './Hero.css'
import logoLigth from './../../assets/img/Hero/MacarenaCaroLogo.svg'
import logoDarkmode from './../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg'
import HeroParticles from './HeroParticles';
import HeroArcs from './HeroArcs';
import { useTranslation } from "react-i18next";


export default function Hero() {

  /*HOOKS */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const { t } = useTranslation();
  

  useEffect(() => {

    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();

  }, []);

  const logo = darkMode ? logoDarkmode : logoLigth;

  return (
    <section id="Home" className="hero-wrapper">
      <div className="hero-section">
        <HeroArcs />
        <div className='hero-particles'>
          <HeroParticles />
        </div>

        <div className='content-hero'>
          <img src={logo} loading="lazy" alt="Macarena Caro" />
          <h1>{t("designingIntelligent")}</h1>
          <h3>{t("combiningCreativity")}</h3>
        </div>
      </div>
      <div className='distance'></div>
    </section>
  );
}
import { useEffect, useState } from "react";
import './Hero.css'
import logoLigth from './../../assets/img/Hero/MacarenaCaroLogo.svg'
import logoDarkmode from './../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg'
import HeroParticles from './HeroParticles';

export default function Hero() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

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

        <div className='hero-particles'>
          <HeroParticles />
        </div>

        <div className='content-hero'>
          <img src={logo} loading="lazy" alt="Macarena Caro" />
          <h1>Creative Designer and Developer</h1>
          <h3>I build designs that solve problems, inspire actions, and drive success</h3>
        </div>

      </div>

      <div className='distance'></div>
    </section>
  );
}
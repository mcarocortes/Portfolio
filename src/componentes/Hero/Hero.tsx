import { useEffect, useRef, useState } from "react";

import './Hero.css'

import logoLigth from './../../assets/img/Hero/MacarenaCaroLogo.svg'

import logoDarkmode from './../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg'

import HeroParticles from './HeroParticles';

import HeroArcs from './HeroArcs';

import { useTranslation } from "react-i18next";

import { useScrollTransitionContext } from "../../context/ScrollTransitionContext";





export default function Hero() {



  /*HOOKS */

  const [darkMode, setDarkMode] = useState(

    localStorage.getItem("darkMode") === "true"

  );

  const { t } = useTranslation();

  const { act1, act2 } = useScrollTransitionContext();
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const heroFadeOut = act2 > 0.92 ? Math.min((act2 - 0.92) / 0.08, 1) : 0;



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

    <section

      id="Home"

      className="hero-wrapper"

      style={{

        "--act1": act1,

        "--act2": act2,

        opacity: 1 - heroFadeOut,

        pointerEvents: heroFadeOut > 0.95 ? "none" : "auto",

      } as React.CSSProperties}

    >

      <div ref={heroSectionRef} className="hero-section">

        <HeroArcs />

        <div className='hero-particles'>

          <HeroParticles eventSource={heroSectionRef} />

        </div>



        <div className='content-hero'>

          <img src={logo} loading="lazy" alt="Macarena Caro" />

          <h1>{t("designingIntelligent")}</h1>

          <h3>{t("combiningCreativity")}</h3>

        </div>

      </div>
    </section>

  );

}



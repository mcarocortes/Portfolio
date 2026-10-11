import { lazy, Suspense, useEffect, useRef, useState } from "react";

import './Hero.css'

import logoLigth from './../../assets/img/Hero/MacarenaCaroLogo.svg'

import logoDarkmode from './../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg'

import HeroArcs from './HeroArcs';

import { useTranslation } from "react-i18next";

import { useScrollTransitionContext } from "../../context/ScrollTransitionContext";

const HeroParticles = lazy(() => import("./HeroParticles"));





export default function Hero() {



  /*HOOKS */

  const [darkMode, setDarkMode] = useState(

    localStorage.getItem("darkMode") === "true"

  );

  const { t } = useTranslation();

  const { act1, act2 } = useScrollTransitionContext();
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Desvanecido largo: entra y sale despacio, sin corte.
  const fadeT = Math.min(1, Math.max(0, (act2 - 0.2) / 0.8));
  const heroFadeOut = fadeT * fadeT * (3 - 2 * fadeT);



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

        pointerEvents: heroFadeOut > 0.92 ? "none" : "auto",

      } as React.CSSProperties}

    >

      <div ref={heroSectionRef} className="hero-section">

        <HeroArcs />

        <div className='hero-particles'>

          <Suspense fallback={null}>
            <HeroParticles
              eventSource={heroSectionRef}
              active={
                act2 < 0.98 ||
                document.documentElement.classList.contains("is-preloading")
              }
            />
          </Suspense>

        </div>



        <div className='content-hero'>

          <img src={logo} alt="Macarena Caro" fetchPriority="high" decoding="async" />

          <h1>{t("designingIntelligent")}</h1>

          <h3>{t("combiningCreativity")}</h3>

        </div>

      </div>
    </section>

  );

}



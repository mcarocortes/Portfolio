import Slider from '../Slider/Slider'

import './About.css'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { useScrollTransitionContext } from "../../context/ScrollTransitionContext";


export default function About() {
    const { t } = useTranslation();
    const [projectsFade, setProjectsFade] = React.useState(0);




React.useEffect(() => {
  const projects = document.getElementById("Projects");
  if (!projects) return;

  const update = () => {
    const top = projects.getBoundingClientRect().top;
    const vh = window.innerHeight;

    // ── Zona de fade (ajústala probando) ──
    const fadeStart = vh * 1.02; // Projects asoma por abajo → fade 0
    const fadeEnd   = vh * 0.52; // Projects más arriba → fade 1 (About oculto)

    const t = (fadeStart - top) / (fadeStart - fadeEnd);
    const fade = Math.min(1, Math.max(0, t));

    setProjectsFade(fade);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();

  return () => window.removeEventListener("scroll", update);
}, []);




    /* Intro: visible durante act3, se desvanece al entrar el bloque About */
    const { act3 } = useScrollTransitionContext(); // act4 y progress ya no hacen falta aquí
    const introOpacity = Math.min(1, act3 * 1.2);
    const finalOpacity = introOpacity * (1 - projectsFade);
    const introEnterY = (1 - act3) * 48;


    //Hover divs icons

    type CursorType = "D" | "B" | "C" | null;


    const [cursor, setCursor] = React.useState<{
        visible: boolean;
        x: number;
        y: number;
        type: CursorType;}>
        
        ({ visible: false,
        x: 0,
        y: 0,
        type: null,});



    const handleEnter = (type: CursorType) => () => {
        if (window.innerWidth > 767) {
            setCursor((c) => ({ ...c, visible: true, type }));
        }
    };

    const handleLeave = () =>
        setCursor((c) => ({ ...c, visible: false }));

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 40 },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
    };


    return (
        <>
            <section className="sobremi">
                <div id="About" className="about-anchor" aria-hidden="true" />
                
                <div
                    className="about-intro"
                    style={{
                        opacity: finalOpacity,
                        visibility: finalOpacity < 0.02 ? "hidden" : "visible",
                        pointerEvents: finalOpacity < 0.02 ? "none" : "auto",
                        transform: `translateY(${introEnterY + projectsFade * 24}px)`,
                    }}
                >

                    <motion.div
                        className="w-col about-cards"
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, ease: [0.22, 0, 0.36, 1] }}
                        variants={containerVariants}>

                        {["D", "B", "C"].map((type, i) => (
                            <motion.div
                                key={type}
                                className={`no-cursor exterior ${["uno", "dos", "tres"][i]}`}
                                onMouseEnter={handleEnter(type as CursorType)}
                                onMouseLeave={handleLeave}
                                onMouseMove={handleMove}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                variants={cardVariants}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                            >

                                <div className={`text ${i === 1 ? "cinco" : ""}`}>
                                    {[t("aboutSection.identity"), t("aboutSection.focus"), t("aboutSection.development")][i]}<br />
                                    <span>{[t("aboutSection.visualbrand"), t("aboutSection.interaction"), t("aboutSection.digitalexperiences")][i]}</span>
                                </div>

                                <div className={`sombra ${i === 1 ? "cinco" : ""}`}></div>
                            </motion.div>

                        ))}

                    </motion.div>



                    <motion.div
                        className="w-col about-content"
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={containerVariants}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    >

                        <h1 className="heading">{t("about")}</h1>

                        <p className="pa">
                            {t("aboutSection.description")}
                            <span className='spanDelicated'> {t("aboutSection.highlight")}</span>
                        </p>

                        <button className='btnAbout' onClick={() =>
                            window.location.href =
                            "mailto:m.caro.cortes2@gmail.com?subject=I%20want%20to%20connect!"

                        }> {t("aboutSection.letsTalk")} </button>

                        <div className="signature">
                            <div className="logoSignature"></div>
                            <div className="signatureText">

                                Macarena Caro Cortés<br />
                            </div>
                        </div>
                    </motion.div>
                    {cursor.visible && (<div className={`follow-cursor ${cursor.type}`} style={{ left: cursor.x, top: cursor.y }} />)}
                </div>
                {/*<Slider />*/}
            </section>
        </>
    )



}



import './About.css'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { useScrollTransitionContext } from "../../context/ScrollTransitionContext";
import iconIdentity from '../../assets/img/About/iconBrand.png'
import iconFocus from '../../assets/img/About/iconDesign.png'
import iconDev from '../../assets/img/About/iconInteraction.png'


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
            const fadeStart = vh * 2; // Projects asoma por abajo → fade 0
            const fadeEnd = vh * 0.52; // Projects más arriba → fade 1 (About oculto)

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
    const introOpacity = Math.min(1, act3 * 1.3);
    const finalOpacity = introOpacity * (1.2 - projectsFade);
    const introEnterY = (1 - act3) * 48;

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 40 },
    };


    return (
        <>
            <section className="sobremi">
                <div id="About" className="about-anchor" aria-hidden="true" />

                <div className="about-intro"
                    style={{
                        opacity: finalOpacity,
                        visibility: finalOpacity < 0.02 ? "hidden" : "visible",
                        pointerEvents: finalOpacity < 0.02 ? "none" : "auto",
                        transform: `translateY(${introEnterY + projectsFade * 24}px)`,
                    }}
                >

                    <div className="w-col about-cards">

                        <motion.div
                            className="exterior"
                            animate={
                                introOpacity > 0.25
                                    ? { x: 0 }
                                    : { x: -28 }
                            }
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0 }}
                        >
                            <div className='icon icon--identity'>
                                <img src={iconIdentity} alt="" aria-hidden="true" />
                            </div>
                            <div className='text'>
                                {t("aboutSection.identity")} <br />
                                <span>{t("aboutSection.visualbrand")}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="exterior"
                            animate={
                                introOpacity > 0.25
                                    ? { x: 0 }
                                    : { x: -28 }
                            }
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0 }}
                        >
                            <div className='icon icon--focus'>
                                <img src={iconFocus} alt="" aria-hidden="true" />
                            </div>
                            <div className='text'>
                                {t("aboutSection.focus")} <br />
                                <span>{t("aboutSection.interaction")}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="exterior"
                            animate={
                                introOpacity > 0.25
                                    ? { x: 0 }
                                    : { x: -28 }
                            }
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0 }}
                        >
                            <div className='icon icon--dev'>
                                <img src={iconDev} alt="" aria-hidden="true" />
                            </div>
                            <div className='text'>
                                {t("aboutSection.development")} <br />
                                <span>{t("aboutSection.digitalexperiences")}</span>
                            </div>
                        </motion.div>

                    </div>


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



                        <div className="signature">
                            <div className="logoSignature"></div>
                            <div className="signatureText">
                                Macarena Caro Cortés<br />
                                <span>Front-end Developer</span>
                            </div>
                        </div>
                    </motion.div>


                    <div className='underAbout'>
                        <div className='one'>
                            <p>JavaScript
                                <span> • </span>HTML
                                <span> • </span>React
                            </p>
                        </div>

                        <div className='two'>
                            <p>UI/UX
                                <span> • </span>Figma
                                <span> • </span>Design System
                            </p>
                        </div>

                        <div className='three'>
                            <p>AI
                                <span> • </span>Big Data
                                <span> • </span>Innovation
                            </p>
                        </div>

                    </div>


                </div>
                {/*<Slider />*/}
            </section>
        </>
    )



}



import Slider from '../Slider/Slider'
import './About.css'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { useScrollTransitionContext } from "../../context/ScrollTransitionContext";
import profileLight from '../../assets/img/About/ProfilePicture.png'
import profileDark from '../../assets/img/About/ProfilePicture_darkmode.png'


export default function About() {

    const { t } = useTranslation();
    const { act3, act4, progress } = useScrollTransitionContext();

    const [darkMode, setDarkMode] = React.useState(
        localStorage.getItem("darkMode") === "true"
    );

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setDarkMode(document.body.classList.contains("dark-mode"));
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        });

        return () => observer.disconnect();
    }, []);

    const profilePhoto = darkMode ? profileDark : profileLight;

    const aboutRef = React.useRef<HTMLDivElement | null>(null);

    /* Intro: visible durante act3, se desvanece al entrar el bloque About */
    const aboutSettled = progress >= 0.72 || act4 >= 0.88;
    const introOpacity = aboutSettled ? 0 : act3 * Math.max(0, 1 - act4 * 0.9);
    const showIntro = !aboutSettled && act3 > 0.04;

    /* Bloque About: opaco y nítido cuando la transición avanza lo suficiente */
    const aboutOpacity = aboutSettled ? 1 : Math.min(1, act4 * 1.25);
    const aboutOffset = aboutSettled ? 0 : (1 - act4) * 28;

    //Hover divs icons
    type CursorType = "D" | "B" | "C" | null;

    const [cursor, setCursor] = React.useState<{
        visible: boolean;
        x: number;
        y: number;
        type: CursorType;
    }>({
        visible: false,
        x: 0,
        y: 0,
        type: null,
    });

    const handleEnter = (type: CursorType) => () => {
        if (window.innerWidth > 767) {
            setCursor((c) => ({ ...c, visible: true, type }));
        }
    };

    const handleLeave = () =>
        setCursor((c) => ({ ...c, visible: false }));


    const handleMove = (e: React.MouseEvent<HTMLDivElement>) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));


    const getStartBackgroundX = () => {
        const width = window.innerWidth;
        if (width <= 767) return null;
        if (width <= 991) return 140;
        if (width <= 1280) return -70;
        if (width >= 1281) return 0;
        return 10;
    };

    const getFinalBackgroundX = () => {
        const width = window.innerWidth;
        if (width <= 767) return null;
        if (width <= 991) return -90;
        if (width <= 1280) return -20;
        if (width >= 1281) return 50;
        return 60;
    };

    React.useEffect(() => {
        const startX = getStartBackgroundX();
        const finalX = getFinalBackgroundX();

        if (finalX === null || !aboutRef.current) return;
        if (startX === null || !aboutRef.current) return;

        const handleScroll = () => {
            if (!aboutRef.current) return;

            const rect = aboutRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const scrollProgress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            const eased = easeOutCubic(scrollProgress);
            const x = startX + (finalX - startX) * eased;

            aboutRef.current.style.backgroundPosition = `${x}px bottom`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


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
            <section className="sobremi" id="About">

                {showIntro && (
                    <div
                        className="about-intro"
                        style={{
                            opacity: introOpacity,
                            transform: `translateY(${(1 - act3) * 48}px)`,
                        }}
                        aria-hidden={act4 > 0.6}
                    >
                        <img
                            src={profilePhoto}
                            alt="Macarena Caro"
                            className="about-intro-photo"
                        />
                        <div className="about-intro-text">
                            <h1 className="heading">{t("about")}</h1>
                            <p className="pa">
                                {t("aboutSection.description")}
                                <span className="spanDelicated"> {t("aboutSection.highlight")}</span>
                            </p>
                        </div>
                    </div>
                )}

                <div
                    className={`about about--revealed${aboutSettled ? " about--settled" : ""}`}
                    ref={aboutRef}
                    style={{
                        opacity: aboutOpacity,
                        transform: `translateY(${aboutOffset}px)`,
                        pointerEvents: aboutOpacity > 0.35 ? "auto" : "none",
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
                                    {[t("aboutSection.identity") ,  t("aboutSection.focus"), t("aboutSection.development")][i]}<br />
                                    <span>{[t("aboutSection.visualbrand"),t("aboutSection.interaction"),t("aboutSection.digitalexperiences")][i]}</span>
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

                <Slider />
            </section>
        </>
    )

}

import Slider from '../Slider/Slider'
import './About.css'
import latDer from './../../assets/img/latDer.svg'
import latIzq from './../../assets/img/latIZQ.svg'
import logo from './../../assets/img/mLogoPurple.svg'
import React from 'react'
import { motion } from 'framer-motion'

export default function About() {

    //Hover divs icons
    type CursorType = "A" | "B" | "C" | null;

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

    const handleEnter = (type: CursorType) => () =>
        setCursor((c) => ({ ...c, visible: true, type }));

    const handleLeave = () =>
        setCursor((c) => ({ ...c, visible: false }));


    const handleMove = (e: React.MouseEvent<HTMLDivElement>) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));


    //Background transitions left to rigth
    const getFinalBackgroundX = () => {
        const width = window.innerWidth;
        if (width <= 767) return null; //mobile
        if (width <= 1280) return -10;
        return 60;
    };

    const aboutRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const startX = -50;
        const finalX = getFinalBackgroundX();

        if (finalX === null || !aboutRef.current) return;
        
        const handleScroll = () => {
            if (!aboutRef.current) return;

            const rect = aboutRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            //Slower transition
            const progress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            const eased = easeOutCubic(progress);
            const x = startX + (finalX - startX) * eased;

            aboutRef.current.style.backgroundPosition = `${x}px bottom`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial position

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    //Opacity useEffect onComponent
    const containerVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 80 },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
    };

    return (
        <>
            <section className="sobremi">
                <div className="columnas">
                    <div className="image-Izq">
                        <img src={latIzq} loading="lazy" alt="" />
                    </div>
                    <div className="center"></div>
                    <div className="image-Der">
                        <img src={latDer} loading="lazy" alt="" />
                    </div>
                </div>

                <div id="About" className="about" ref={aboutRef}>
                    <motion.div
                        className="w-col about-cards"
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.22, 0, 0.36, 1] }}
                        variants={containerVariants}
                    >
                        {["A","B","C"].map((type, i) => (
                            <motion.div
                                key={type}
                                className={`exterior ${["uno","dos","tres"][i]}`}
                                onMouseEnter={handleEnter(type as CursorType)}
                                onMouseLeave={handleLeave}
                                onMouseMove={handleMove}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                variants={cardVariants}
                                transition={{ duration: 0.6, delay: i*0.15 }}
                            >
                                <div className='text'>
                                    {["Visual & Brand","Interaction","Enhanced Digital"][i]}<br />
                                    <span>{["Consistency","Design","Experiences"][i]}</span>
                                </div>
                                <div className={`sombra ${i===1?"cinco":""}`}></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="w-col about-content"
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={containerVariants}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15  }}
                    >
                        <h1 className="heading">About</h1>
                        <p className="pa">
                            I'm a <span className="spabout">Web developer</span> and
                            <span className="spabout"> Industrial Designer </span>
                            specialized in <span className="spabout">Artificial Intelligence</span> and
                            <span className="spabout"> Big Data</span>, currently creating digital experiences at Resiplus from Madrid.
                        </p>
                        <button onClick={() =>
                            window.location.href =
                            "mailto:m.caro.cortes2@gmail.com?subject=I%20want%20to%20connect!"
                        }>Let's connect</button>
                        <div className="div-block-5">
                            <img src={logo} loading="lazy" alt="" className="image-3" />
                            <div className="text-block-2">
                                Macarena Caro Cortés<br />
                            </div>
                        </div>
                    </motion.div>

                    {cursor.visible && (
                        <div
                            className={`follow-cursor ${cursor.type}`}
                            style={{ left: cursor.x, top: cursor.y }}
                        />
                    )}

                </div>

                <Slider />
            </section>
        </>
    )

}
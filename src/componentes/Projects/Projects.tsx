
import './Projects.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


export default function Projects() {

    const isMobile = window.innerWidth <= 479;

    const containerVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 80 },
    };

    const projectsData = [
        {
            id: 'ProyectA',
            title: "modulAR",
            subt: "modulAR is a platform for creatives that connects talent, projects, and clients through Augmented Reality, increasing engagement and sales.",
            url: "/modulAR",
            build: [".NET", "Augmented Reality", "MVC", "Web Development"]
        },
        {
            id: 'ProyectB',
            title: "Valezka Cortés",
            subt: "A clean, professional website designed to build trust and make psychological and family mediation services easily accessible.",
            url: "/Vc",
            build: ["Wordpress", "Brand Development", "Web Design", "Psicology"]
        },
        {
            id: 'ProyectC',
            title: "Bank App",
            subt: "An academic banking application developed in C# (.NET), featuring client and branch management with database integration.",
            url: "/Bank",
            build: ["Illustration", ".NET", "WPF", "Web Development"]
        },
        {
            id: 'ProyectD',
            title: "Movies",
            subt: "A React-based movie platform with user accounts, a film catalog, and a custom API developed in .NET.",
            url: "/Movies",
            build: ["Web Design", "API Development", "React", "Azure"]
        },
        {
            id: 'ProyectE',
            title: "Vinos",
            subt: "An elegant WordPress website for a wine bar, focused on minimalism, usability, and online menu exploration",
            url: "/Vinos",
            build: ["Illustration", "Brand Development", "Web Design", "Web Development"]
        },

    ];

    const wrapperRef = useRef<HTMLDivElement>(null);
    const START_AT = 0.3;
    const END_MARGIN = 60;

    useEffect(() => {
        if (window.innerWidth <= 479) return;
        const container = document.querySelector('.containers') as HTMLElement;

        const onScroll = () => {
            if (!wrapperRef.current || !container) return;

            const rect = container.getBoundingClientRect();
            const scrollable = container.offsetHeight - window.innerHeight;

            let progress = Math.min(
                Math.max(-rect.top / scrollable, 0),
                1
            );

            if (progress < START_AT) {
                progress = 0;
            } else {
                progress = (progress - START_AT) / (1 - START_AT);
            }


            const viewportWidth =
                wrapperRef.current.parentElement!.offsetWidth;

            const maxTranslate =
                wrapperRef.current.scrollWidth - viewportWidth + END_MARGIN;

            wrapperRef.current.style.transform =
                `translateX(${-progress * maxTranslate}px)`;
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    return (
        <>
            <div id="Projects" className='page-wrapper'>
                <div className="main-wrapper">

                    <div className="containers">
                        <motion.div className='wrapperA' initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: false, amount: isMobile ? 0.05 : 0.3 }}
                            variants={containerVariants}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0 : 0.15 }}>

                            <div className="descriptionProjects">
                                <h1 className="heading">Projects</h1>
                                <p>Work I'm Proud Of <span><FontAwesomeIcon icon={fas['faHeart']} /></span></p>
                            </div>

                            <div className="wrapperB" ref={wrapperRef} >

                                {projectsData.map((proj) => (
                                    <div key={proj.id} className={`figure ${proj.id}`}>
                                        <Link to={proj.url} className='ProjectNameLink'>{proj.title}</Link>
                                        <div className='descriptionSection'>
                                            <p className='projectDetails'>{proj.subt}</p>
                                            <Link to={proj.url} className="btnLink">
                                                Learn more
                                            </Link>
                                            <div className="buildList">
                                                {proj.build.map((item, index) => (
                                                    <span key={index} className="buildItem">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>





        </>
    )
}

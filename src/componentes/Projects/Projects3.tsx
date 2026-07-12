
import './Projects3.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from "react";


export default function Projects3() {

    const isMobile = window.innerWidth <= 479;

    const containerVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 2 },
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
            build: ["Wordpress", "Brand Development", "Web Design", "Psychologist"]
        },
        {
            id: 'ProyectC',
            title: "Bank App",
            subt: "An academic banking application developed in C# (.NET), featuring client and branch management with database integration.",
            url: "/Bank",
            build: ["Illustration", ".NET", "WPF", "Application Design"]
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
            build: ["Graphic Design", "Brand Development", "Restaurant", "Wordpress"]
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
            <section id="Projects" className='page-wrapper'>
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
                                {/*<p>Work I'm <span>Proud Of <FontAwesomeIcon icon={fas['faHeart']} /></span></p> */}
                            </div>

                            <div className="wrapperB" ref={wrapperRef} >

                                {projectsData.map((proj, index) => (
                                    <div key={proj.id} className={`figura ${proj.id}`}>
                                        {/*<Link to={proj.url} className='ProjectNameLink'>{proj.title}</Link>*/}

                                        <div className='ImgProject'>IMAGEN SECCION</div>
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
                                        {index !== projectsData.length - 1 && (
                                            <div className='continuation'>
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>                                            </div>
                                        )}
                                    </div>

                                ))}

                            </div>
                        </motion.div>
                    </div>

                </div>
                <div className="spacer_myskills"></div>
            </section>
        </>
    )
}

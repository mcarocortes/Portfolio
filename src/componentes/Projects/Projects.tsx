
import './Projects.css'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ProjectsPathHorizontal, ProjectsPathBeyond } from './ProjectsPath';


export default function Projects() {

    const { t } = useTranslation();

    const projectsData = [
        {
            id: 'ProyectA',
            title: "Healthcare Platform (PWA)",
            subt: "Designed and developed new features for a production Progressive Web App used in healthcare facilities, improving mobile usability, performance, and day-to-day workflows.",
            url: "/healthcare",
            build: ["PWA", "Mobile UX/UI", "Responsive Design", "API Integration"]
        },
        {
            id: 'ProyectB',
            title: "modulAR",
            subt: "A multi-service platform that connects artists, clients, and job opportunities through immersive Augmented Reality experiences, increasing engagement and product visibility.",
            url: "/modulAR",
            build: ["ASP.NET Core", (t("projectsSection.augmentedreality")), "MVC", "E-commerce"]
        },
        {
            id: 'ProyectC',
            title: "Valezka Cortés",
            subt: "Designed a trustworthy digital identity and website for a psychology and family mediation practice, focused on accessibility, clarity, and user confidence.",
            url: "/Vc",
            build: ["Branding", "UX/UI", "React", "Web Design"]
        },
        {
            id: 'ProyectD',
            title: "Dashboard moderno React",
            subt: "Para enserñar tecnologías actuales",
            url: "/Bank",
            build: ["React", "TypeScript", "TanStack?", "gráficos¿?"]
        },
        {
            id: 'ProyectE',
            title: "AI Assistant",
            subt: " muestra que trabajas con tecnologías actuales y sabes integrar IA de forma útil.",
            url: "/Movies",
            build: ["Web Design", "API Development", "React", "Azure"]
        },
        {
            id: 'ProyectF',
            title: "Vinos y Sabores",
            subt: "Designed a clean and elegant digital experience for a wine bar, combining branding, usability, and online reservation features.",
            url: "/Vinos",
            build: ["Branding", "UX/UI", "Visual Identity", "Responsive"]
        }
    ];

    const beyond = [
        {
            id: 'ProyectG',
            title: "Packaging Design Collection",
            subt: "Designed commercial packaging for food products, creating cohesive visual identities focused on shelf impact and brand recognition.",
            url: "/Design",
            build: ["Packaging", "Print Design", "Illustrator"]
        },
        {
            id: 'ProyectH',
            title: "Biomimetic Catamaran",
            subt: "Industrial design thesis focused on creating a pedal-powered catamaran inspired by biomimicry principles and user-centered design.",
            url: "/Catamaran",
            build: ["3D Modeling", "Product Design", "Prototyping"]
        }
    ];

    const wrapperRef = useRef<HTMLDivElement>(null);
    const beyondRef = useRef<HTMLDivElement>(null);
    const horizontalPathRef = useRef<SVGPathElement>(null);
    const beyondPathRef = useRef<SVGCircleElement>(null);
    const horizontalLengthRef = useRef(0);
    const beyondLengthRef = useRef(0);

    const START_AT = 0.3;
    const END_MARGIN = 60;

    const setupPath = (path: SVGPathElement | SVGCircleElement | null, lengthRef: { current: number }) => {
        if (!path) return;
        const length = path.getTotalLength();
        lengthRef.current = length;
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
    };

    const drawPath = (
        path: SVGPathElement | SVGCircleElement | null,
        lengthRef: { current: number },
        progress: number
    ) => {
        if (!path || lengthRef.current === 0) return;
        const clamped = Math.min(Math.max(progress, 0), 1);
        path.style.strokeDashoffset = `${lengthRef.current * (1 - clamped)}`;
    };

    useEffect(() => {
        const container = document.querySelector('.containers') as HTMLElement;
        const isDesktop = () => window.innerWidth > 479;

        const initPaths = () => {
            if (!isDesktop()) return;
            setupPath(horizontalPathRef.current, horizontalLengthRef);
            setupPath(beyondPathRef.current, beyondLengthRef);
        };

        initPaths();
        window.addEventListener("resize", initPaths);

        const onScroll = () => {
            if (!isDesktop() || !wrapperRef.current || !container) return;

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

            // Fase 1: línea de tiempo horizontal — sincronizada con el scroll de proyectos
            drawPath(horizontalPathRef.current, horizontalLengthRef, progress);

            // Fase 2: arco Beyond — solo dibujo del trazo, sin fade de opacidad
            const beyondEl = beyondRef.current;
            let beyondProgress = 0;

            if (beyondEl) {
                const beyondRect = beyondEl.getBoundingClientRect();
                const vh = window.innerHeight;
                const travel = Math.max(beyondEl.offsetHeight * 0.88, vh * 0.55);

                beyondProgress = Math.min(
                    Math.max((vh * 0.72 - beyondRect.top) / travel, 0),
                    1
                );
            }

            drawPath(beyondPathRef.current, beyondLengthRef, beyondProgress);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", initPaths);
        };
    }, []);


    return (
        <>
            <section id="Projects" className='page-wrapper'>
                <div className="main-wrapper">

                    <div className="containers">
                        <div className='wrapperA'>

                            <ProjectsPathHorizontal ref={horizontalPathRef} />

                            <div className="descriptionProjects">
                                <h1 className="heading">{t("projects")}</h1>
                            </div>

                            <div className="wrapperB" ref={wrapperRef} >

                                {projectsData.map((proj) => (
                                    <div key={proj.id} className={`figure ${proj.id}`}>
                                        <div className={`figureMedia ${proj.id}`}></div>
                                        <Link to={proj.url} className='ProjectNameHover'></Link>
                                        <Link to={proj.url} className='ProjectNameLink'>{proj.title}</Link>
                                        <div className='descriptionSection'>
                                            <p className='projectDetails'>{proj.subt}</p>
                                            <div className="buildList">
                                                <div className="buildList-tags">
                                                    {proj.build.map((item, index) => (
                                                        <span key={index} className="buildItem">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Link to={proj.url} className="btnArrow">→</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="beyondCode" ref={beyondRef}>
                        <ProjectsPathBeyond ref={beyondPathRef} />
                        <h1 className='heading'>Beyond Code<br></br><span>Design · Branding · Products</span></h1>
                        <div className='beyondSection'>
                            <p>
                                Before transitioning into Front-End development, I worked in <span>product design, branding, and graphic design.</span> This background allows me to approach interfaces not only from a technical perspective but also through user experience, visual communication, and problem-solving.
                            </p>
                        <div className='beyondProjects'>
                            {beyond.map((proj) => (
                                <div key={proj.id} className={`figure ${proj.id}`}>
                                    <div className={`figureMedia ${proj.id}`}></div>
                                    <Link to={proj.url} className='ProjectNameHover'></Link>
                                    <Link to={proj.url} className='ProjectNameLink'>{proj.title}</Link>
                                    <div className='descriptionSection'>
                                        <p className='projectDetails'>{proj.subt}</p>
                                        <div className="buildList">
                                            <div className="buildList-tags">
                                                {proj.build.map((item, index) => (
                                                    <span key={index} className="buildItem">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link to={proj.url} className="btnArrow">→</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

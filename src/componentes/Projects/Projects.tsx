
import './Projects.css'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import useProjectsEntranceFade from "../../hooks/useProjectsEntranceFade";
import { ProjectsPathBeyond } from './ProjectsPath';

type ProjectEntry = {
    id: string;
    url: string;
    title: string;
    subt: string;
    build: string[];
};

const MAIN_PROJECTS = [
    { id: "ProyectA", key: "healthcare", url: "/healthcare" },
    { id: "ProyectB", key: "modular", url: "/modulAR" },
    { id: "ProyectC", key: "vc", url: "/Vc" },
    { id: "ProyectD", key: "bank", url: "/Bank" },
    { id: "ProyectE", key: "movies", url: "/Movies" },
    { id: "ProyectF", key: "vinos", url: "/Vinos" },
] as const;

const BEYOND_PROJECTS = [
    { id: "ProyectG", key: "packaging", url: "/Design" },
    { id: "ProyectH", key: "catamaran", url: "/Catamaran" },
] as const;

function mapProjects(
    entries: readonly { id: string; key: string; url: string }[],
    section: "items" | "beyond",
    t: (key: string, options?: { returnObjects?: boolean }) => string | string[]
): ProjectEntry[] {
    return entries.map(({ id, key, url }) => ({
        id,
        url,
        title: t(`projectsSection.${section}.${key}.title`) as string,
        subt: t(`projectsSection.${section}.${key}.subtitle`) as string,
        build: t(`projectsSection.${section}.${key}.tags`, { returnObjects: true }) as string[],
    }));
}

export default function Projects() {

    const { t, i18n } = useTranslation();
    const projectsFade = useProjectsEntranceFade();
    const enterY = (1 - projectsFade) * 48;

    const projectsData = useMemo(
        () => mapProjects(MAIN_PROJECTS, "items", t),
        [t, i18n.language]
    );

    const beyond = useMemo(
        () => mapProjects(BEYOND_PROJECTS, "beyond", t),
        [t, i18n.language]
    );

    const wrapperRef = useRef<HTMLDivElement>(null);
    const beyondRef = useRef<HTMLDivElement>(null);
    const beyondPathRef = useRef<SVGCircleElement>(null);
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
                <div
                    className="main-wrapper projects-enter"
                    style={{
                        transform: `translateY(${enterY}px)`,
                        opacity: 1,
                        visibility:  "visible",
                        pointerEvents: projectsFade < 0.02 ? "none" : "auto",
                    }}
                >

                    <div className="containers">
                        <div className='wrapperA'>
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
                        <h1 className='heading'>
                            {t("projectsSection.beyondCode.title")}
                            <br />
                            <span>{t("projectsSection.beyondCode.subtitle")}</span>
                        </h1>
                        <div className='beyondSection'>
                            <p>
                                {t("projectsSection.beyondCode.descriptionBefore")}
                                <span>{t("projectsSection.beyondCode.descriptionHighlight")}</span>
                                {t("projectsSection.beyondCode.descriptionAfter")}
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

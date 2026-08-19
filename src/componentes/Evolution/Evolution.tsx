import "./Evolution.css";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EvolutionPath } from "./EvolutionPath";

function clamp(value: number, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

/** Opacidad secuencial: el anterior sale en la 1ª mitad, el nuevo entra en la 2ª — sin solapamiento. */
function getSequentialSlideOpacity(index: number, stepFloat: number): number {
    if (stepFloat <= index - 1) {
        return index === 0 && stepFloat >= 0 ? 1 : 0;
    }

    if (stepFloat <= index) {
        const t = stepFloat - (index - 1);
        if (t <= 0.5) return 0;
        return clamp((t - 0.5) * 2);
    }

    if (stepFloat <= index + 1) {
        const t = stepFloat - index;
        if (t >= 0.5) return 0;
        return clamp(1 - t * 2);
    }

    return 0;
}

const YEAR_SUFFIXES = ["21", "24", "25", "26"] as const;
const STEP_COUNT = YEAR_SUFFIXES.length;
const SCROLL_VH_PER_STEP = 155;

export default function Evolution() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const pathLengthRef = useRef(0);
    const suffixTrackRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const steps = [
        {
            key: "industrial",
            suffix: YEAR_SUFFIXES[0],
            title: t("evolutionSection.steps.industrial.title"),
            subtitle: t("evolutionSection.steps.industrial.subtitle"),
            period: t("evolutionSection.steps.industrial.period"),
            description: t("evolutionSection.steps.industrial.description"),
            years: t("evolutionSection.steps.industrial.years"),
            slogan: t("evolutionSection.steps.industrial.slogan"),
            bgClass: "experience-visual-bg--industrial",
            fgClass: "experience-visual-fg--industrial",

        },
        {
            key: "web",
            suffix: YEAR_SUFFIXES[1],
            title: t("evolutionSection.steps.web.title"),
            subtitle: t("evolutionSection.steps.web.subtitle"),
            period: t("evolutionSection.steps.web.period"),
            description: t("evolutionSection.steps.web.description"),
            years: t("evolutionSection.steps.web.years"),
            slogan: t("evolutionSection.steps.web.slogan"),
            bgClass: "experience-visual-bg--web",
            fgClass: "experience-visual-fg--web",
        },
        {
            key: "ai",
            suffix: YEAR_SUFFIXES[2],
            title: t("evolutionSection.steps.ai.title"),
            subtitle: t("evolutionSection.steps.ai.subtitle"),
            period: t("evolutionSection.steps.ai.period"),
            description: t("evolutionSection.steps.ai.description"),
            years: t("evolutionSection.steps.ai.years"),
            slogan: t("evolutionSection.steps.ai.slogan"),
            bgClass: "experience-visual-bg--ai",
            fgClass: "experience-visual-fg--ai",
        },
        {
            key: "lead",
            suffix: YEAR_SUFFIXES[3],
            title: t("evolutionSection.steps.lead.title"),
            subtitle: t("evolutionSection.steps.lead.subtitle"),
            period: t("evolutionSection.steps.lead.period"),
            description: t("evolutionSection.steps.lead.description"),
            years: t("evolutionSection.steps.lead.years"),
            slogan: t("evolutionSection.steps.lead.slogan"),
            bgClass: "experience-visual-bg--lead",
            fgClass: "experience-visual-fg--lead",
        },
    ];

    const setupPath = useCallback(() => {
        const path = pathRef.current;
        if (!path || window.innerWidth <= 767) return;

        const length = path.getTotalLength();
        pathLengthRef.current = length;
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
    }, []);

    const drawPath = useCallback((progress: number) => {
        const path = pathRef.current;
        if (!path || pathLengthRef.current === 0) return;

        path.style.strokeDashoffset = `${pathLengthRef.current * (1 - clamp(progress))}`;
    }, []);

    const update = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        if (window.innerWidth <= 767) {
            setScrollProgress(0);
            if (suffixTrackRef.current) {
                suffixTrackRef.current.style.transform = "translate3d(0, 0, 0)";
            }
            return;
        }

        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollable = Math.max(section.offsetHeight - vh, 1);
        const progress = clamp(-rect.top / scrollable);
        const stepFloat = progress * (STEP_COUNT - 1);

        setScrollProgress((prev) => (Math.abs(prev - progress) < 0.0005 ? prev : progress));
        drawPath(progress);

        if (suffixTrackRef.current) {
            suffixTrackRef.current.style.transform = `translate3d(0, calc(${-stepFloat} * var(--year-slot-height)), 0)`;
        }
    }, [drawPath]);

    useLayoutEffect(() => {
        setupPath();
        update();
    }, [setupPath, update]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let resizeTimer: ReturnType<typeof setTimeout>;

        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setupPath();
                update();
            }, 80);
        };

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("lenis-scroll", update as EventListener);
        window.addEventListener("resize", onResize);

        const observer = new ResizeObserver(onResize);
        observer.observe(section);

        return () => {
            clearTimeout(resizeTimer);
            observer.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("lenis-scroll", update as EventListener);
            window.removeEventListener("resize", onResize);
        };
    }, [setupPath, update]);

    const stepFloat = scrollProgress * (STEP_COUNT - 1);
    const activeIndex = Math.min(Math.round(stepFloat), STEP_COUNT - 1);

    return (
        <section
            id="Evolution"
            className="experience2"
            ref={sectionRef}
            style={{
                ["--exp-steps" as string]: STEP_COUNT,
                ["--exp-step-vh" as string]: SCROLL_VH_PER_STEP,
            }}
        >
            <div className="experience-scroll-space">
                <div className="experience-viewport">
                    <EvolutionPath ref={pathRef} />

                    <div className="experience-layout">
                        <aside className="experience-left">
                            <header className="experience-heading">
                                <h1 className="heading experience-section-heading">
                                    {t("evolution")}
                                    <br />
                                    <span>
                                        {t("evolutionSection.subtitleLine")}
                                    </span>
                                </h1>
                            </header>
                        </aside>

                        <div className="experience-right">
                            {steps.map((step, index) => {
                                const opacity = getSequentialSlideOpacity(index, stepFloat);
                                const parallax = (stepFloat - index) * 36 * opacity;

                                return (
                                    <article
                                        key={step.key}
                                        className={[
                                            "experience-slide",
                                            index === activeIndex ? "is-current" : "",
                                        ].join(" ")}
                                        style={{
                                            opacity,
                                            visibility: opacity < 0.01 ? "hidden" : "visible",
                                            zIndex: opacity > 0 ? 2 : 0,
                                        }}
                                        aria-hidden={index !== activeIndex}
                                    >
                                        <div
                                            className="experience-slide-copy"
                                            style={{
                                                transform: `translate3d(0, ${parallax * 0.25}px, 0)`,
                                            }}
                                        >  <h4 className="experience-slide-period">
                                                {t(step.period)}
                                            </h4>
                                            <h2 className="experience-slide-title">
                                                {t(step.title)}
                                            </h2>
                                            <h3 className="experience-slide-subti">
                                                {t(step.slogan)}
                                            </h3>
                                            <p className="experience-slide-description">
                                                {step.description}
                                            </p>
                                        </div>

                                        <div className="experience-visual">
                                            <div
                                                className={`experience-visual-bg ${step.bgClass}`}
                                                style={{
                                                    transform: `translate3d(0, ${parallax * 0.45}px, 0) scale(1.02)`,
                                                }}
                                            />
                                            
                                            <div
                                                className={`experience-visual-fg ${step.fgClass}`}
                                                style={{
                                                    transform: `translate3d(0, ${parallax * -0.35}px, 0)`,
                                                }}
                                            > 
                                            <div className={`visual-fg_title`}>
                                               
                                                    {t(step.years)} 
                                                    <div className={`visual-fg_icon fg_icon_${step.key}`}></div>
                                                
                                            </div>

                                                {t(step.subtitle)}
                                            
                                            </div>

                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className="experience-year-bar" aria-live="polite">
                        <span className="experience-year-prefix">20</span>
                        <div className="experience-year-suffix-window">
                            <div className="experience-year-suffix-track" ref={suffixTrackRef}>
                                {YEAR_SUFFIXES.map((suffix) => (
                                    <span key={suffix} className="experience-year-suffix">
                                        {suffix}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="experience-mobile">
                <h1 className="heading">
                    {t("evolution")}
                    <br />
                    <span>{t("evolutionSection.subtitleLine")}</span>
                </h1>
                <ol className="experience-mobile-list">
                    {steps.map((step) => (
                        <li key={step.key} className="experience-mobile-item">
                            <span className="experience-mobile-year">{t(step.period)}</span>
                            <h2 className="experience-mobile-title">
                                {t(step.title)}
                            </h2>
                            <h3 className="experience-slide-period">
                                {t(step.slogan)}
                            </h3>
                            <p className="experience-mobile-description">{step.description}</p>
                            <div className="experience-mobile-visual">
                                <div className={`experience-visual-bg ${step.bgClass}`} />
                                <div className={`experience-visual-fg ${step.fgClass}`} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

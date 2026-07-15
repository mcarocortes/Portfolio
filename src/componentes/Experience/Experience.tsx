import "./Experience.css";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function clamp(value: number, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

export default function Experience() {
    const { t } = useTranslation();
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const nodeRatiosRef = useRef<number[]>([]);
    const [activeStep, setActiveStep] = useState(-1);

    const steps = [
        {
            key: "industrial",
            title: t("experienceSection.steps.industrial.title"),
            period: t("experienceSection.steps.industrial.period"),
            side: "left" as const,
        },
        {
            key: "web",
            title: t("experienceSection.steps.web.title"),
            period: t("experienceSection.steps.web.period"),
            side: "right" as const,
        },
        {
            key: "ai",
            title: t("experienceSection.steps.ai.title"),
            period: t("experienceSection.steps.ai.period"),
            side: "left" as const,
        },
        {
            key: "lead",
            title: t("experienceSection.steps.lead.title"),
            period: t("experienceSection.steps.lead.period"),
            side: "right" as const,
        },
    ];

    const measureNodeRatios = useCallback(() => {
        const timeline = timelineRef.current;
        const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
        if (!timeline || items.length === 0) return;

        const timelineRect = timeline.getBoundingClientRect();
        const height = timelineRect.height || 1;

        nodeRatiosRef.current = items.map((item) => {
            const node = item.querySelector(".experience-node");
            if (!node) return 0;

            const nodeRect = node.getBoundingClientRect();
            const centerY = nodeRect.top + nodeRect.height / 2 - timelineRect.top;
            return clamp(centerY / height, 0, 1);
        });
    }, []);

    const update = useCallback(() => {
        const timeline = timelineRef.current;
        const progressEl = progressRef.current;
        if (!timeline || !progressEl) return;

        const timelineRect = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const triggerY = vh * 0.52;

        const start = timelineRect.top - triggerY;
        const end = timelineRect.bottom - triggerY;
        const range = Math.max(end - start, 1);
        const progress = clamp(-start / range);

        progressEl.style.transform = `scaleY(${progress})`;

        const ratios = nodeRatiosRef.current;
        let nextActive = -1;

        for (let i = ratios.length - 1; i >= 0; i--) {
            if (progress >= ratios[i] - 0.02) {
                nextActive = i;
                break;
            }
        }

        setActiveStep((prev) => (prev === nextActive ? prev : nextActive));
    }, []);

    useLayoutEffect(() => {
        measureNodeRatios();
        update();
    }, [measureNodeRatios, update]);

    useEffect(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        let resizeTimer: ReturnType<typeof setTimeout>;

        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                measureNodeRatios();
                update();
            }, 80);
        };

        const observer = new ResizeObserver(onResize);
        observer.observe(timeline);

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("lenis-scroll", update as EventListener);

        return () => {
            clearTimeout(resizeTimer);
            observer.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("lenis-scroll", update as EventListener);
        };
    }, [measureNodeRatios, update]);

    return (
        <section id="Experience" className="experience">
            <div className="experience-inner">
                <div className="section_description-exp">
                    <h1 className="heading">
                        {t("experience")}
                        <br />
                        <span>{t("experienceSection.subtitle")}</span>
                    </h1>
                </div>

                <div className="experience-timeline" ref={timelineRef}>
                    <div className="experience-line" aria-hidden="true">
                        <div className="experience-line-track" />
                        <div className="experience-line-progress" ref={progressRef} />
                    </div>

                    <ol className="experience-list">
                        {steps.map((step, index) => (
                            <li
                                key={step.key}
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                                className={[
                                    "experience-item",
                                    `experience-item--${step.side}`,
                                    index <= activeStep ? "is-active" : "",
                                    index === activeStep ? "is-current" : "",
                                ].join(" ")}
                            >
                                {step.side === "left" ? (
                                    <>
                                        <div className="experience-side experience-side--content">
                                            <article className="experience-card">
                                                <span className="experience-index">{step.period}</span>
                                                <h2 className="experience-title">{step.title}</h2>
                                            </article>
                                        </div>
                                        <div className="experience-axis">
                                            <span className="experience-node" aria-hidden="true" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="experience-axis">
                                            <span className="experience-node" aria-hidden="true" />
                                        </div>
                                        <div className="experience-side experience-side--content">
                                            <article className="experience-card">
                                                <span className="experience-index">{step.period}</span>
                                                <h2 className="experience-title">{step.title}</h2>
                                            </article>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

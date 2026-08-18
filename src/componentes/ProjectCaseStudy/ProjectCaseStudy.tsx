import "./ProjectCaseStudy.css";
import HandProject from "../HandProject/HandProject";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    PROJECT_IMAGE_SOURCES,
    PROJECT_HERO_MEDIA,
    PROJECT_OPPORTUNITY_IMAGES,
    getProjectNeighbors,
    getProjectRoute,
    getProjectCatalogPath,
    type ProjectCaseKey,
} from "../../data/projectsCatalog";

type CaseSection = {
    title: string;
    body: string;
};

type CaseImage = {
    caption: string;
    alt: string;
    layout?: "wide" | "default";
};

const EASE = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.22 };

const fadeReveal: Variants = {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, ease: EASE },
    },
};

const fadeRevealReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.35 },
    },
};

const handReveal: Variants = {
    hidden: { opacity: 0, scale: 1.38, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.05, ease: EASE },
    },
};

const handRevealReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4 },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.04 },
    },
};

const cardFlipReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.35 },
    },
};

type GalleryFigureProps = {
    layout: "wide" | "default";
    src: string | null;
    caption: string;
    alt: string;
    placeholderLabel: string;
    index: number;
};

function GalleryFigure({
    layout,
    src,
    caption,
    alt,
    placeholderLabel,
    index,
}: GalleryFigureProps) {
    const ref = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.95", "center 0.52"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.75, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
    const captionOpacity = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

    if (prefersReducedMotion) {
        return (
            <motion.figure
                ref={ref}
                className={`project-case__figure project-case__figure--${layout}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={cardFlipReduced}
            >
                <div className="project-case__media">
                    {src ? (
                        <img src={src} alt={alt} loading="lazy" />
                    ) : (
                        <div className="project-case__placeholder" aria-hidden="true">
                            <span className="project-case__placeholder-label">{placeholderLabel}</span>
                            <span className="project-case__placeholder-index">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>
                    )}
                </div>
                <figcaption className="project-case__caption">{caption}</figcaption>
            </motion.figure>
        );
    }

    return (
        <motion.figure
            ref={ref}
            className={`project-case__figure project-case__figure--${layout}`}
            style={{
                rotateX,
                opacity,
                scale,
                y,
                transformPerspective: 320,
            }}
        >
            <motion.div className="project-case__media">
                {src ? (
                    <img src={src} alt={alt} loading="lazy" />
                ) : (
                    <div className="project-case__placeholder" aria-hidden="true">
                        <span className="project-case__placeholder-label">{placeholderLabel}</span>
                        <span className="project-case__placeholder-index">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                )}
            </motion.div>
            <motion.figcaption className="project-case__caption" style={{ opacity: captionOpacity }}>
                {caption}
            </motion.figcaption>
        </motion.figure>
    );
}

type ProjectCaseStudyProps = {
    projectKey: ProjectCaseKey;
};

export default function ProjectCaseStudy({ projectKey }: ProjectCaseStudyProps) {
    const { t } = useTranslation();
    const prefersReducedMotion = useReducedMotion();
    const route = getProjectRoute(projectKey);
    const { prev, next } = getProjectNeighbors(route?.slug ?? "");

    const pagePrefix = `projectCaseStudy.pages.${projectKey}`;

    const reveal = prefersReducedMotion ? fadeRevealReduced : fadeReveal;
    const handMotion = prefersReducedMotion ? handRevealReduced : handReveal;

    const sections = useMemo(
        () => t(`${pagePrefix}.sections`, { returnObjects: true }) as CaseSection[],
        [t, pagePrefix]
    );

    const imagesMeta = useMemo(
        () => t(`${pagePrefix}.images`, { returnObjects: true }) as CaseImage[],
        [t, pagePrefix]
    );

    const imageSources = PROJECT_IMAGE_SOURCES[projectKey] ?? [];
    const heroMedia = PROJECT_HERO_MEDIA[projectKey];
    const opportunityImage = PROJECT_OPPORTUNITY_IMAGES[projectKey];

    const catalogPath = getProjectCatalogPath(projectKey);
    const projectTitle = t(`${catalogPath}.title`);
    const projectTags = t(`${catalogPath}.tags`, {
        returnObjects: true,
    }) as string[];

    return (
        <article className="project-case">
            <header className="project-case__hero">
                <div className="project-case__hero-inner">
                    <motion.p
                        className="project-case__eyebrow"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        variants={reveal}
                    >
                        {projectTitle}
                    </motion.p>

                    <motion.h1
                        className="project-case__headline heading"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        variants={reveal}
                    >
                        {t(`${pagePrefix}.headline`)}
                    </motion.h1>

                    <div className="header-description">
                        <motion.div
                            className="header-information"
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            variants={staggerContainer}
                        >
                            <motion.p className="project-case__role-line" variants={reveal}>
                                {t(`${pagePrefix}.company`)} | {t(`${pagePrefix}.role`)}
                            </motion.p>

                            <motion.p className="project-case__lead" variants={reveal}>
                                {t(`${catalogPath}.subtitle`)}
                            </motion.p>

                            <motion.section variants={reveal}>
                                <h2 className="project-case__block-title">
                                    {t("projectCaseStudy.roleTitle")}
                                </h2>
                                <p className="project-case__block-text">
                                    {t(`${pagePrefix}.roleDescription`)}
                                </p>
                            </motion.section>

                            <motion.ul
                                className="project-case__tags"
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
                                    },
                                }}
                            >
                                {projectTags.map((tag) => (
                                    <motion.li key={tag} variants={reveal}>
                                        {tag}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        <motion.div
                            className={`project-case__heroImage project-case__heroImage--${heroMedia.type}`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={handMotion}
                        >
                            {heroMedia.type === "hand" ? (
                                <HandProject
                                    videoSrc={heroMedia.videoSrc}
                                    ariaLabel={t("projectCaseStudy.previewVideoLabel", {
                                        project: projectTitle,
                                    })}
                                />
                            ) : heroMedia.src ? (
                                <img
                                    className="project-case__hero-photo"
                                    src={heroMedia.src}
                                    alt={t(`${pagePrefix}.heroImageAlt`, {
                                        defaultValue: projectTitle,
                                    })}
                                />
                            ) : (
                                <div className="project-case__hero-photo project-case__hero-photo--placeholder" aria-hidden="true">
                                    <span>{t("projectCaseStudy.imagePlaceholder")}</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </header>

            <div>
                <div className="project-case_oportunities">
                    <div className="block-boxes">
                        {sections.map((section, index) => (                           
                        
                            <motion.section
                                key={section.title}
                            className="project-case__block"
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            variants={reveal}
                            transition={{ delay: index * 0.04 }}
                            >
                            <h2 className="project-case__block-title">{section.title}</h2>
                            <p className="project-case__block-text">{section.body}</p>
                        </motion.section>
                        
                        ))}
                    </div>

                 {opportunityImage ? (
                    <motion.img
                        className="img_oportunities"
                        src={opportunityImage}
                        alt={t(`${pagePrefix}.opportunityImageAlt`, {
                            defaultValue: projectTitle,
                        })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        variants={reveal}
                        loading="lazy"
                    />
                ) : (
                    <motion.div
                        className="img_oportunities img_oportunities--placeholder"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        variants={reveal}
                        aria-hidden="true"
                    >
                        <span className="project-case__placeholder-label">
                            {t("projectCaseStudy.imagePlaceholder")}
                        </span>
                    </motion.div>
                )}
                </div>


                <motion.section
                    className="project-case__gallery"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={reveal}
                >
                    <h2 className="project-case__block-title">{t("projectCaseStudy.outputsTitle")}</h2>

                    <div className="project-case__gallery-grid">
                        {imagesMeta.map((image, index) => {
                            const src = imageSources[index] ?? null;
                            const layout = image.layout ?? (index % 3 === 0 ? "wide" : "default");

                            return (
                                <GalleryFigure
                                    key={`${projectKey}-image-${index}`}
                                    layout={layout}
                                    src={src}
                                    caption={image.caption}
                                    alt={image.alt}
                                    placeholderLabel={t("projectCaseStudy.imagePlaceholder")}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </motion.section>
            </div>

            <nav className="project-case__nav" aria-label={t("projectCaseStudy.navLabel")}>
                <div className="project-case__nav-inner">
                    {prev ? (
                        <Link to={prev.slug} className="project-case__nav-link project-case__nav-link--prev">
                            <span className="project-case__nav-kicker">{t("projectCaseStudy.prev")}</span>
                            <span className="project-case__nav-title">
                                {t(`${getProjectCatalogPath(prev.key)}.title`)}
                            </span>
                        </Link>
                    ) : (
                        <span className="project-case__nav-spacer project-case__nav-spacer--prev" aria-hidden="true" />
                    )}

                    <Link to="/#Projects" className="project-case__nav-back">
                        {t("projectCaseStudy.backToProjects")}
                    </Link>

                    {next ? (
                        <Link to={next.slug} className="project-case__nav-link project-case__nav-link--next">
                            <span className="project-case__nav-kicker">{t("projectCaseStudy.next")}</span>
                            <span className="project-case__nav-title">
                                {t(`${getProjectCatalogPath(next.key)}.title`)}
                            </span>
                        </Link>
                    ) : (
                        <span className="project-case__nav-spacer project-case__nav-spacer--next" aria-hidden="true" />
                    )}
                </div>
            </nav>
        </article>
    );
}

import "./ProjectCaseStudy.css";
import HandProject from "../HandProject/HandProject"
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    PROJECT_IMAGE_SOURCES,
    PROJECT_VIDEO_SOURCES,
    getProjectNeighbors,
    getProjectRoute,
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

const reveal = {
    hidden: { opacity: 0, y: 36 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

type ProjectCaseStudyProps = {
    projectKey: ProjectCaseKey;
};

export default function ProjectCaseStudy({ projectKey }: ProjectCaseStudyProps) {
    const { t } = useTranslation();
    const route = getProjectRoute(projectKey);
    const { prev, next } = getProjectNeighbors(route?.slug ?? "");

    const pagePrefix = `projectCaseStudy.pages.${projectKey}`;

    const sections = useMemo(
        () => t(`${pagePrefix}.sections`, { returnObjects: true }) as CaseSection[],
        [t, pagePrefix]
    );

    const imagesMeta = useMemo(
        () => t(`${pagePrefix}.images`, { returnObjects: true }) as CaseImage[],
        [t, pagePrefix]
    );

    const imageSources = PROJECT_IMAGE_SOURCES[projectKey] ?? [];

    const projectTitle = t(`projectsSection.items.${projectKey}.title`);
    const projectTags = t(`projectsSection.items.${projectKey}.tags`, {
        returnObjects: true,
    }) as string[];

    return (
        <article className="project-case">
            <header className="project-case__hero">
                <motion.div
                    className="project-case__hero-inner"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}>

                    <motion.p className="project-case__eyebrow" variants={reveal}>
                        {projectTitle}
                    </motion.p>

                    <motion.h1 className="project-case__headline heading" variants={reveal}>
                        {t(`${pagePrefix}.headline`)}
                    </motion.h1>

                    <motion.div className="header-description">
                        <motion.div className="header-information">
                            <motion.p className="project-case__role-line" variants={reveal}>
                                {t(`${pagePrefix}.company`)} |  {t(`${pagePrefix}.role`)}
                            </motion.p>
                            <motion.p className="project-case__lead" variants={reveal}>
                                {t(`projectsSection.items.${projectKey}.subtitle`)}
                            </motion.p>


                            <motion.section
                                className="project-case__block"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.35 }}
                                variants={reveal}
                            >
                                <h2 className="project-case__block-title">{t("projectCaseStudy.roleTitle")}</h2>
                                <p className="project-case__block-text">{t(`${pagePrefix}.roleDescription`)}</p>
                            </motion.section>
                            <motion.ul className="project-case__tags" variants={reveal}>
                                {projectTags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </motion.ul>

                        </motion.div>

                        <motion.div className="project-case__heroImage">
                            <HandProject
                                videoSrc={PROJECT_VIDEO_SOURCES[projectKey]}
                                ariaLabel={t("projectCaseStudy.previewVideoLabel", {
                                    project: projectTitle,
                                })}
                            />
                        </motion.div>

                    </motion.div>

                </motion.div>
                
            </header>

            <div>

            <div className="project-case_oportunities">
                {sections.map((section) => (
                    <motion.section
                        key={section.title}
                        className="project-case__block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={reveal}
                    >
                        <h2 className="project-case__block-title">{section.title}</h2>
                        <p className="project-case__block-text">{section.body}</p>
                    </motion.section>
                ))}
                <motion.div className="img_oportunities"></motion.div>
            </div>
                <motion.section
                    className="project-case__gallery"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={reveal}
                >
                    <h2 className="project-case__block-title">{t("projectCaseStudy.outputsTitle")}</h2>

                    <div className="project-case__gallery-grid">
                        {imagesMeta.map((image, index) => {
                            const src = imageSources[index] ?? null;
                            const layout = image.layout ?? (index % 3 === 0 ? "wide" : "default");

                            return (
                                <motion.figure
                                    key={`${projectKey}-image-${index}`}
                                    className={`project-case__figure project-case__figure--${layout}`}
                                    initial={{ opacity: 0, y: 40, scale: 0.985 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.04,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <div className="project-case__media">
                                        {src ? (
                                            <img src={src} alt={image.alt} loading="lazy" />
                                        ) : (
                                            <div className="project-case__placeholder" aria-hidden="true">
                                                <span className="project-case__placeholder-label">
                                                    {t("projectCaseStudy.imagePlaceholder")}
                                                </span>
                                                <span className="project-case__placeholder-index">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <figcaption className="project-case__caption">{image.caption}</figcaption>
                                </motion.figure>
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
                                {t(`projectsSection.items.${prev.key}.title`)}
                            </span>
                        </Link>
                    ) : (
                        <span className="project-case__nav-spacer" aria-hidden="true" />
                    )}

                    <Link to="/#Projects" className="project-case__nav-back">
                        {t("projectCaseStudy.backToProjects")}
                    </Link>

                    {next ? (
                        <Link to={next.slug} className="project-case__nav-link project-case__nav-link--next">
                            <span className="project-case__nav-kicker">{t("projectCaseStudy.next")}</span>
                            <span className="project-case__nav-title">
                                {t(`projectsSection.items.${next.key}.title`)}
                            </span>
                        </Link>
                    ) : (
                        <span className="project-case__nav-spacer" aria-hidden="true" />
                    )}
                </div>
            </nav>
        </article>
    );
}

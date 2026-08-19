import "./WhatIBring.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import portraitLight from "../../assets/img/WhatIBring/Particles.png";
import portraitDark from "../../assets/img/WhatIBring/Particles_darkmode.png";
import WhatIBringParticles from "./WhatIBringParticles";

const PARTICLE_COUNT_DESKTOP = 420;
const PARTICLE_COUNT_MOBILE = 180;

const CARDS = [
    { key: "productThinking", icon: "target" },
    { key: "designDevelopment", icon: "code" },
    { key: "collaborativeMindset", icon: "people" },
    { key: "aiImprovement", icon: "spark" },
    { key: "qualityFirst", icon: "shield" },
] as const;

type IconName = (typeof CARDS)[number]["icon"];

const cardReveal = {
    hidden: { opacity: 0, y: 24 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.06,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

function CardIcon({ name }: { name: IconName }) {
    const common = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };

    switch (name) {
        case "target":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                </svg>
            );
        case "code":
            return (
                <svg {...common}>
                    <path d="M8 8 4 12l4 4" />
                    <path d="m16 8 4 4-4 4" />
                </svg>
            );
        case "people":
            return (
                <svg {...common}>
                    <circle cx="9" cy="8" r="2.4" />
                    <path d="M4.5 18c.6-2.4 2.4-3.6 4.5-3.6s3.9 1.2 4.5 3.6" />
                    <circle cx="16.2" cy="8.4" r="2" />
                    <path d="M15 14.4c1.7.15 3.2 1.15 3.8 3.6" />
                </svg>
            );
        case "spark":
            return (
                <svg {...common}>
                    <path d="M12 3.5 13.4 9 19 10.5 13.4 12 12 17.5 10.6 12 5 10.5 10.6 9z" />
                </svg>
            );
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 3.5 19 6.5v5.2c0 4.1-2.8 7.1-7 8.8-4.2-1.7-7-4.7-7-8.8V6.5z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );
    }
}

function Portrait() {
    return (
        <div className="what-i-bring__portrait" aria-hidden="true">
            <img
                className="what-i-bring__portrait-img what-i-bring__portrait-img--light"
                src={portraitLight}
                alt=""
            />
            <img
                className="what-i-bring__portrait-img what-i-bring__portrait-img--dark"
                src={portraitDark}
                alt=""
            />
        </div>
    );
}

export default function WhatIBring() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
    const [particleCount, setParticleCount] = useState(PARTICLE_COUNT_MOBILE);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 992px)");
        const updateCount = () =>
            setParticleCount(media.matches ? PARTICLE_COUNT_DESKTOP : PARTICLE_COUNT_MOBILE);

        updateCount();
        media.addEventListener("change", updateCount);
        return () => media.removeEventListener("change", updateCount);
    }, []);

    return (
        <section
            id="WhatIDo"
            className="what-i-bring"
            onPointerMove={(e) => setPointer({ x: e.clientX, y: e.clientY })}
            onPointerLeave={() => setPointer(null)}
        >
            <div className="what-i-bring__backdrop" aria-hidden="true">
                <WhatIBringParticles pointer={pointer} count={particleCount} />
            </div>

            <div className="what-i-bring__intro">
                <Portrait />
                <motion.div
                    className="what-i-bring__copy"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="heading what-i-bring__title">
                        {t("whatIBringSection.title")}
                    </h1>

                    <p className="what-i-bring__lede">
                        {t("whatIBringSection.intro")}
                    </p>
                </motion.div>
            </div>

            <div className="what-i-bring__grid">
                {CARDS.map(({ key, icon }, index) => (
                    <motion.article
                        key={key}
                        className="what-i-bring__card"
                        custom={index}
                        variants={cardReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="what-i-bring__card-top">
                            <span className="what-i-bring__index">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="what-i-bring__icon">
                                <CardIcon name={icon} />
                            </span>
                        </div>
                        <h3 className="what-i-bring__card-title">
                            {t(`whatIBringSection.cards.${key}.title`)}
                        </h3>
                        <p className="what-i-bring__card-subtitle">
                            {t(`whatIBringSection.cards.${key}.subtitle`)}
                        </p>
                        <p className="what-i-bring__card-text">
                            {t(`whatIBringSection.cards.${key}.description`)}
                        </p>
                        <span className="what-i-bring__accent" aria-hidden="true" />
                    </motion.article>
                ))}
            </div>

            <div className="what-i-bring__list">
                {CARDS.map(({ key, icon }, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <button
                            key={key}
                            type="button"
                            className={`what-i-bring__row${isOpen ? " is-open" : ""}`}
                            aria-expanded={isOpen}
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                            <span className="what-i-bring__row-icon">
                                <CardIcon name={icon} />
                            </span>
                            <span className="what-i-bring__row-index">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="what-i-bring__row-copy">
                                <span className="what-i-bring__row-title">
                                    {t(`whatIBringSection.cards.${key}.title`)}
                                </span>
                                <span className="what-i-bring__row-subtitle">
                                    {t(`whatIBringSection.cards.${key}.subtitle`)}
                                </span>
                                {isOpen ? (
                                    <span className="what-i-bring__row-text">
                                        {t(`whatIBringSection.cards.${key}.description`)}
                                    </span>
                                ) : null}
                            </span>
                            <span className="what-i-bring__row-chevron" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 6 6 6-6 6" />
                                </svg>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

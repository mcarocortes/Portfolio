import "./WhatIBring.css";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import WhatIBringParticles from "./WhatIBringParticles";

const CARDS = [
    { key: "productThinking", span: 7, icon: "blue" },
    { key: "designDevelopment", span: 5, icon: "maca" },
    { key: "collaborativeMindset", span: 4, icon: "green" },
    { key: "aiImprovement", span: 4, icon: "blue" },
    { key: "qualityFirst", span: 4, icon: "maca" },
] as const;

const cardReveal = {
    hidden: { opacity: 0, y: 28 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

type CardItem = (typeof CARDS)[number];

function WhatIBringCardContent({
    cardKey,
    index,
    t,
}: {
    cardKey: CardItem["key"];
    index: number;
    t: (key: string) => string;
}) {
    return (
        <>
            <span className="what-i-bring__index">{String(index + 1).padStart(2, "0")}</span>
            <div className="what-i-bring__icon" aria-hidden="true" />
            <div className="what-i-bring__body">
                <h3 className="what-i-bring__card-title">
                    {t(`whatIBringSection.cards.${cardKey}.title`)}
                </h3>
                <p className="what-i-bring__card-subtitle">
                    {t(`whatIBringSection.cards.${cardKey}.subtitle`)}
                </p>
                <p className="what-i-bring__card-text">
                    {t(`whatIBringSection.cards.${cardKey}.description`)}
                </p>
            </div>
        </>
    );
}

export default function WhatIBring() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
    const explorerRef = useRef<HTMLDivElement>(null);

    const activeCard = CARDS[activeIndex];

    const goTo = useCallback((index: number) => {
        setActiveIndex(Math.min(Math.max(index, 0), CARDS.length - 1));
    }, []);

    const goNext = () => goTo(activeIndex + 1);
    const goPrev = () => goTo(activeIndex - 1);

    const trackPointer = (clientX: number, clientY: number) => {
        setPointer({ x: clientX, y: clientY });
    };

    return (
        <section id="WhatIDo" className="what-i-bring">
            <motion.header
                className="what-i-bring__header"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="heading what-i-bring__title">{t("whatIBringSection.title")}</h1>
            </motion.header>

            {/* Desktop: bento grid */}
            <div className="what-i-bring__grid">
                {CARDS.map(({ key, span, icon }, index) => (
                    <motion.article
                        key={key}
                        className={`what-i-bring__card what-i-bring__card--grid what-i-bring__card--span-${span} what-i-bring__card--icon-${icon}`}
                        custom={index}
                        variants={cardReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <WhatIBringCardContent cardKey={key} index={index} t={t} />
                    </motion.article>
                ))}
            </div>

            {/* Tablet / mobile: explorador interactivo + partículas */}
            <div
                ref={explorerRef}
                className="what-i-bring__explorer"
                onPointerMove={(e) => trackPointer(e.clientX, e.clientY)}
                onPointerLeave={() => setPointer(null)}
            >
                <WhatIBringParticles pointer={pointer} />

                <div
                    className="what-i-bring__chips"
                    role="tablist"
                    aria-label={t("whatIBringSection.title")}
                >
                    {CARDS.map(({ key }, index) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            className={`what-i-bring__chip${index === activeIndex ? " is-active" : ""}`}
                            aria-selected={index === activeIndex}
                            onClick={() => goTo(index)}
                        >
                            <span className="what-i-bring__chip-num">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="what-i-bring__chip-label">
                                {t(`whatIBringSection.cards.${key}.title`)}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="what-i-bring__stage">
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={activeCard.key}
                            className={`what-i-bring__card what-i-bring__card--stage what-i-bring__card--icon-${activeCard.icon}`}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.98 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.14}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -70) goNext();
                                else if (info.offset.x > 70) goPrev();
                            }}
                            role="tabpanel"
                        >
                            <WhatIBringCardContent
                                cardKey={activeCard.key}
                                index={activeIndex}
                                t={t}
                            />
                        </motion.article>
                    </AnimatePresence>

                    <p className="what-i-bring__swipe-hint">{t("whatIBringSection.swipeHint")}</p>
                </div>

                <div className="what-i-bring__stepper" aria-hidden="true">
                    {CARDS.map(({ key }, index) => (
                        <span
                            key={key}
                            className={`what-i-bring__step${index === activeIndex ? " is-active" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

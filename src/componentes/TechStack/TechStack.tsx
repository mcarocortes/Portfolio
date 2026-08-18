import "./TechStack.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type TechItem = {
    name: string;
    categoryKey: "frontend" | "design" | "tools" | "data";
};

const ROW_FRONTEND: TechItem[] = [
    { name: "React", categoryKey: "frontend" },
    { name: "TypeScript", categoryKey: "frontend" },
    { name: "JavaScript", categoryKey: "frontend" },
    { name: "HTML / CSS", categoryKey: "frontend" },
    { name: "Vite", categoryKey: "frontend" },
    { name: "React Router", categoryKey: "frontend" },
    { name: "Framer Motion", categoryKey: "frontend" },
    { name: "Three.js", categoryKey: "frontend" },
    { name: "i18next", categoryKey: "frontend" },
    { name: "PWA", categoryKey: "frontend" },
];

const ROW_DESIGN_TOOLS: TechItem[] = [
    { name: "Figma", categoryKey: "design" },
    { name: "UI / UX", categoryKey: "design" },
    { name: "Design Systems", categoryKey: "design" },
    { name: "Git", categoryKey: "tools" },
    { name: "Azure", categoryKey: "tools" },
    { name: "Lenis", categoryKey: "tools" },
    { name: "ESLint", categoryKey: "tools" },
    { name: "AI Tools", categoryKey: "data" },
    { name: "Big Data", categoryKey: "data" },
    { name: "Bootstrap", categoryKey: "frontend" },
];

function MarqueeRow({
    items,
    reverse = false,
    label,
}: {
    items: TechItem[];
    reverse?: boolean;
    label: string;
}) {
    const { t } = useTranslation();
    const loopItems = [...items, ...items];

    return (
        <div
            className={`tech-stack__marquee${reverse ? " tech-stack__marquee--reverse" : ""}`}
            aria-label={label}
        >
            <div className="tech-stack__track">
                {loopItems.map((item, index) => (
                    <article
                        key={`${item.name}-${index}`}
                        className="tech-stack__pill"
                        aria-hidden={index >= items.length}
                    >
                        <span className="tech-stack__pill-name">{item.name}</span>
                        <span className="tech-stack__pill-tag">
                            {t(`techStackSection.categories.${item.categoryKey}`)}
                        </span>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default function TechStack() {
    const { t } = useTranslation();

    return (
        <section id="TechStack" className="tech-stack">
            <motion.header
                className="tech-stack__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="heading tech-stack__title">{t("techStackSection.title")}<br></br>
                <span className="tech-stack__subtitle">{t("techStackSection.subtitle")}</span></h1>
            </motion.header>

            <div className="tech-stack__rows">
                <MarqueeRow
                    items={ROW_FRONTEND}
                    label={t("techStackSection.marqueeFrontend")}
                />
                <MarqueeRow
                    items={ROW_DESIGN_TOOLS}
                    reverse
                    label={t("techStackSection.marqueeDesign")}
                />
            </div>

            <ul className="tech-stack__static" aria-label={t("techStackSection.title")}>
                {[...ROW_FRONTEND, ...ROW_DESIGN_TOOLS].map((item) => (
                    <li key={item.name} className="tech-stack__pill tech-stack__pill--static">
                        <span className="tech-stack__pill-name">{item.name}</span>
                        <span className="tech-stack__pill-tag">
                            {t(`techStackSection.categories.${item.categoryKey}`)}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

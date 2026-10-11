import "./Contact.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../../lib/smoothScroll";

const LINKS = [
    {
        href: "https://docs.google.com/document/d/1NMfEXo7zS4QSl8IMpvD-GIpJqqQYchyYX1pfKIqw7Fg/edit?usp=sharing",
        label: "CV",
    },
    {
        href: "https://www.linkedin.com/in/macarena-caro-cortes/",
        label: "LinkedIn",
    },
    {
        href: "https://github.com/mcarocortes",
        label: "GitHub",
    },
    {
        href: "https://www.instagram.com/macarocortes/",
        label: "Instagram",
    },
] as const;

export default function Contact() {
    const { t } = useTranslation();
    const mailSubject = encodeURIComponent(t("contactSection.mailSubject"));
    const reducedMotion = useRef(false);

    useEffect(() => {
        reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    const onButtonMove = (event: MouseEvent<HTMLButtonElement>) => {
        if (reducedMotion.current) return;
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        button.style.setProperty("--btn-x", `${dx * 0.22}px`);
        button.style.setProperty("--btn-y", `${dy * 0.28}px`);
    };

    const onButtonLeave = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.style.setProperty("--btn-x", "0px");
        event.currentTarget.style.setProperty("--btn-y", "0px");
    };

    return (
        <section id="Contact">
            <div className="content">
                <div className="message">
                    <p className="title">
                        {t("contactSection.titleBefore")}
                        <span>
                            {t("contactSection.titleHighlightLine1")}
                            <br className="title-break" />{" "}
                            {t("contactSection.titleHighlightLine2")}
                        </span>
                        {t("contactSection.titleAfter")}
                    </p>

                    <button
                        className="btnAContacto"
                        onMouseMove={onButtonMove}
                        onMouseLeave={onButtonLeave}
                        onClick={() => {
                            window.location.href = `mailto:m.caro.cortes2@gmail.com?subject=${mailSubject}`;
                        }}
                    >
                        {t("contactSection.cta")}
                    </button>

                    <p className="madeWith">
                        {t("contactSection.madeWithBefore")}
                        <span>{t("contactSection.madeWithHighlight")}</span>
                        {t("contactSection.madeWithAfter")}
                    </p>

                    <div className="items">
                        <ul>
                            {LINKS.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="list"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="logoTrack" aria-hidden="true" />

            <div className="footerLine">
                <p>{t("contactSection.copyright")}</p>
                <Link
                    to="#Home"
                    className="back"
                    aria-label={t("contactSection.backToTop")}
                    onClick={(event) => {
                        event.preventDefault();
                        scrollToTop();
                        window.history.replaceState(null, "", "#Home");
                    }}
                >
                    <i className="bi bi-arrow-up" aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}

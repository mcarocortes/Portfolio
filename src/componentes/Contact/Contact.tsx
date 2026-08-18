import "./Contact.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../../lib/smoothScroll";

export default function Contact() {
    const { t } = useTranslation();
    const mailSubject = encodeURIComponent(t("contactSection.mailSubject"));

    return (
        <>
            <section id="Contact">
                <div className="content">
                    <div className="message">
                        <p className="title">
                            {t("contactSection.titleBefore")}
                            <span>
                                {t("contactSection.titleHighlightLine1")} <br />
                                {t("contactSection.titleHighlightLine2")}
                            </span>
                            {t("contactSection.titleAfter")}
                        </p>

                        <button
                            className="btnAContacto"
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
                    </div>

                    <div className="items">
                        <ul>
                            <li>
                                <a href="mailto:m.caro.cortes2@gmail.com" className="list">
                                    {t("contactSection.email")}
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://www.linkedin.com/in/macarena-caro-cortes/"
                                    className="list"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://github.com/mcarocortes"
                                    className="list"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://www.instagram.com/macarocortes/"
                                    className="list"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="logoTrack"></div>

                <div className="footerLine">
                    {t("contactSection.copyright")}
                    <Link
                        to="#Home"
                        className="back"
                        onClick={() => {
                            scrollToTop();
                            window.history.replaceState(null, "", "#Home");
                        }}
                    >
                        {t("contactSection.backToTop")}
                    </Link>
                </div>
            </section>
        </>
    );
}

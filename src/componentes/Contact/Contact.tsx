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

const DOT_GAP = 16;
const DOT_REACH = 200;

function paintContactDots(
    canvas: HTMLCanvasElement,
    pointer: { x: number; y: number } | null,
) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dark = document.documentElement.classList.contains("dark-mode");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dark ? "#8c8ef2" : "#e0e1ff";

    for (let y = DOT_GAP / 2; y < height; y += DOT_GAP) {
        for (let x = DOT_GAP / 2; x < width; x += DOT_GAP) {
            let px = x;
            let py = y;
            let radius = 1.45;
            let alpha = dark ? 0.55 : 0.28;

            if (pointer) {
                const dx = x - pointer.x;
                const dy = y - pointer.y;
                const dist = Math.hypot(dx, dy);
                if (dist < DOT_REACH && dist > 0.001) {
                    const t = 1 - dist / DOT_REACH;
                    const ease = t * t * (3 - 2 * t);
                    const push = ease * 46;
                    px += (dx / dist) * push;
                    py += (dy / dist) * push;
                    radius = 1.45 * (1 + ease * 2.1);
                    alpha += ease * 0.4;
                }
            }

            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

export default function Contact() {
    const { t } = useTranslation();
    const mailSubject = encodeURIComponent(t("contactSection.mailSubject"));
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerRef = useRef<{ x: number; y: number } | null>(null);
    const reducedMotion = useRef(false);
    const frame = useRef(0);

    useEffect(() => {
        reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        const draw = () => {
            paintContactDots(canvas, reducedMotion.current ? null : pointerRef.current);
        };

        const resizeObserver = new ResizeObserver(draw);
        resizeObserver.observe(section);
        const themeObserver = new MutationObserver(draw);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        draw();

        return () => {
            cancelAnimationFrame(frame.current);
            resizeObserver.disconnect();
            themeObserver.disconnect();
        };
    }, []);

    const onMove = (event: MouseEvent<HTMLElement>) => {
        if (reducedMotion.current) return;
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        const target = event.target as HTMLElement;
        if (target.closest("a, button")) {
            if (pointerRef.current) {
                pointerRef.current = null;
                paintContactDots(canvas, null);
            }
            return;
        }

        const rect = section.getBoundingClientRect();
        pointerRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            paintContactDots(canvas, pointerRef.current);
        });
    };

    const onLeave = () => {
        pointerRef.current = null;
        const canvas = canvasRef.current;
        if (canvas) paintContactDots(canvas, null);
    };

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
        <section
            id="Contact"
            ref={sectionRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <canvas className="contact-field" ref={canvasRef} aria-hidden="true" />
            <div className="content">
                <div className="message">
                    <p className="title">
                        {t("contactSection.titleBefore")}{" "}
                        <span>{t("contactSection.titleHighlightLine1")}{" "}
                        {t("contactSection.titleHighlightLine2")}</span>
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

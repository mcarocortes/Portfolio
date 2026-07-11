import { useEffect, useRef, useState } from "react";
import "./Cursor.css";

export default function Cursor() {

    const cursorRef = useRef<HTMLDivElement>(null);

    const [isPointer, setIsPointer] = useState(false);
    //const [hidden, setHidden] = useState(false);
    const [variant, setVariant] = useState("");

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {

        const moveCursor = (e: MouseEvent) => {

            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target as Element | null;
            if (!target) return;

            // ocultar cursor
            /*if (target.closest(".no-cursor")) {
                setHidden(true);
                return;
            } else {
                setHidden(false);
            }*/

            // elementos interactivos tienen prioridad
            if (target.closest("a, button, input")) {
                setIsPointer(true);
                setVariant(""); // cancelar variantes
            } else {
                setIsPointer(false);

                // variantes especiales solo si no es botón
                if (target.closest(".cursor-contact")) {
                    setVariant("contact");
                } else if (target.closest(".cursor-project")) {
                    setVariant("project");
                } else if (target.closest(".no-cursor")) {
                    setVariant("hidden");
                } else {
                    setVariant("");
                }
            }

        };

        window.addEventListener("mousemove", moveCursor);

        return () => window.removeEventListener("mousemove", moveCursor);

    }, []);

    /* cursor con inercia suave */
    useEffect(() => {

        const animate = () => {

            pos.current.x += (mouse.current.x - pos.current.x) * 0.85;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.85;

            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animate);
        };

        animate();

    }, []);

    //if (hidden) return null;

return (
  <div ref={cursorRef} className="custom-cursor">
    <div className={`custom-cursor-inner ${isPointer ? "pointer" : ""} ${variant}`} />
  </div>
);
}
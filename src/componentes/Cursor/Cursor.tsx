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

            const nextPointer = Boolean(target.closest("a, button, input"));
            let nextVariant = "";

            if (!nextPointer) {
                if (target.closest(".cursor-project")) nextVariant = "project";
                else if (target.closest(".no-cursor")) nextVariant = "hidden";
            }

            setIsPointer((prev) => (prev === nextPointer ? prev : nextPointer));
            setVariant((prev) => (prev === nextVariant ? prev : nextVariant));

        };

        window.addEventListener("mousemove", moveCursor);

        return () => window.removeEventListener("mousemove", moveCursor);

    }, []);

    /* cursor con inercia suave */
    useEffect(() => {

        let frame = 0;

        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.85;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.85;

            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);

    }, []);

    //if (hidden) return null;

return (
  <div ref={cursorRef} className="custom-cursor">
    <div className={`custom-cursor-inner ${isPointer ? "pointer" : ""} ${variant}`} />
  </div>
);
}
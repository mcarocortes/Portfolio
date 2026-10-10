import { useEffect, useRef, type RefObject } from "react";

type Pointer = { x: number; y: number } | null;

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    phase: number;
};

const DEFAULT_PARTICLE_COUNT = 180;
const PURPLE = { r: 161, g: 128, b: 210 };

export default function WhatIBringParticles({
    pointerRef,
    count = DEFAULT_PARTICLE_COUNT,
}: {
    pointerRef: RefObject<Pointer>;
    count?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame = 0;
        let particles: Particle[] = [];
        let width = 0;
        let height = 0;
        let visible = true;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.max(1, Math.floor(width * dpr));
            canvas.height = Math.max(1, Math.floor(height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initParticles = () => {
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: 1.2 + Math.random() * 2.2,
                phase: Math.random() * Math.PI * 2,
            }));
        };

        const draw = (time: number) => {
            frame = requestAnimationFrame(draw);
            if (!visible) return;

            ctx.clearRect(0, 0, width, height);

            const ptr = pointerRef.current;
            const bounds = canvas.getBoundingClientRect();
            const px = ptr ? ptr.x - bounds.left : -9999;
            const py = ptr ? ptr.y - bounds.top : -9999;

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                const dx = p.x - px;
                const dy = p.y - py;
                const dist = Math.hypot(dx, dy);
                const influence = Math.max(0, 1 - dist / 120);
                const pulse = 0.45 + Math.sin(time * 0.002 + p.phase) * 0.2;
                const alpha = pulse + influence * 0.55;
                const radius = p.size + influence * 2.5;

                ctx.fillStyle = `rgba(${PURPLE.r}, ${PURPLE.g}, ${PURPLE.b}, ${alpha * 0.28})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius * 2.4, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `rgba(${PURPLE.r}, ${PURPLE.g}, ${PURPLE.b}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        resize();
        initParticles();
        frame = requestAnimationFrame(draw);

        const observer = new ResizeObserver(() => {
            resize();
            initParticles();
        });
        observer.observe(canvas);

        const visibility = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        }, { rootMargin: "200px" });
        visibility.observe(canvas);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            visibility.disconnect();
        };
    }, [count, pointerRef]);

    return (
        <canvas
            className="what-i-bring__particles"
            ref={canvasRef}
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
        />
    );
}

import { forwardRef } from "react";

/* Línea de tiempo horizontal — onda amplia, zona del título */
export const ProjectsPathHorizontal = forwardRef<SVGPathElement>(
    function ProjectsPathHorizontal(_, ref) {
        return (
            <svg
                className="projects-path-svg projects-path-svg--horizontal"
                viewBox="0 0 1400 200"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="projectsPathGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--purpura)" stopOpacity="1" />
                        <stop offset="70%" stopColor="var(--purpura3)" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="var(--purpura)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                <path
                    ref={ref}
                    className="projects-path-line projects-path-line--primary"
                    d="
                        M -30 100
                        C 160 25, 320 175, 480 100
                        S 800 25, 1120 100
                        C 1220 110, 1320 100, 1420 50
                    "
                    stroke="url(#projectsPathGradientH)"
                />
            </svg>
        );
    }
);

/* Arco superior derecho — transición hacia Beyond Code (estilo Hero) */
export const ProjectsPathBeyond = forwardRef<SVGCircleElement>(
    function ProjectsPathBeyond(_, ref) {
        return (
            <svg
                className="projects-path-svg projects-path-svg--beyond"
                viewBox="0 0 1000 1000"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient
                        id="projectsPathGradientB"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--white-transparent)" stopOpacity="0.5" />
                        <stop offset="18%" stopColor="var(--purpura3)" stopOpacity="0.5" />
                        <stop offset="42%" stopColor="var(--purpura)" stopOpacity="10" />
                        <stop offset="58%" stopColor="var(--purpura)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                <circle
                    ref={ref}
                    cx="500"
                    cy="500"
                    r="450"
                    className="projects-path-line projects-path-line--primary"
                    stroke="url(#projectsPathGradientB)"
                />
            </svg>
        );
    }
);

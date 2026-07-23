import { forwardRef } from "react";

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
                        <stop offset="0%" stopColor="var(--purpura3)" stopOpacity="0.65" />
                        <stop offset="22%" stopColor="var(--purpura)" stopOpacity="0.85" />
                        <stop offset="48%" stopColor="var(--purpura)" stopOpacity="1" />
                        <stop offset="72%" stopColor="var(--purpura)" stopOpacity="1" />
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

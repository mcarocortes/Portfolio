import { forwardRef } from "react";

export const EvolutionPath = forwardRef<SVGPathElement>(
    function EvolutionPath(_, ref) {
        return (
            <svg
                className="experience-path-svg"
                viewBox="0 0 1600 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient
                        id="experiencePathGradient"
                        x1="0%"
                        y1="0%"
                        x2="20%"
                        y2="130%"
                        gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--purpura)" stopOpacity="1" />
                        <stop offset="25%" stopColor="var(--purpura)" stopOpacity="1" />
                        <stop offset="50%" stopColor="var(--purpura3)" stopOpacity="1" />
                        <stop offset="60%" stopColor="var(--purpura3)" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="var(--white)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* Lazo orgánico — recorre el centro como en el mockup */}
                <path
                    ref={ref}
                    className="experience-path-line experience-path-line--track"
                    d="
                        M 760 -40
                        C 940 40, 1080 180, 960 320
                        C 820 480, 560 420, 460 560
                        C 360 700, 520 860, 760 780
                        C 980 710, 1180 880, 1040 1500
                    "
                    stroke="var(--purpura4)"
                />
                <path
                    ref={ref}
                    className="experience-path-line experience-path-line--progress"
                    d="
                        M 760 -40
                        C 940 40, 1080 180, 960 320
                        C 820 480, 560 420, 460 560
                        C 360 700, 520 860, 760 780
                        C 980 710, 1180 880, 1040 1500
                    "
                    stroke="url(#experiencePathGradient)"
                />
            </svg>
        );
    }
);

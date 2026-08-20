import type { CaseIconName } from "../../data/projectsCatalog";

type CaseStudyIconProps = {
    name: CaseIconName;
};

export default function CaseStudyIcon({ name }: CaseStudyIconProps) {
    const common = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };

    switch (name) {
        case "search":
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4 4" />
                </svg>
            );
        case "layers":
            return (
                <svg {...common}>
                    <path d="m12 3.5 8 4.5-8 4.5-8-4.5z" />
                    <path d="m4 14.5 8 4.5 8-4.5" />
                </svg>
            );
        case "check":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    <path d="m8.5 12.2 2.3 2.3 4.7-5" />
                </svg>
            );
        case "users":
            return (
                <svg {...common}>
                    <circle cx="9" cy="8" r="2.4" />
                    <path d="M4.5 18c.6-2.4 2.4-3.6 4.5-3.6s3.9 1.2 4.5 3.6" />
                    <circle cx="16.2" cy="8.4" r="2" />
                    <path d="M15 14.4c1.7.15 3.2 1.15 3.8 3.6" />
                </svg>
            );
        case "mobile":
            return (
                <svg {...common}>
                    <rect x="7" y="3.5" width="10" height="17" rx="2" />
                    <path d="M11 17.5h2" />
                </svg>
            );
        case "spark":
            return (
                <svg {...common}>
                    <path d="M12 3.5 13.4 9 19 10.5 13.4 12 12 17.5 10.6 12 5 10.5 10.6 9z" />
                </svg>
            );
        case "heart":
            return (
                <svg {...common}>
                    <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
                </svg>
            );
        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v4.5l3 1.8" />
                </svg>
            );
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 3.5 19 6.5v5.2c0 4.1-2.8 7.1-7 8.8-4.2-1.7-7-4.7-7-8.8V6.5z" />
                </svg>
            );
        case "target":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                </svg>
            );
        case "code":
            return (
                <svg {...common}>
                    <path d="M8 8 4 12l4 4" />
                    <path d="m16 8 4 4-4 4" />
                </svg>
            );
        case "palette":
            return (
                <svg {...common}>
                    <path d="M12 4a8 8 0 1 0 0 16h1.2a2.2 2.2 0 0 0 2.1-2.9 2.2 2.2 0 0 1 2.1-2.9H18a4 4 0 0 0 0-8h-.5" />
                    <circle cx="7.8" cy="10" r="1" fill="currentColor" stroke="none" />
                    <circle cx="10.2" cy="7.4" r="1" fill="currentColor" stroke="none" />
                    <circle cx="14" cy="7.4" r="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case "box":
            return (
                <svg {...common}>
                    <path d="M12 3.5 20 8v8l-8 4.5L4 16V8z" />
                    <path d="M12 12V21.5" />
                    <path d="M20 8 12 12 4 8" />
                </svg>
            );
        case "waves":
            return (
                <svg {...common}>
                    <path d="M3 9c2.2 0 2.2 3 4.4 3S9.6 9 11.8 9 14 12 16.2 12 18.4 9 21 9" />
                    <path d="M3 15c2.2 0 2.2 3 4.4 3s2.2-3 4.4-3 2.2 3 4.4 3 2.2-3 4.8-3" />
                </svg>
            );
        case "chat":
            return (
                <svg {...common}>
                    <path d="M5 6.5h14v9H8.5L5 19z" />
                </svg>
            );
        case "chart":
            return (
                <svg {...common}>
                    <path d="M4 19h16" />
                    <path d="M7 16v-5" />
                    <path d="M12 16V7" />
                    <path d="M17 16v-8" />
                </svg>
            );
    }
}

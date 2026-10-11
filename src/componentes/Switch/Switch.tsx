import type { ReactNode } from "react";
import "./Switch.css";

interface Option {
    label: ReactNode;
    value: string;
}

interface Props {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export default function Switch({
    options,
    value,
    onChange,
}: Props) {

    return (

        <div className="switch-control">

            {options.map(option => (

                <button
                    key={option.value}
                    className={`switch ${value === option.value ? "active" : ""}`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>

            ))}

        </div>

    );
}
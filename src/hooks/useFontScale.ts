import { useEffect, useState } from "react";

export type FontScale = "small" | "normal" | "large";

const scaleValues = {
    small: 0.9,
    normal: 1,
    large: 1.2
};

export default function useFontScale() {

    const [fontScale, setFontScale] = useState<FontScale>("normal");

    useEffect(() => {

        const saved =
            (localStorage.getItem("fontScale") as FontScale) || "normal";

        setFontScale(saved);

        document.documentElement.style.setProperty(
            "--font-scale",
            String(scaleValues[saved])
        );

    }, []);

    const changeFontScale = (value: FontScale) => {

        setFontScale(value);

        document.documentElement.style.setProperty(
            "--font-scale",
            String(scaleValues[value])
        );

        localStorage.setItem("fontScale", value);

    };

    return {
        fontScale,
        setFontScale: changeFontScale
    };

}
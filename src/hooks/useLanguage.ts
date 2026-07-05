import { useTranslation } from "react-i18next";

export default function useLanguage() {

    const { i18n } = useTranslation();

    const language = i18n.language;

    const setLanguage = (lang: "es" | "en") => {

        i18n.changeLanguage(lang);

        localStorage.setItem("language", lang);

    };

    return {
        language,
        setLanguage,
    };
}
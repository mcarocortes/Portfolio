import { useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useLanguage() {
  const { i18n } = useTranslation();
  const [, startTransition] = useTransition();

  const language = i18n.language;

  const setLanguage = (lang: "es" | "en") => {
    startTransition(() => {
      i18n.changeLanguage(lang);
    });
    localStorage.setItem("language", lang);
  };

  return { language, setLanguage };
}
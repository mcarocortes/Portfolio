import { useRef } from "react";
import "./AccessibilityPanel.css";

import useClickOutside from "../../hooks/useClickOutside"
import useDarkMode from "../../hooks/useDarkMode";
import useFontScale from "../../hooks/useFontScale";
import useLanguage from "../../hooks/useLanguage";
import Switch from "../Switch/Switch";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  //variant?: "desktop" | "mobile",
  hidden?: boolean
}

export default function AccessibilityPanel({ open, setOpen, hidden }: Props) {

  const panelRef = useRef<HTMLDivElement>(null);

  /*Hooks */
  useClickOutside(panelRef, () => setOpen(false), open);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage } = useLanguage();
  const { fontScale, setFontScale } = useFontScale();
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div
      className={`accessibility-panel ${hidden ? "navbar-hidden" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >

      <div className="d-flex justify-content-between mb-3">
        <p className="uppercase">{t("accessibility")}</p>

        {(
          <button
            className="btn-close"
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      <div>
        <label className="mt-2" >{t("language")}</label>
        <Switch

          options={[
            { label: "ES", value: "es" },
            { label: "EN", value: "en" }
          ]}

          value={language}

          onChange={setLanguage}

        />

        <label className=" mt-2" >{t("interface")}</label>

        <Switch

          options={[
            { label: `☀ ${t("bright")}`, value: "light" },
            { label: `☾ ${t("dark")}`, value: "dark" }
          ]}
          value={darkMode ? "dark" : "light"}

          onChange={(value) => {

            if (
              value === "dark" && !darkMode ||
              value === "light" && darkMode
            ) {
              toggleDarkMode();
            }

          }}

        />

      </div>
      <label className="mt-2" >{t("fontSize")}</label>


      <Switch

        options={[
          { label: "A-", value: "small" },
          { label: "A", value: "normal" },
          { label: "A+", value: "large" }
        ]}

        value={fontScale}

        onChange={setFontScale}

      />

    </div>
  );
}
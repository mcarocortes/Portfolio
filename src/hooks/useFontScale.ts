import { useEffect, useState } from "react";

export default function useFontScale() {

  const [scale, setScale] = useState(1);

  useEffect(() => {

    const saved = localStorage.getItem("fontScale");

    if (saved) {
      const value = Number(saved);
      setScale(value);
      document.documentElement.style.setProperty("--font-scale", saved);
    }

  }, []);

  const changeScale = (value: number) => {

    setScale(value);

    document.documentElement.style.setProperty("--font-scale", String(value));

    localStorage.setItem("fontScale", String(value));

  };

  const increaseText = () => changeScale(1.2);
  const decreaseText = () => changeScale(0.9);
  const defaultText = () => changeScale(1);

  return { scale, increaseText, decreaseText, defaultText };

}
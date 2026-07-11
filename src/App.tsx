import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./componentes/NavBar/Navbar";
import Cursor from "./componentes/Cursor/Cursor";
import ScrollToHash from "./ScrollToHash";
import Lenis from "lenis";
import { useEffect } from "react";

// Importa las imágenes dark mode (Vite resuelve la URL correcta)
import logoDarkmode from "./assets/img/Hero/MacarenaCaroLogo_darkmode.svg";
import dotsHeroDarkmode from "./assets/img/Hero/DotsHero_darkmode.svg";
import profileDarkmode from "./assets/img/About/ProfilePicture_darkmode.png";
// Si cursor_darkmode está en /public, usa la ruta pública:
// const cursorDarkmode = "/Portfolio/cursor_darkmode.svg";

export default function App() {

  // 1) Lenis (scroll suave) — igual que ahora
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // 2) Precarga diferida de imágenes dark mode
  useEffect(() => {
    const preloadImages = () => {
      const urls = [
        logoDarkmode,
        dotsHeroDarkmode,
        profileDarkmode,
        // cursorDarkmode,  // descomenta si lo añades
      ];

      urls.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    // Espera a que el navegador esté libre (no compite con la carga inicial)
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(preloadImages);
      return () => cancelIdleCallback(id);
    }

    // Fallback para navegadores sin requestIdleCallback
    const timer = setTimeout(preloadImages, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter basename="/Portfolio">
      <Cursor />
      <ScrollToHash />
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./componentes/NavBar/Navbar";
import Cursor from "./componentes/Cursor/Cursor";
import ScrollToHash from "./ScrollToHash";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";
import UnderConstruction from "./componentes/UnderConstruction/UnderConstruction";
import Lenis from "lenis";
import { useEffect } from "react";
import { setLenisInstance } from "./lib/smoothScroll";

// Importa las imágenes dark mode (Vite resuelve la URL correcta)
import logoDarkmode from "./assets/img/Hero/MacarenaCaroLogo_darkmode.svg";
import dotsHeroDarkmode from "./assets/img/Hero/DotsHero_darkmode.svg";
import profileDarkmode from "./assets/img/About/ProfilePicture_darkmode.png";
// Si cursor_darkmode está en /public, usa la ruta pública:
// const cursorDarkmode = "/Portfolio/cursor_darkmode.svg";

const isConstructionMode = import.meta.env.VITE_UNDER_CONSTRUCTION === "true";

const STANDALONE_PATHS = ["/en-construccion"];

function AppContent() {
  const location = useLocation();
  const isStandalonePage = STANDALONE_PATHS.includes(location.pathname);

  // 1) Lenis (scroll suave) — igual que ahora
  useEffect(() => {
    if (isStandalonePage) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("lenis-scroll"));
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [isStandalonePage]);

  // 2) Precarga diferida de imágenes dark mode
  useEffect(() => {
    if (isStandalonePage) return;

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
  }, [isStandalonePage]);

  if (isStandalonePage) {
    return <AppRoutes />;
  }

  return (
    <>
      <Cursor />
      <ScrollToTopOnNavigate />
      <ScrollToHash />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default function App() {
  if (isConstructionMode) {
    return <UnderConstruction />;
  }

  return (
    <BrowserRouter basename="/Portfolio">
      <AppContent />
    </BrowserRouter>
  );
}
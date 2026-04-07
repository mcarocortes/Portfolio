import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./componentes/NavBar/Navbar";
import AccessibilityPanel from "./componentes/Accessibility/Accessibility";
import ScrollToHash from "./ScrollToHash";
import Lenis from "lenis";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.5,
      touchMultiplier: 5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
      <BrowserRouter basename="/Portfolio">
        <ScrollToHash />
        <Navbar />
        <AppRoutes />
        <AccessibilityPanel />     
      </BrowserRouter>
    );
}

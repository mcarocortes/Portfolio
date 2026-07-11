import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../componentes/Hero/Hero";
import { ScrollTransitionProvider } from "../context/ScrollTransitionContext";

export default function PortfolioLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showPreloader, setShowPreloader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {

    const minDuration = 5000;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setShowPreloader(false), 500);
    }, remaining);

    return () => clearTimeout(timer);
  }, [startTime]);

  return (
    <ScrollTransitionProvider>
      {/*{showPreloader && <Preloader animateOut={animateOut} />}*/}

      {/* Hero SOLO visible en Home */}
      <div style={{ display: isHome ? "block" : "none" }}>
        <Hero />
      </div>

      <Outlet />
    </ScrollTransitionProvider>
  );
}

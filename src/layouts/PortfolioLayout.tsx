import { Outlet, useLocation } from "react-router-dom";
import Hero from "../componentes/Hero/Hero";
import { ScrollTransitionProvider } from "../context/ScrollTransitionContext";

export default function PortfolioLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <ScrollTransitionProvider>
      {/* Hero SOLO visible en Home */}
      <div style={{ display: isHome ? "block" : "none" }}>
        <Hero />
      </div>

      <Outlet />
    </ScrollTransitionProvider>
  );
}

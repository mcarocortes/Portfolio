import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PortfolioLayout from "./layouts/PortfolioLayout";
import LandingPage from "./componentes/LandingPage/LandingPage";
import NotFound from "./componentes/NotFound/NotFound";
import UnderConstruction from "./componentes/UnderConstruction/UnderConstruction";
import { VISIBLE_PROJECTS } from "./data/projectsCatalog";

const ProjectCaseStudy = lazy(() => import("./componentes/ProjectCaseStudy/ProjectCaseStudy"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
    <Routes>
      <Route path="/en-construccion" element={<UnderConstruction />} />

      <Route element={<PortfolioLayout />}>
        <Route index element={<LandingPage />} />
        {VISIBLE_PROJECTS.map((project) => (
          <Route
            key={project.key}
            path={project.slug}
            element={<ProjectCaseStudy projectKey={project.key} />}
          />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
}

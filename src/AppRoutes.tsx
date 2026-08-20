import { Routes, Route } from "react-router-dom";
import PortfolioLayout from "./layouts/PortfolioLayout";
import LandingPage from "./componentes/LandingPage/LandingPage";
import ProjectCaseStudy from "./componentes/ProjectCaseStudy/ProjectCaseStudy";
import NotFound from "./componentes/NotFound/NotFound";
import UnderConstruction from "./componentes/UnderConstruction/UnderConstruction";
import { PROJECTS } from "./data/projectsCatalog";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/en-construccion" element={<UnderConstruction />} />

      <Route element={<PortfolioLayout />}>
        <Route index element={<LandingPage />} />
        {PROJECTS.map((project) => (
          <Route
            key={project.key}
            path={project.slug}
            element={<ProjectCaseStudy projectKey={project.key} />}
          />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

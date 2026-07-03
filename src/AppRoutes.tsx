import { Routes, Route } from "react-router-dom";
import PortfolioLayout from "./layouts/PortfolioLayout";
import LandingPage from "./componentes/LandingPage/LandingPage";
import Modular from "./pages/Modular/Modular";
import Vc from "./pages/VC/Vc";
import Vinos from "./pages/Vinos/Vinos";
import Bank from "./pages/BankApp/Bank";
import Movies from "./pages/Movies/Movies";

export default function AppRoutes() {
  return (
    <Routes>
      {/* TODO el portfolio vive bajo el mismo layout, así no se desmonta el Hero ni el Preloader*/}
      <Route element={<PortfolioLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="/modulAR" element={<Modular />} />
        <Route path="/Vc" element={<Vc />} />
        <Route path="/Bank" element={<Bank />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Vinos" element={<Vinos />} />
      </Route>
    </Routes>
  );
}
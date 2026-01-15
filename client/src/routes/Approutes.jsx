import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CVDRiskForm from "../pages/CVDRiskForm";
import Models from "../pages/Models/Models";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<CVDRiskForm />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </>
  );
}

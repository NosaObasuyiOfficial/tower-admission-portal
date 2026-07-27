import { Routes, Route } from "react-router-dom";
import AdmissionPage from "../pages/AdmissionPage";

function portalRoutes() {
  return (
    <Routes>
      <Route path="/admission-portal" element={<AdmissionPage />} />
    </Routes>
  );
}

export default portalRoutes;

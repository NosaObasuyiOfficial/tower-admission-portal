import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import FallbackLoad from "./components/FallBackLoad";

const PortalRoutes = lazy(() => import("./utilities/portalRoutes"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<FallbackLoad />}>
          <Routes>
            <Route path="/" element={<Navigate to="/admission-portal" />} />
            <Route path="/*" element={<PortalRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

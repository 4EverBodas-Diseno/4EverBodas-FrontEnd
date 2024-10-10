import { createRoot } from "react-dom/client";
import { Suspense, StrictMode } from "react";
import Routing from "./routers/Routing";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<>Cargando...</>}>
      <AuthProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  </StrictMode>
);

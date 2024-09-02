import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Importa el Provider de Redux
import { store } from "./store/store"; // Importa tu store
import { router } from "./routes/index.tsx"; // Ruta de tus rutas
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}> {/* Envolver con Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

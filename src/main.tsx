import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Importa el Provider de Redux
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store"; // Importa tu store
import { router } from "./routes/index.tsx"; // Ruta de tus rutas
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Envolver con Provider */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);

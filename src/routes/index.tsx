import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/static/NotFound";
import NewPost from "../components/static/NewPostForm";
import PostsComponent from "../pages/PostsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App envuelve todas las rutas para que NavBar siempre esté presente
    children: [
      {
        path: "/",
        element: <PostsComponent />, // Contenido para la ruta principal
      },
      {
        path: "/new-post",
        element: <NewPost />, // Contenido para la ruta /new-post
      },
      {
        path: "*",
        element: <NotFound />, // Contenido para rutas no encontradas
      },
    ],
  },
]);

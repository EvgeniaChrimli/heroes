import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HeroPage from "./components/Heroes/HeroPage.tsx";
import CreateHero from "./pages/CreateHero/CreateHero.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hero/:id",
    element: <HeroPage />,
  },
  {
    path: "/create",
    element: <CreateHero />,
  },
];
const router = createBrowserRouter(routes, {
  basename: "/heroes/",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

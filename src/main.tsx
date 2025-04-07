import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HeroPage from "./components/Heroes/HeroPage.tsx";
import CreateHero from "./pages/CreateHero/CreateHero.tsx";

const router = createBrowserRouter(
  [
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
  ]
  // createRoutesFromElements(
  //   <Route path="/" element={<App />} errorElement={<ErrorPage />}>
  //     <Route path="/hero/:id" element={<HeroPage />} />
  //     <Route path="/create" element={<CreateHero />} />
  //   </Route>
  // )
  // {
  //   basename: "/heroes/",
  // }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MemoryRouter basename="/heroes/">
        <RouterProvider router={router} />
      </MemoryRouter>
    </Provider>
  </StrictMode>
);

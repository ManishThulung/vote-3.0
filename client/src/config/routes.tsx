import { RouteObject } from "react-router-dom";
import { HomeLayout } from "../components/layouts";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/user/HomePage";

const publicRoutes: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "/login", element: <NotFound /> },
  ],
};

const notFoundRoutes: RouteObject = {
  path: "*",
  element: <NotFound />,
};

const routes: RouteObject[] = [
  // { path: "/", element: <Navigate to={`/`} /> },
  // { path: '/app/settings', element: <Navigate to={`${GENERAL_SETTING}`} /> },
  publicRoutes,
  notFoundRoutes,
];
export default routes;

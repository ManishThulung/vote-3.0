import { Navigate, RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { HomeLayout } from "../components/layouts";

const publicRoutes: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  children: [{ index: true, element: <Login /> }],
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

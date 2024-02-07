import { RouteObject } from "react-router-dom";
import { AdminLayout, HomeLayout } from "../components/layouts";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/user/HomePage";
import Dashboard from "../pages/admin/Dashboard";
import Candidate from "../pages/admin/Candidate";

const publicRoutes: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  children: [{ index: true, element: <HomePage /> }],
};

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "/admin/canidates", element: <Candidate /> },
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
  adminRoutes,
  notFoundRoutes,
];
export default routes;

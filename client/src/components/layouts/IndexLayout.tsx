/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from "react";
import { useLocation, Navigate } from "react-router-dom";

function IndexLayout({ children }: any) {
  // const { pathname } = useLocation();
  // const { state: authState } = useAuthStateContext();

  // let landingPath = '';

  // useEffect(() => {
  // 	landingPath = pathname;
  // }, []);

  // const { isAuthPage, isAppPage } = useRouteChecker({
  // 	pathname,
  // });

  const BootstrappedLayout = () => {
    // redirect to login page if current is not login page and user not authorized
    // if (redirectToLogin) {
    // 	return <Navigate to='auth/login' state={{ from: pathname }} replace />;
    // }

    // redirect to main dashboard when user on login page and authorized
    // if (isAuthPage && isUserAuthorized) {
    // 	const hasCompany = !!authState?.company;
    // 	const To = hasCompany ? landingPath : '/app/company-register';

    // 	return <Navigate to={To} state={{ from: pathname }} replace />;
    // }
    // in other case render previously set layout

    return children;
  };

  return BootstrappedLayout();
}

export default memo(IndexLayout);

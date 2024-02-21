import { RouteProps } from "react-router-dom";
import { Home } from "../components/pages/Home";
import AccountPage from "../components/pages/account/AccountPage";
import ChangePasswordPage from "../components/pages/auth/ChangePasswordPage/ChangePasswordPage";
import CreateAccountPage from "../components/pages/auth/CreateAccountPage/CreateAccountPage";
import VerifyPasswordPage from "../components/pages/auth/VerifyPasswordPage/VerifyPasswordPage";
import LoginPage from "../components/pages/auth/LoginPage/LoginPage";
import { AuthRedirectPage } from "../components/pages/auth/AuthRedirectPage";
import PageNotFound from "../components/pages/PageNotFound/PageNotFound";
import { useMemo } from "react";

export const appRoutePropList: (RouteProps & { isAuthRequired?: boolean })[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    isAuthRequired: true,
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/create-account",
    element: <CreateAccountPage />,
  },
  {
    path: "/verify-password",
    element: <VerifyPasswordPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/redirect",
    element: <AuthRedirectPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export function getAppRoutes({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  return appRoutePropList.filter((route) =>
    route.isAuthRequired ? isAuthenticated : true,
  );
}

export function useAppRoutes({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  return useMemo(() => getAppRoutes({ isAuthenticated }), [isAuthenticated]);
}

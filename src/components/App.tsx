import { useAuthenticationMutation } from "../services/Authentication.ts";
import { FullScreenCircularProgress } from "./common/loader/FullScreenCircularProgress.tsx";
import { useEffect } from "react";
import { useAppErrorHandlers } from "../services/ErrorMessaging.ts";
import AppRouter from "./routes/AppRouter.tsx";
import { AppProviders } from "./AppProviders.tsx";

// See main.tsx for providers

export default function App() {
  const {
    isLoading,
    mutate: authenticate,
    error: authenticateError,
  } = useAuthenticationMutation();

  useAppErrorHandlers([
    {
      error: authenticateError,
      id: "App-authenticateError",
    },
  ]);

  useEffect(() => authenticate(), []);

  if (isLoading) return <FullScreenCircularProgress />;

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

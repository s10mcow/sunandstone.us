import { useAuthenticatedUser } from "./Authentication";
import { useNavigate as RrdNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useNavigate = RrdNavigate;

export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    toHome: () => navigate("/ "),
  };
}

export function useNavigateToLoginIfNotAuthenticated({
  enabled,
}: {
  enabled: boolean;
}) {
  const navigate = useNavigate();
  const authenticatedUser = useAuthenticatedUser();
  useEffect(() => {
    if (!enabled) return;

    if (!authenticatedUser) {
      navigate("/auth/login");
    }
  }, [authenticatedUser, enabled]);
}
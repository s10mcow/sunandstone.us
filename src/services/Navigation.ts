import { useNavigate as RrdNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useLocation } from "react-router";

export function useURLSearchParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(), [search]);
}

export const useNavigate = RrdNavigate;

export function useAppNavigate() {
  const navigate = useNavigate();

  return {
    toHome() {
      navigate("/");
    },
    toLogin() {
      navigate("/auth/login");
    },
    toChangePassword({ oobCode }: { oobCode: string }) {
      navigate(`/auth/change-password?oobCode=${oobCode}`);
    },
  };
}

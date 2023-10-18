import { useMutation } from "@tanstack/react-query";

import { atom, useRecoilValue } from "recoil";
import { getRecoil, resetRecoil, setRecoil } from "recoil-nexus";
import { mockAuthenticatedUser } from "./__mocks__/Authentication.ts";
import { logger } from "./Logger.ts";

type AuthenticatedUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  jwtToken?: string;
};

export const authenticatedUserState = atom<AuthenticatedUser | undefined>({
  key: "authenticatedUserState",
  default: undefined,
});

export function useAuthenticatedUser() {
  return useRecoilValue(authenticatedUserState);
}

export async function getAuthenticatedUser() {
  return getRecoil(authenticatedUserState);
}

export function setAuthenticatedUser({ user }: { user: AuthenticatedUser }) {
  setRecoil(authenticatedUserState, user);
}

export function resetAuthenticatedUser() {
  resetRecoil(authenticatedUserState);
}

export function useAuthenticationMutation() {
  return useMutation({
    mutationFn: authenticate,
    mutationKey: ["authenticate"],
  });
}

export async function submitLogin({ email }: { email: string }) {
  if (email === "fail") {
    throw new Error("Login failed");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  logger.warn({
    message: "Login not implemented, using mock user",
    data: { email },
  });
  setAuthenticatedUser({ ...mockAuthenticatedUser });
}

/**
 * Check for an existing user and set the authenticated user if one exists
 */
export async function authenticate() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // setAuthenticatedUser({...mockAuthenticatedUser})
}

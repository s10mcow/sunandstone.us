import { useMutation } from "@tanstack/react-query";
import { atom, useRecoilValue } from "recoil";
import { getRecoil, resetRecoil, setRecoil } from "recoil-nexus";
import { User as FirebaseUser } from "@firebase/auth";
import {
  confirmPasswordResetFirebase,
  resetFirebaseAnalyticsUserProperties,
  resetPasswordFirebase,
  setFirebaseAnalyticsUserProperties,
  signIn,
  signOutOfFirebase,
} from "./Firebase";
import { queryClient } from "./QueryClient";
import { logger } from "./Logger";

type AuthenticatedUser = {
  idToken: string;
  email: string | null;
};

export const authenticatedUserState = atom<AuthenticatedUser | undefined>({
  key: "authenticatedUserState",
  default: undefined,
});

export function useAuthenticatedUser() {
  return useRecoilValue(authenticatedUserState);
}

export function getAuthenticatedUser() {
  return getRecoil(authenticatedUserState);
}

export function setAuthenticatedUser({ user }: { user: AuthenticatedUser }) {
  setRecoil(authenticatedUserState, user);
}

export function resetAuthenticatedUser() {
  resetRecoil(authenticatedUserState);
}

export async function handleAuthChange(user: FirebaseUser | null) {
  try {
    if (user) {
      const idToken = await user.getIdToken();
      setAuthenticatedUser({
        user: { idToken, email: user.email },
      });
      setFirebaseAnalyticsUserProperties({ userUid: user.uid });
    } else if (getAuthenticatedUser()) {
      resetAuthenticatedUser();
      resetFirebaseAnalyticsUserProperties();
      // If there was a user and now there isn't, reset the user and remove all queries to ensure we're not caching
      // data that should be private
      queryClient.removeQueries();
    }
  } catch (error) {
    logger.error({
      message: "An unexpected error occurred handling auth change",
      error: error,
    });
  }
}

export async function submitLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await signIn({ email, password });
}

export function useLoginMutation({ onSuccess }: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: submitLogin,
    mutationKey: ["login"],
    onSuccess,
  });
}

export function useResetPasswordMutation({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) {
  return useMutation({
    mutationFn: resetPassword,
    mutationKey: ["resetPassword"],
    onSuccess,
    onError,
  });
}

export async function resetPassword({ email }: { email: string }) {
  await resetPasswordFirebase(email);
}

export function useConfirmResetPasswordMutation({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (e: unknown) => void;
}) {
  return useMutation({
    mutationFn: confirmResetPassword,
    mutationKey: ["confirmResetPassword"],
    onSuccess,
    onError,
  });
}

export async function confirmResetPassword({
  oobCode,
  password,
}: {
  oobCode: string;
  password: string;
}) {
  await confirmPasswordResetFirebase({
    oobCode: oobCode,
    password,
  });
}

export async function signOut() {
  await signOutOfFirebase();
}

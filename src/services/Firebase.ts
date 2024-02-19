import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, setUserId } from "firebase/analytics";
import {
  confirmPasswordReset,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from "@firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { FirebaseError } from "@firebase/util";
import { getAnalytics } from "@firebase/analytics";
import { appConfig } from "./AppConfig";
import { logger } from "./Logger";

let firebaseApp: FirebaseApp | undefined;
let firebaseAuth: ReturnType<typeof getAuth> | undefined;
let analytics: Analytics | undefined;

export function getFirebaseApp() {
  if (!firebaseApp) {
    firebaseApp = initializeApp(appConfig.firebaseOptions);
  }
  return firebaseApp;
}

export function getFirebaseAnalytics() {
  if (!analytics) {
    analytics = getAnalytics(getFirebaseApp());
  }
  return analytics;
}

export function setFirebaseAnalyticsUserProperties({
  userUid,
}: {
  userUid: string;
}) {
  const analytics = getFirebaseAnalytics();
  setUserId(analytics, userUid);
}
export function resetFirebaseAnalyticsUserProperties() {
  const analytics = getFirebaseAnalytics();
  setUserId(analytics, null);
}

export const useFirebaseInitialization = ({
  onAuthChange,
}: {
  onAuthChange: (user: User | null) => Promise<void>;
}) => {
  useEffect(() => {
    firebaseApp = getFirebaseApp();
  }, []);

  const { isAuthInitialized } = useFirebase({ onAuthChange });

  return { isFirebaseInitialized: isAuthInitialized && !!firebaseApp };
};

export function useFirebase({
  onAuthChange,
}: {
  onAuthChange: (user: User | null) => Promise<void>;
}) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribeStateChange = auth.onAuthStateChanged(
      async (user) => {
        await onAuthChange(user);
        setIsAuthInitialized(true);
      },
      (error) => {
        logger.error({ message: "An error during auth state change", error });
      },
    );

    const unsubscribeTokenChange = auth.onIdTokenChanged(
      async (user) => {
        await onAuthChange(user);
        setIsAuthInitialized(true);
      },
      (error) => {
        logger.error({ message: "An error during id token change", error });
      },
    );

    return () => {
      unsubscribeStateChange();
      unsubscribeTokenChange();
    };
  }, []);

  return { isAuthInitialized };
}

export function getFirebaseAuth() {
  if (firebaseAuth) {
    return firebaseAuth;
  }
  firebaseAuth = getAuth(firebaseApp);
  firebaseAuth.tenantId = appConfig.googleTenantId;
  return firebaseAuth;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutOfFirebase() {
  const auth = getFirebaseAuth();
  await auth.signOut();
}

export async function resetPasswordFirebase(email: string) {
  const auth = getFirebaseAuth();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    logger.error({ message: "Error sending password reset email", error });
    throw error;
  }
}

export async function confirmPasswordResetFirebase({
  oobCode,
  password,
}: {
  oobCode: string;
  password: string;
}) {
  const auth = getFirebaseAuth();
  try {
    await confirmPasswordReset(auth, oobCode, password);
  } catch (error) {
    logger.error({ message: "Error confirming password reset", error });
    throw error;
  }
}

const SOMETHING_UNEXPECTED_ERROR_MESSAGE =
  "Something unexpected occurred try again later";

const EXPECTED_FIREBASE_ERRORS = [
  "auth/user-not-found",
  "auth/wrong-password",
  "auth/too-many-requests",
];

export function useFirebaseAuthErrorMessage(
  error: unknown | Error | FirebaseError,
) {
  useEffect(() => {
    if (
      error &&
      error instanceof FirebaseError &&
      !EXPECTED_FIREBASE_ERRORS.includes(error.code)
    ) {
      logger.error({
        message: "Login failed with unknown firebase error",
        error,
        data: { errorCode: error.code },
      });
    } else {
      logger.error({
        message: "Login failed with unknown error",
        error,
      });
    }
  }, [error]);

  return useMemo(() => {
    if (!error) return "";

    // noinspection SuspiciousTypeOfGuard
    if (error instanceof FirebaseError) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        return "Your email or password is incorrect";
      } else if (error.code === "auth/too-many-requests") {
        return "Too many attempts, please try again later";
      } else {
        return SOMETHING_UNEXPECTED_ERROR_MESSAGE;
      }
    } else {
      return SOMETHING_UNEXPECTED_ERROR_MESSAGE;
    }
  }, [error]);
}

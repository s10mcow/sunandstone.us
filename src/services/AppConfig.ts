import { FirebaseOptions } from "@firebase/app";

type AppConfig = {
  muiLicenseKey: string;
  stage: string;
  baseUrl: string;
  sentryDsn?: string;
  googleTenantId: string;
  firebaseOptions: FirebaseOptions;
  googleApiKey: string;
  supportEmail: string;
};

const firebaseOptions = import.meta.env.VITE_APP_FIREBASE_OPTIONS;
export const appConfig: AppConfig = {
  muiLicenseKey:
    "2984b3e7bf15479286497629cb110e76Tz02NzY2MyxFPTE3MTcyNjY3MjMwMDAsUz1wcm8sTE09cGVycGV0dWFsLEtWPTI=",
  supportEmail: "john@example.com",
  googleApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  stage: import.meta.env.VITE_APP_STAGE || "local",
  sentryDsn: import.meta.env.VITE_APP_SENTRY_DSN,
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  googleTenantId: import.meta.env.VITE_APP_GOOGLE_TENANT_ID,
  firebaseOptions: firebaseOptions ? JSON.parse(firebaseOptions) : {},
};

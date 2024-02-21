import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";
import { appConfig } from "./AppConfig";

Sentry.init({
  dsn: appConfig.sentryDsn,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default Sentry;

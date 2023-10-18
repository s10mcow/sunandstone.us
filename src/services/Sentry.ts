import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/browser";

Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

export default Sentry;

/* eslint @typescript-eslint/no-explicit-any: "off" */
import Sentry from "./Sentry";
import { SeverityLevel } from "@sentry/react";

type LogMethod = "error" | "info" | "warn" | "debug";

type LogContent = {
    message: string;
    error?: Error | unknown | any;
    data?: any;
};

interface Logger extends LogContent {
    level: LogMethod;
}

export type GeneralLogger = {
    error: (props: LogContent) => void;
    info: (props: LogContent) => void;
    warn: (props: LogContent) => void;
    debug: (props: LogContent) => void;
};

let LOG_LEVEL = "info";
if (
    import.meta.env.LOG_LEVEL?.toLocaleLowerCase() &&
    ["error", "warn", "info", "debug"].includes(LOG_LEVEL)
) {
    LOG_LEVEL = import.meta.env.LOG_LEVEL.toLocaleLowerCase();
} else if (import.meta.env.LOG_LEVEL?.toLocaleLowerCase() === "warning") {
    LOG_LEVEL = "warn";
} else if (import.meta.env.MODE === "test") {
    LOG_LEVEL = "warn";
}

const isProduction = import.meta.env.MODE === "production";

const logLevelHierarchy = ["error", "warn", "info", "debug"];
const enabledLogMethods = logLevelHierarchy.slice(
    0,
    logLevelHierarchy.indexOf(LOG_LEVEL) + 1,
);

function logToSentry({ message, data, level, error }: Logger) {
    const severityLevel: SeverityLevel = level === "warn" ? "warning" : level;
    Sentry.addBreadcrumb({ message, data, level: severityLevel });
    if (error) {
        Sentry.captureException(error);
    }
}

function logToConsole({ message, data, error, level }: Logger) {
    const logParams = {} as LogContent;
    let decoratedData = data;

    if (error) {
        logParams.error = error;
    }
    if (error?.response) {
        decoratedData = {
            ...(decoratedData || {}),
            response: {
                data: error.response.data,
                status: error.response.status,
                url: error.response?.request?.responseURL,
            },
        };
    }
    if (message) logParams.message = message;
    if (decoratedData) logParams.data = decoratedData;

    const consoleFn = level || LOG_LEVEL;

    // eslint-disable-next-line no-console
    console[consoleFn](logParams);
}

function logMethod({ message, data, error, level }: Logger): void {
    if (!enabledLogMethods.includes(level)) return;

    logToSentry({ message, data, error, level });
    if (!isProduction) {
        logToConsole({ message, data, error, level });
    }
}

function getLogger(): GeneralLogger {
    return {
        error: ({ message, data, error }: LogContent) =>
            logMethod({ message, data, error, level: "error" }),
        info: ({ message, data, error }: LogContent) =>
            logMethod({ message, data, error, level: "info" }),
        warn: ({ message, data, error }: LogContent) =>
            logMethod({ message, data, error, level: "warn" }),
        debug: ({ message, data, error }: LogContent) =>
            logMethod({ message, data, error, level: "debug" }),
    };
}

export const logger = getLogger();

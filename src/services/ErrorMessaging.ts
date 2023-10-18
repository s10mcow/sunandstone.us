import { AxiosError } from "axios";
import React from "react";
import { logger } from "./Logger.ts";
import { useSnackbar } from "notistack";

const UNKNOWN_ERROR = "An unknown error has occurred. Please try again later.";

// Dictionary of error codes returned from the server and their corresponding error messages
export const errorMessageDictionary = {
  UNKNOWN_ERROR,
  // TODO: Add error codes here, Example:
  // "SE-E0001": UNKNOWN_ERROR,
};

export type ERROR_CODE = keyof typeof errorMessageDictionary;

// This is the type that should be returned from the API in the event of an error
export const APP_API_ERROR_TYPE = "AppApiError";

export type AppApiError = {
  code: ERROR_CODE;
  details: string;
  message: string;
  type: "AppApiError";
};
export type AxiosErrorWithAppApiResponse = AxiosError<AppApiError>;

export function getAppApiError(error: unknown): undefined | AppApiError {
  const appAxiosError = error as AxiosErrorWithAppApiResponse;

  const isAppApiError =
    appAxiosError?.response?.data?.type === APP_API_ERROR_TYPE;

  if (appAxiosError && isAppApiError) {
    return appAxiosError?.response?.data;
  }
}

type OnErrorHandler<TError = AppApiError | unknown> = ({
  AppApiError,
  error,
  defaultHandler,
}: {
  AppApiError: ReturnType<typeof getAppApiError>;
  error: TError;
  //  The default handler is provided to onError so that the default error handler can be called if the custom error handler does not handle the error.
  defaultHandler(): void;
}) => void;

type ErrorHandlerProps<TError> = {
  // id is used for logging purposes
  id?: string;
  error: TError;
  onError?: OnErrorHandler<TError>;
};

/**
 * This hook is used to handle errors from the App API. It assumes the API is returning error codes and an error type. It will log the error and display a snackbar message.
 */
function useErrorHandler<TError = AppApiError | unknown>(
  props: ErrorHandlerProps<TError>,
): void {
  const { id, error, onError } = props;

  const { enqueueSnackbar } = useSnackbar();

  const defaultOnErrorHandler = React.useCallback<OnErrorHandler>(
    ({ AppApiError, error }) => {
      if (AppApiError && errorMessageDictionary[AppApiError.code]) {
        enqueueSnackbar({
          message: errorMessageDictionary[AppApiError.code],
          variant: "error",
        });
      } else {
        logger.error({
          message: `An unknown error encountered`,
          error,
          data: {
            errorId: id,
          },
        });
        enqueueSnackbar({
          message: errorMessageDictionary.UNKNOWN_ERROR,
          variant: "error",
        });
      }
    },
    [],
  );

  React.useEffect(() => {
    if (error) {
      const errorHandler = onError || defaultOnErrorHandler;
      return errorHandler({
        AppApiError: getAppApiError(error),
        error,
        defaultHandler: () => {
          defaultOnErrorHandler({
            AppApiError: getAppApiError(error),
            error,
            defaultHandler: () => {},
          });
        },
      });
    }
  }, [error]);
}

export const useAppErrorHandlers = (
  params: ErrorHandlerProps<AppApiError | unknown>[],
) => params.forEach((param) => useErrorHandler(param));

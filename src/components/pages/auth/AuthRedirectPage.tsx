import { useLocation } from "react-router";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useAppNavigate } from "../../../services/Navigation";
import { logger } from "../../../services/Logger";
import { LoadingWrapper } from "../../common/loader/LoadingWrapper";

export function AuthRedirectPage() {
  const location = useLocation();

  const appNavigate = useAppNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    const oobCode = queryParams.get("oobCode");

    switch (mode) {
      case "resetPassword":
        if (!oobCode) {
          enqueueSnackbar("Invalid reset password link", { variant: "error" });
          return;
        }
        appNavigate.toChangePassword({ oobCode });
        break;
      default:
        logger.error({ message: "Invalid redirect link", data: { location } });
        enqueueSnackbar("Invalid redirect link", {
          variant: "error",
        });
        appNavigate.toHome();
        break;
    }
  }, [location]);

  return <LoadingWrapper visible={true}>Redirecting...</LoadingWrapper>;
}

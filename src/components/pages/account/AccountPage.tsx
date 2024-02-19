import { useEffect, useState } from "react";
import { useAuthenticatedUser } from "../../../services/Authentication";
import EmailChangeModal from "./LogoutModal";
import { useAppNavigate } from "../../../services/Navigation";
import { useSnackbar } from "notistack";
import { logger } from "../../../services/Logger";
import { queryClient } from "../../../services/QueryClient";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UpdateAccountForm,
  UpdateAccountFormValues,
  updateUserSchema,
} from "./UpdateUserForm";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { LoadingWrapper } from "components/common/loader/LoadingWrapper";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import {
  getGetUserQueryKey,
  useUpdateUser,
} from "@thesparklaboratory/teetimeportal-react-query-client";
import { useUser } from "../../../services/User";

export function AccountPage() {
  const navigator = useAppNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const authenticatedUser = useAuthenticatedUser();
  const [currentTab, setCurrentTab] = useState("profile");

  const { data: userResponse } = useUser();
  const user = userResponse?.data;
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateUser, isPending: isUpdatePending } = useUpdateUser({
    mutation: {
      onSuccess: () => {
        enqueueSnackbar("Profile has been updated", {
          variant: "success",
        });
      },
      onError: (error: unknown) => {
        enqueueSnackbar("Profile was not updated, please try again", {
          variant: "error",
        });
        logger.error({ message: "Error updating user", error });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: getGetUserQueryKey() });
      },
    },
  });

  const getUpdateUserDefaultValues = () => {
    const city = user?.address?.city || "";
    const region = user?.address?.region || "";
    return {
      first: user?.firstName || "",
      last: user?.lastName || "",
      email: user?.email || "",
      location: {
        description: city && region ? `${city}, ${region}` : "",
        geocode: { lat: 0, lng: 0 },
        address: {
          city: city || "",
          region: region || "",
        },
      },
    };
  };

  const updateUserForm = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues: getUpdateUserDefaultValues(),
  });

  useEffect(() => {
    if (user) {
      updateUserForm.reset(getUpdateUserDefaultValues());
    }
  }, [user]);

  const handleUpdateUserSubmit = updateUserForm.handleSubmit(
    (updateAccountForm: UpdateAccountFormValues) => {
      updateUser(
        {
          data: {
            email: updateAccountForm.email,
            address: {
              ...updateAccountForm.location.address,
              latitude: updateAccountForm.location.geocode.lat,
              longitude: updateAccountForm.location.geocode.lng,
            },
            firstName: updateAccountForm.first,
            lastName: updateAccountForm.last,
          },
        },
        {
          onSuccess: async () => {
            if (authenticatedUser?.email !== updateAccountForm.email) {
              setShowLogoutModal(true);
            }
          },
        },
      );
    },
  );

  return (
    <>
      <EmailChangeModal
        open={showLogoutModal}
        handleClose={() => navigator.toLogin()}
      />
      <LoadingWrapper visible={isUpdatePending}>
        <Box flex={1} mt={9}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{
                bgcolor: "green.primary",
                color: "text.primary",
                width: 100,
                height: 100,
              }}
            >
              <Typography variant={"h2"}>
                {user?.firstName?.charAt(0)?.toUpperCase()}
                {user?.lastName?.charAt(0)?.toUpperCase()}
              </Typography>
            </Avatar>
          </Box>
          <Typography variant={"h3"} align={"center"} gutterBottom>
            {user?.firstName} {user?.lastName}
          </Typography>

          <TabContext value={currentTab}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                ".MuiTabs-flexContainer": { justifyContent: "center" },
                ".MuiButtonBase-root": {
                  textTransform: "none",
                  color: "text.grey",
                },
                ".Mui-selected": {
                  color: "text.primary",
                },
              }}
            >
              <TabList onChange={(event, value) => setCurrentTab(value)}>
                <Tab label="Profile" value="profile" />
              </TabList>
            </Box>
            <TabPanel value={"profile"}>
              <Container maxWidth="sm">
                <UpdateAccountForm
                  onSubmit={handleUpdateUserSubmit}
                  control={updateUserForm.control}
                />
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </LoadingWrapper>
    </>
  );
}

export default AccountPage;

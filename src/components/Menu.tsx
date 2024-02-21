import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RouterLink } from "./common/link/RouterLink";
import { ExitToApp, Person } from "@mui/icons-material";
import { useUser } from "../services/User";
import { useAppErrorHandlers } from "../services/ErrorMessaging";
import { useAppNavigate } from "../services/Navigation";
import { logClickEvent } from "../services/Analytics";
import { signOut } from "../services/Authentication";
const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: 326,
      paddingRight: 3,
      paddingLeft: 3,
    }}
  >
    {children}
  </Box>
);

const RouterLinkStyled = styled(RouterLink)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.primary,
  cursor: "pointer",
  textDecoration: "none",
}));

const PersonIcon = styled(Person)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(3),
  borderRadius: "50%",
  width: 52,
  height: 52,
  padding: 13,
  border: `1px solid ${theme.palette.text.secondary}`,
  background: "transparent",
}));

const AccountLink = styled(RouterLink)(({ theme }) => ({
  fontWeight: "bold",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  textDecoration: "none",
}));

export const Menu = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const { data: userResponse, error: userError } = useUser();
  const user = userResponse?.data;
  useAppErrorHandlers([{ error: userError, id: "user" }]);
  const navigate = useAppNavigate();
  const [logOutError, setLogOutError] = useState("");

  const handleSignOut = async () => {
    try {
      logClickEvent({
        label: "Menu-LogOut",
        category: "navigation",
      });
      await signOut();
      navigate.toHome();
    } catch (error) {
      setLogOutError("error signing out");
    }
  };

  const element = user?.email ? (
    <Box onClick={toggleDrawer}>
      <Container>
        <PersonIcon />
        <Typography sx={{ marginTop: 1 }} variant="subtitle1">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Container>
      <Divider />
      <Container>
        <RouterLinkStyled color="textSecondary" to="/account">
          <PersonIcon sx={{ marginRight: 1 }} />
          My Account
        </RouterLinkStyled>
      </Container>
      <Divider />
      <Container>
        <RouterLinkStyled onClick={handleSignOut} color="textSecondary" to="/">
          <ExitToApp sx={{ marginRight: 1 }} />
          Log Out{" "}
        </RouterLinkStyled>
        {logOutError && <Typography color="error">{logOutError}</Typography>}
      </Container>
    </Box>
  ) : (
    <Box>
      <Container>
        <PersonIcon />
        <AccountLink
          onClick={() => {
            toggleDrawer();
            logClickEvent({
              label: "menu-create-action",
              category: "navigation",
            });
          }}
          color="textSecondary"
          to="/create-account"
        >
          + Create an Account
        </AccountLink>
      </Container>
      <Divider />
      <Container>
        <RouterLinkStyled
          onClick={() => {
            toggleDrawer();
            logClickEvent({
              label: "menu-login",
              category: "navigation",
            });
          }}
          to="/login"
        >
          Login
        </RouterLinkStyled>
      </Container>
    </Box>
  );

  return element;
};

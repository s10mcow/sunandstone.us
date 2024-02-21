import { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppNavigate } from "../services/Navigation";
import { logClickEvent } from "services/Analytics";
import ReactIcon from "assets/icons/react.svg";
import { Menu } from "./Menu";

export const NavMenu = () => {
  const navigate = useAppNavigate();
  const [isOpen, toggle] = useState(false);

  const toggleDrawer = () => {
    logClickEvent({
      label: `nav-menu-hamburger-${isOpen ? "close" : "open"}`,
      category: "navigation",
    });
    toggle(!isOpen);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <SvgIcon
            component={"div"}
            sx={{
              height: 51,
              display: "flex",
              alignItems: "center",
              width: "auto",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              logClickEvent({ label: "nav-menu-Logo", category: "navigation" });
              navigate.toHome();
            }}
          >
            {ReactIcon}
          </SvgIcon>
          <IconButton
            edge="end"
            onClick={toggleDrawer}
            color="inherit"
            aria-label="menu"
            sx={{
              borderColor: "text.secondary",
              border: "1px solid",
              color: "#000000",
            }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
          >
            <Menu toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

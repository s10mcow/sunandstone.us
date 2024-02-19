import { Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "./common/link/Link";
import { appConfig } from "../services/AppConfig";
import { logClickEvent } from "../services/Analytics";
import { useMemo } from "react";

const Wrapper = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1.6),
  paddingBottom: theme.spacing(1.6),
}));

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const RightText = styled(Typography)({
  color: "#908E8E",
  margin: "auto",
});

const LinkText = styled(Link)({
  fontWeight: "bold",
  color: "#3A3335",
  marginRight: "14px",
  marginTop: "10px",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },
});

export function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <Wrapper>
      <Content>
        <RightText>
          ©{currentYear} thesparklaboratory.com, Inc. All rights reserved
        </RightText>
        <LinkText
          href={`mailto:${appConfig.supportEmail}?subject=Feedback&body=`}
          onClick={() =>
            logClickEvent({
              label: "footer-feedback",
              category: "support",
            })
          }
        >
          Give us feedback
        </LinkText>
      </Content>
    </Wrapper>
  );
}

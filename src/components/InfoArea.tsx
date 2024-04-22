import React from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { SvgIconProps } from "@mui/material/SvgIcon";

// Define the base styles for the InfoArea component
const PREFIX = "InfoArea";
const classes = {
  infoArea: `${PREFIX}-infoArea`,
  iconWrapper: `${PREFIX}-iconWrapper`,
  iconWrapperVertical: `${PREFIX}-iconWrapperVertical`,
  icon: `${PREFIX}-icon`,
  iconVertical: `${PREFIX}-iconVertical`,
  descriptionWrapper: `${PREFIX}-descriptionWrapper`,
  title: `${PREFIX}-title`,
  description: `${PREFIX}-description`,
  primary: `${PREFIX}-primary`,
  warning: `${PREFIX}-warning`,
  danger: `${PREFIX}-danger`,
  success: `${PREFIX}-success`,
  info: `${PREFIX}-info`,
  rose: `${PREFIX}-rose`,
  gray: `${PREFIX}-gray`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.infoArea}`]: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "0px",
  },
  [`& .${classes.iconWrapper}`]: {
    float: "left",
    marginTop: "24px",
    marginRight: "10px",
  },
  [`&.${classes.iconWrapperVertical}`]: {
    float: "none",
  },
  [`& .${classes.icon}`]: {
    width: "36px",
    height: "36px",
  },
  [`&.${classes.iconVertical}`]: {
    marginTop: "0px",
  },
  [`& .${classes.descriptionWrapper}`]: {
    color: theme.palette.text.primary,
  },
  [`& .${classes.title}`]: {
    color: theme.palette.text.primary,
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
    textDecoration: "none",
  },
  [`& .${classes.description}`]: {
    color: theme.palette.text.secondary,
    overflow: "hidden",
    marginTop: "0px",
    fontSize: "14px",
  },
  // Color classes
  [`&.${classes.primary}`]: {
    color: theme.palette.primary.main,
  },
  [`&.${classes.warning}`]: {
    color: theme.palette.warning.main,
  },
  [`&.${classes.danger}`]: {
    color: theme.palette.error.main,
  },
  [`&.${classes.success}`]: {
    color: theme.palette.success.main,
  },
  [`&.${classes.info}`]: {
    color: theme.palette.info.main,
  },
  [`&.${classes.rose}`]: {
    color: theme.palette.secondary.main,
  },
  [`&.${classes.gray}`]: {
    color: theme.palette.grey[500],
  },
}));

export default function InfoArea(props: InfoAreaProps) {
  const {
    icon: Icon,
    title,
    description,
    iconColor = "gray",
    vertical,
  } = props;
  const iconWrapperClasses = clsx(classes.iconWrapper, classes[iconColor], {
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = clsx(classes.icon, { [classes.iconVertical]: vertical });

  return (
    <Root className={classes.infoArea}>
      <div className={iconWrapperClasses}>
        <Icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </Root>
  );
}

export interface InfoAreaProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  description: string;
  iconColor?:
    | "primary"
    | "warning"
    | "danger"
    | "success"
    | "info"
    | "rose"
    | "gray";
  vertical: boolean;
}

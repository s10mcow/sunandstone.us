import { Link as RrdLink, LinkProps as RrdLinkProps } from "react-router-dom";
import { Link, LinkProps } from "./Link";

export type RouterLinkProps = RrdLinkProps & LinkProps;
export const RouterLink = (props: RouterLinkProps) => {
  return <Link {...{ component: RrdLink, ...props }} />;
};

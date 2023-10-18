import {
    Link as MaterialLink,
    LinkProps as MaterialLinkProps,
} from "@mui/material";

export type LinkProps = MaterialLinkProps;

export function Link(props: LinkProps) {
    return (
        <MaterialLink {...props}/>
    );
}

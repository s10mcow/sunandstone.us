import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export type ButtonProps = LoadingButtonProps;
export const Button = (props: ButtonProps) => <LoadingButton {...props} />;

export default Button;

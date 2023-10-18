import {TextField, TextFieldProps} from "@mui/material";
import {Control, Controller, FieldValues, Path} from "react-hook-form";


export type TextFieldWithControllerProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
} & Pick<
    TextFieldProps,
    | "helperText"
    | "type"
    | "required"
    | "label"
    | "fullWidth"
    | "placeholder"
    | "disabled"
>;

export function TextFieldWithController<T extends FieldValues>({
                                                                   control,
                                                                   fullWidth = true,
                                                                   helperText,
                                                                   label,
                                                                   name,
                                                                   required,
                                                                   type,
                                                                   placeholder,
                                                                   disabled,
                                                               }: TextFieldWithControllerProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{required}}
            render={({field, fieldState}) => {
                const {name, ref, onBlur, onChange, value = ""} = field;
                return (
                    <TextField
                        {...{
                            error: Boolean(fieldState.error),
                            fullWidth,
                            placeholder,
                            helperText: fieldState?.error?.message || helperText,
                            label,
                            name,
                            disabled,
                            onBlur,
                            onChange,
                            ref,
                            value,
                            type,
                        }}
                    />
                );
            }}
        />
    );
}

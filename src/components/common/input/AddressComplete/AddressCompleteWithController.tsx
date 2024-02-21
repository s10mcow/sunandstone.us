import { Control, FieldValues, Path, Controller } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { AddressComplete } from "./AddressComplete";

type AddressCompleteProps<T extends FieldValues> = {
  control: Control<T>;
  required?: boolean;
  name: Path<T>;
} & Pick<TextFieldProps, "InputProps">;

export function AddressCompleteWithController<T extends FieldValues>({
  control,
  required,
  name,
  InputProps,
}: AddressCompleteProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <AddressComplete
            name={name}
            defaultValue={value}
            onChange={onChange}
            error={Boolean(error)}
            InputProps={InputProps}
          />
        );
      }}
    />
  );
}

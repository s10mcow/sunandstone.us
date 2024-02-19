import { Select, SelectProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

export type SelectFieldWithController<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
} & Pick<SelectProps, "children">;
export function SelectWithController<T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: SelectFieldWithController<T>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, name, value } }) => {
        return (
          <Select
            {...{
              name,
              onChange: (e) => onChange(e.target.value),
              value,
              ...rest,
            }}
          />
        );
      }}
    />
  );
}

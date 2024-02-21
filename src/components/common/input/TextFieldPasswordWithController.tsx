import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TextFieldWithControllerProps } from "./TextFieldWithController";

export function TextFieldPasswordWithController<T extends FieldValues>({
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
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field, fieldState }) => {
        const { name, ref, onBlur, onChange, value = "" } = field;
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
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
}

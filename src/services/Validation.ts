import * as yup from "yup";

export const emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
export const emailRegexp = new RegExp(emailPattern);

export const passwordSchema = yup
  .string()
  .required("Password is required")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(
    /[a-zA-Z]+[^a-zA-Z\s]+/,
    "Password must contain at least one special character",
  )
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

export const emailSchema = yup
  .string()
  .matches(emailRegexp, "Invalid email address")
  .required("Email is required");

export const locationSchema = yup.object({
  address: yup.object({
    city: yup.string().required("Location is required"),
    region: yup.string().required("Location is required"),
  }),
  description: yup.string().required("Location is required"),
  geocode: yup
    .object({
      lat: yup.number().required("Location is required"),
      lng: yup.number().required("Location is required"),
    })
    .required("Location is required"),
});

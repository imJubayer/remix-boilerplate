import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short"),
  redirectTo: yup.string(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  redirectTo: yup.string(),
});

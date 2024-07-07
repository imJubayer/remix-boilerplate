import * as yup from "yup";
import { getUserByEmail } from "~/models/user.server";

yup.addMethod(yup.string, "emailExists", function (message) {
  return this.test("email-exists", message, async function (value) {
    const { path, createError } = this;
    const user = value && (await getUserByEmail(value));
    return user
      ? createError({ path, message: message || "Email is already in use" })
      : true;
  });
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailExists(),
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

export const profileUpdateSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.string(),
  gender: yup.string(),
  age: yup.number(),
});

import * as yup from "yup";
import { getRole } from "~/models/role.server";
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

yup.addMethod(yup.string, "roleExist", function (message) {
  return this.test("role-exist", message, async function (value) {
    const { path, createError } = this;
    const role = value && (await getRole(value));
    return role
      ? createError({ path, message: message || "Role not found" })
      : true;
  });
});

export const addUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailExists(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  gender: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short"),
  redirectTo: yup.string(),
  role: yup.string().required("Role is required").roleExist(),
  status: yup.string(),
});

export const updateUserSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  gender: yup.string(),
  redirectTo: yup.string(),
  role: yup.string().required("Role is required").roleExist(),
  status: yup.string(),
});

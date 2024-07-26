import * as yup from "yup";
import { getUserByEmail } from "~/models/user.server";
import {
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_MAX_IMAGE_SIZE,
} from "~/utils/helper.server";

yup.addMethod(yup.string, "emailInUse", function (message) {
  return this.test("email-in-use", message, async function (value) {
    const { path, createError } = this;
    const user = value && (await getUserByEmail(value));
    return user
      ? createError({ path, message: message || "Email is already in use" })
      : true;
  });
});

yup.addMethod(yup.string, "emailExist", function (message) {
  return this.test("email-exist", message, async function (value) {
    const { path, createError } = this;
    const user = value && (await getUserByEmail(value));
    return user
      ? true
      : createError({ path, message: message || "Email doesn't exist" });
  });
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailInUse(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short"),
  account_type: yup.string().required(),
  redirectTo: yup.string(),
});

export const businessUserSignUpSchema = yup.object().shape({
  business_name: yup.string().required("Business name is required"),
  business_number: yup.string().required("Business number is required"),
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailInUse(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short"),
  account_type: yup.string().required(),
  redirectTo: yup.string(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  redirectTo: yup.string(),
});

export const fogotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailExist(),
});

export const profileUpdateSchema = yup.object().shape({
  user_id: yup.string().required("First name is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  profile_image: yup
    .mixed<File>()
    .nonNullable()
    .test(
      "type",
      "Image type must be jpg, jpeg or png",
      (value: File | undefined): boolean => {
        if (!value || (value instanceof Blob && value.size === 0)) return true;
        return SUPPORTED_IMAGE_TYPES.includes(value.type);
      },
    )
    .test(
      "size",
      "Image size must be less than or equal to 5MB",
      (value: File | undefined): boolean => {
        if (!value || (value instanceof Blob && value.size === 0)) return true;
        return value.size <= SUPPORTED_MAX_IMAGE_SIZE;
      },
    ),
  // phone: yup.string(),
  // gender: yup.string(),
  // age: yup.number(),
});

export const changePasswordSchema = yup.object().shape({
  user_id: yup.string().required("User id is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

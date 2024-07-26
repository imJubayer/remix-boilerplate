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

export const businessProfileUpdateSchema = yup.object().shape({
  id: yup.string().required("Business id is required"),
  user_id: yup.string().required("User id is required"),
  name: yup.string().required("Business name is required"),
  category_id: yup.string().required("Business category is required"),
  phone: yup.string().required("Business phone is required"),
  email: yup.string().required("Business email is required"),
  subscription: yup.string(),
  website_url: yup.string(),
  owner_name: yup.string(),
  contact_number: yup.string(),
  tax_identification_number: yup.string(),
  operating_hours: yup.string(),
  payment_information: yup.string(),
  post_code: yup.string(),
  address: yup.string(),
  country: yup.string(),
});

export const businessTeamMemberSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .emailExists(),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone is required"),
  business_id: yup.string().required("Business id is required"),
  created_by: yup.string().required("User id is required"),
});

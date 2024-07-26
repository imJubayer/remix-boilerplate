import * as yup from "yup";
import { prisma } from "~/db.server";

yup.addMethod(yup.string, "roleNameExist", function (message) {
  return this.test("role-name-exist", message, async function (value) {
    const { path, createError } = this;
    const role = await prisma.role.findUnique({ where: { name: value } });
    return role
      ? createError({ path, message: message || "Role name already exist" })
      : true;
  });
});

export const roleSchema = yup.object().shape({
  name: yup.string().required("Role name is required").roleNameExist(),
  description: yup.string(),
});

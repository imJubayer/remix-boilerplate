import * as yup from "yup";
import { prisma } from "~/db.server";

yup.addMethod(yup.string, "emailExists", function (message) {
  return this.test("email-exists", message, async function (value) {
    const { path, createError } = this;

    const user = await prisma.user.findUnique({
      where: { email: value },
    });

    if (user) {
      return createError({
        path,
        message: message || "Email is already in use",
      });
    }
    return true;
  });
});

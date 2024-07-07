import { getUser } from "~/session.server";
import {
  getAllUser,
  deleteUser,
  adminRegister,
  updateUser,
} from "~/models/user.server";
import { hasPermission, abort } from "~/utils";
import { addUserSchema, updateUserSchema } from "~/schema/userValidation";
import * as yup from "yup";

class UserService {
  async fetchUsers(request: Request) {
    const user = await getUser(request);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";

    if (!hasPermission(user, ["view-users"])) {
      abort(403);
    }

    const { users, total } = await getAllUser(page, limit, search);
    return { users, total };
  }

  async removeUser(request: Request) {
    const formData = await request.formData();
    const userId = formData.get("userId");

    if (typeof userId === "string") {
      await deleteUser(userId);
    }
    return { success: true, msg: "User deleted successfully" };
  }

  async addUser(request: Request) {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.password = "12345678";
    try {
      const validatedData = await addUserSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const user = await adminRegister(validatedData);
      return { user };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        return { errors: errorFields, status: 422 };
      }
      return { errors: error, status: 422 };
    }
  }

  async updateUser(userId: string, request: Request) {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await updateUserSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const user = await updateUser(userId, validatedData);
      return { user };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        return { errors: errorFields, status: 422 };
      }
      return { errors: error, status: 422 };
    }
  }
}

export default new UserService();

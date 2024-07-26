import { getUser } from "~/session.server";
import {
  getAllUser,
  deleteUser,
  adminRegister,
  updateUser,
  changePassword,
  statusToggle,
} from "~/models/user.server";
import { hasPermission, abort, handleResponse } from "~/utils";
import { addUserSchema, updateUserSchema } from "~/schema/user.validation";
import * as yup from "yup";
import { ResponseFormat } from "~/types/common";
import { updateUserProfile } from "~/models/profile.server";
import {
  changePasswordSchema,
  profileUpdateSchema,
} from "~/schema/authentication.validation";
import { deleteRole, getRoles } from "~/models/role.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { request } from "http";
import roles from "~/routes/roles";

class UserService {
  async fetchUsers(request: Request) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";

    const { users, total } = await getAllUser(page, limit, search);
    return { users, total, page, limit };
  }

  async removeUser(request: Request) {
    const formData = await request.formData();
    const userId = formData.get("userId");

    if (typeof userId === "string") {
      await deleteUser(userId);
    }
    return { success: true, msg: "User deleted successfully" };
  }

  async addUser(request: Request): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.password = "12345678";
    try {
      const validatedData = await addUserSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const user = await adminRegister(validatedData);
      return handleResponse({
        success: true,
        msg: "User created succesfully",
        status: 200,
        data: { user: user },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        // return { errors: errorFields, status: 422 };
        return handleResponse({
          success: false,
          msg: "Validation error",
          status: 422,
          errors: errorFields,
        });
      }
      return handleResponse({
        success: false,
        msg: "Validation error",
        status: 422,
        errors: error,
      });
    }
  }

  async updateUser(
    userId: string,
    request: Request,
  ): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await updateUserSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const user = await updateUser(userId, validatedData);
      return handleResponse({
        success: true,
        msg: "User updated succesfully",
        status: 200,
        data: { user: user },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        return handleResponse({
          success: false,
          msg: "Validation error",
          status: 422,
          errors: errorFields,
        });
      }
      return handleResponse({
        success: false,
        msg: "Validation error",
        status: 422,
        errors: error,
      });
    }
  }

  async updateProfile(request: Request): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await profileUpdateSchema.validate(formDataObject, {
        abortEarly: false,
      });
      await updateUserProfile(validatedData);
      return handleResponse({
        success: true,
        msg: "Profile succesfully updated",
        status: 200,
        data: {},
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        // return { errors: errorFields, status: 422 };
        return handleResponse({
          success: false,
          msg: "Validation error",
          status: 422,
          errors: errorFields,
        });
      }
      return handleResponse({
        success: false,
        msg: "Validation error",
        status: 422,
        errors: error,
      });
    }
  }

  async changePassword(request: Request) {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await changePasswordSchema.validate(
        formDataObject,
        {
          abortEarly: false,
        },
      );
      const { user_id, password } = validatedData;
      await changePassword(user_id, password);
      return handleResponse({
        success: true,
        msg: "Profile succesfully updated",
        status: 200,
        data: {},
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: any = {};
        error.inner.forEach((err: any) => {
          errorFields[err.path] = err.message;
        });
        // return { errors: errorFields, status: 422 };
        return handleResponse({
          success: false,
          msg: "Validation error",
          status: 422,
          errors: errorFields,
        });
      }
      return handleResponse({
        success: false,
        msg: "Validation error",
        status: 422,
        errors: error,
      });
    }
  }

  async userStatusToggle({
    request,
  }: ActionFunctionArgs): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const id = formData.get("id");
    let response;

    try {
      await statusToggle(id as string);
      response = handleResponse({
        success: true,
        msg: "User status toggled",
        data: {},
        status: 200,
      });
    } catch (error) {
      response = handleResponse({
        success: false,
        msg: "Update failed",
        status: 400,
        data: {},
        errors: error,
      });
    }
    return response;
  }

  async roles(request: Request) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;

    const { roles, total } = await getRoles(page, limit);
    return { roles, total, page, limit };
  }

  async deleteRole(request: Request) {
    const formData = await request.formData();
    const roleId = formData.get("roleId");

    if (typeof roleId === "string") {
      await deleteRole(roleId);
    }
    return { success: true, msg: "Role deleted successfully" };
  }
}

export default new UserService();

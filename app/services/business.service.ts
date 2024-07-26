import {
  businessProfileUpdateSchema,
  businessTeamMemberSchema,
} from "~/schema/business.validation";
import { ResponseFormat } from "~/types/common";
import { handleResponse } from "~/utils";
import * as yup from "yup";
import {
  addTeamMember,
  getBusinessTeamMembers,
  getFavouriteBusinesses,
  getFavouriteUsers,
  removeBusinessFromFavourite,
  removeUserFromFavourite,
  removeUserFromTeam,
  updateBusiness,
} from "~/models/business.server";
import { getUser } from "~/session.server";
import { ActionFunctionArgs } from "@remix-run/node";

class BusinessService {
  async updateBusinessInfo(request: Request): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await businessProfileUpdateSchema.validate(
        formDataObject,
        {
          abortEarly: false,
        },
      );
      const business = await updateBusiness(validatedData);
      return handleResponse({
        success: true,
        msg: "Business profile updated succesfully",
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

  async getTeamMembers(request: Request) {
    const user = await getUser(request);
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    if (user?.business) {
      const { members, total } = await getBusinessTeamMembers(
        user.business?.id,
        page,
        limit,
      );
      return { members, total, page, limit };
    }
    return { members: [], total: 0, page, limit };
  }

  async addTeamMember(request: Request): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await businessTeamMemberSchema.validate(
        formDataObject,
        {
          abortEarly: false,
        },
      );
      const teamUser = await addTeamMember(validatedData);
      return handleResponse({
        success: true,
        msg: "Team member added succesfully",
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

  async removeTeamMember({
    request,
  }: ActionFunctionArgs): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const id = formData.get("id");
    let response;

    try {
      await removeUserFromTeam(id as string);
      response = handleResponse({
        success: true,
        msg: "User removed",
        data: {},
        status: 200,
      });
    } catch (error) {
      response = handleResponse({
        success: false,
        msg: "Removed failed",
        status: 400,
        data: {},
        errors: error,
      });
    }
    return response;
  }

  // Favourite Users

  async getFavouriteUsers(request: Request) {
    const user = await getUser(request);
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    if (user?.business) {
      const { users, total } = await getFavouriteUsers(
        user.business?.id,
        page,
        limit,
      );
      return { users, total, page, limit };
    }
    return { users: [], total: 0, page, limit };
  }

  async removeUserFromFavourite({
    request,
  }: ActionFunctionArgs): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const id = formData.get("id");
    let response;

    try {
      await removeUserFromFavourite(id as string);
      response = handleResponse({
        success: true,
        msg: "User removed from favourite successfully",
        data: {},
        status: 200,
      });
    } catch (error) {
      response = handleResponse({
        success: false,
        msg: "Removed failed",
        status: 400,
        data: {},
        errors: error,
      });
    }
    return response;
  }

  // Favourite Business

  async getFavouriteBusiness(request: Request) {
    const user = await getUser(request);
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    if (user) {
      const { businesses, total } = await getFavouriteBusinesses(
        user.id,
        page,
        limit,
      );
      return { businesses, total, page, limit };
    }
    return { businesses: [], total: 0, page, limit };
  }

  async removeBusinessFromFavourite({
    request,
  }: ActionFunctionArgs): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const id = formData.get("id");
    let response;

    try {
      await removeBusinessFromFavourite(id as string);
      response = handleResponse({
        success: true,
        msg: "Business removed from favourite successfully",
        data: {},
        status: 200,
      });
    } catch (error) {
      response = handleResponse({
        success: false,
        msg: "Removed failed",
        status: 400,
        data: {},
        errors: error,
      });
    }
    return response;
  }
}

export default new BusinessService();

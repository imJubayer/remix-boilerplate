import { Category } from "@prisma/client";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { AnyObject, mixed, object, string, ValidationError } from "yup";

import {
  getCategoryById,
  getCategories,
  categoryCount,
  createCategory,
  updateCategory,
  deleteCategory,
} from "~/models/category.server";
import { handleResponse } from "~/utils";
import {
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_MAX_IMAGE_SIZE,
} from "~/utils/helper.server";

class CategoryService {
  categorySchema = object({
    name: string().required("Category name is required"),
    description: string().required("Description is required"),
    status: string().nonNullable(),
    parent: string()
      .nonNullable()
      .test(
        "validParent",
        "Invalid parent category selected",
        async (value: string | undefined): Promise<boolean> => {
          if (!value) return true;
          const parentCategory = await getCategoryById(value);
          if (parentCategory) {
            return true;
          } else {
            return false;
          }
        },
      ),
    image: mixed<File>()
      .nonNullable()
      .test(
        "type",
        "Image type must be jpg, jpeg or png",
        (value: File | undefined): boolean => {
          if (!value || (value instanceof Blob && value.size === 0))
            return true;
          return SUPPORTED_IMAGE_TYPES.includes(value.type);
        },
      )
      .test(
        "size",
        "Image size must be less than or equal to 5MB",
        (value: File | undefined): boolean => {
          if (!value || (value instanceof Blob && value.size === 0))
            return true;
          return value.size <= SUPPORTED_MAX_IMAGE_SIZE;
        },
      ),
  });

  async listLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    const categories = await getCategories(page, limit);
    const total = await categoryCount();

    return { categories, limit, page, total };
  }

  async detailsLoader({ params }: LoaderFunctionArgs) {
    if (!params.id) return redirect("/categories");

    const category = await getCategoryById(params.id);

    if (!category) {
      return redirect("/404");
    }

    return json({ category });
  }

  async editLoader({ params }: LoaderFunctionArgs) {
    const category = await getCategoryById(params.id as string);

    if (category != null) {
      let categories = await getCategories();
      categories = categories.filter((categoryFromAll) => {
        return categoryFromAll.id != category.id;
      });
      return json({ category, categories });
    } else {
      return redirect("/404");
    }
  }

  async addLoader(): Promise<Category[]> {
    return await getCategories();
  }

  async createAction({ request }: ActionFunctionArgs) {
    try {
      const formData = await request.formData();
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);

      const validatedData = await this.categorySchema.validate(formDataObject, {
        abortEarly: false,
      });

      if (await createCategory(validatedData)) {
        return redirect("/categories");
      } else {
        return handleResponse({
          success: false,
          status: 500,
          msg: "Could not create category",
        });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: AnyObject = {};
        error.inner.forEach((err: AnyObject) => {
          errors[err.path] = err.message;
        });

        return handleResponse({
          success: false,
          status: 422,
          msg: "Validation error",
          errors,
        });
      }

      return handleResponse({
        success: false,
        status: 500,
        msg: "Sorry! Could not create category.",
      });
    }
  }

  async updateAction({ request }: ActionFunctionArgs) {
    try {
      const formData = await request.formData();
      const formDataObject = Object.fromEntries(formData.entries());

      const validatedData = await this.categorySchema.validate(formDataObject, {
        abortEarly: false,
      });

      const category = await getCategoryById(formDataObject.id as string);
      if (!category) return redirect("/404");

      if (await updateCategory({ id: category.id, ...validatedData })) {
        return redirect(`/categories/${category.id}`);
      } else {
        return handleResponse({
          success: false,
          status: 500,
          msg: "Could not update category",
        });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: AnyObject = {};
        error.inner.forEach((err: AnyObject) => {
          errors[err.path] = err.message;
        });

        return handleResponse({
          success: false,
          status: 422,
          msg: "Validation error",
          errors,
        });
      }

      console.log(error);

      return handleResponse({
        success: false,
        status: 500,
        msg: "Sorry! Could not update category.",
      });
    }
  }

  async deleteAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) return redirect("/404");

    if (await deleteCategory(id as string)) {
      return redirect("/categories");
    } else {
      return redirect("/categories");
    }
  }
}

export default new CategoryService();

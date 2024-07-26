import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";

import BasicDataTable from "~/components/table/BasicDatatable";
import categoryService from "~/services/category.service";
import { categoryColumn } from "~/utils/columns/categoryColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async (loaderFunctionArgs: LoaderFunctionArgs) => {
  return json(await categoryService.listLoader(loaderFunctionArgs));
};

export const action = async (actionFunctionArgs: ActionFunctionArgs) => {
  return await categoryService.deleteAction(actionFunctionArgs);
};

export default function CategoriesIndex() {
  const submit = useSubmit();
  const { categories, limit, page, total } = useLoaderData<typeof loader>();
  const handleCategoryDelete = async (categoryId: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Delete this user?",
      "Yes, delete!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("id", categoryId);
      submit(formData, { method: "delete" });
    }
  };
  const addCategoryButton = (
    <Link to="add" type="button" className="btn btn-light-primary">
      Add Category
    </Link>
  );

  return (
    <>
      <BasicDataTable
        name="Category"
        columns={categoryColumn(handleCategoryDelete)}
        secondary={addCategoryButton}
        rows={categories}
        count={total}
        rowsPerPage={limit}
        page={page}
      />
    </>
  );
}

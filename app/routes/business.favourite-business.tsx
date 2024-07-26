import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";
import businessService from "~/services/business.service";
import { handleSuccessToast } from "~/utils";
import { FavouriteBusinessColumn } from "~/utils/columns/favouriteBusinessColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { businesses, total, page, limit } =
    await businessService.getFavouriteBusiness(request);
  return json({ businesses, total, page, limit });
};

export const action = async (actionFunctionArgs: ActionFunctionArgs) => {
  const response =
    await businessService.removeBusinessFromFavourite(actionFunctionArgs);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function FavouriteBusiness() {
  const submit = useSubmit();
  const { businesses, total, page, limit } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleFavouriteDelete = async (id: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Dislike this from favourite?",
      "Yes, dislike!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("id", id);
      submit(formData, { method: "put" });
    }
  };
  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  return (
    <BasicDataTable
      // searchable
      showSerial
      name="User Favourite Businesses"
      columns={FavouriteBusinessColumn(handleFavouriteDelete)}
      rows={businesses}
      count={total}
      page={page}
      rowsPerPage={limit}
    />
  );
}

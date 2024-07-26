import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";
import businessService from "~/services/business.service";
import { handleSuccessToast } from "~/utils";
import { FavouriteUsersColumn } from "~/utils/columns/favouriteUsersColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { users, total, page, limit } =
    await businessService.getFavouriteUsers(request);
  return json({ users, total, page, limit });
};

export const action = async (actionFunctionArgs: ActionFunctionArgs) => {
  const response =
    await businessService.removeUserFromFavourite(actionFunctionArgs);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function BusinessTeam() {
  const submit = useSubmit();
  const { users, total, page, limit } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleFavouriteDelete = async (id: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Remove this user from favourite?",
      "Yes, delete!",
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
      name="Business Favourite User's"
      columns={FavouriteUsersColumn(handleFavouriteDelete)}
      rows={users}
      count={total}
      page={page}
      rowsPerPage={limit}
    />
  );
}

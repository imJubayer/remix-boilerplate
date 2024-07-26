import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";

import userService from "~/services/user.service";
import { getUser } from "~/session.server";
import { handleSuccessToast, hasPermission, useUser } from "~/utils";
import { userColumns } from "~/utils/columns/userColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  if (!hasPermission(user, ["view-users"])) {
    return redirect("/forbidden");
  }

  const { users, total, page, limit } = await userService.fetchUsers(request);
  return json({ users, total, page, limit });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await userService.removeUser(request);
  return json(result);
};

export default function Users() {
  const user = useUser();
  const submit = useSubmit();
  const { users, total, page, limit } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleUserDelete = async (userId: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Delete this user?",
      "Yes, delete!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("userId", userId);
      submit(formData, { method: "post" });
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  const addUserButton = (
    <Link to="add" type="button" className="btn btn-light-primary">
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Add User
    </Link>
  );

  return (
    <div>
      <BasicDataTable
        showSerial
        searchable
        secondary={hasPermission(user, ["add-user"]) && addUserButton}
        columns={userColumns(handleUserDelete)}
        rows={users}
        count={total}
        page={page}
        rowsPerPage={limit}
      />
    </div>
  );
}

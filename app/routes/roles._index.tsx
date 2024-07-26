import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";

import { deleteRole, getRoles } from "~/models/role.server";
import userService from "~/services/user.service";
import { abort, handleSuccessToast, hasPermission, useUser } from "~/utils";
import { roleColumns } from "~/utils/columns/roleColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { roles, total, page, limit } = await userService.roles(request);
  return json({ roles, total, page, limit });

  // if (!hasPermission(user, ["read"])) {
  //   abort(403);
  // }
  // await requireRoles(request, ["superadmin"]);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await userService.deleteRole(request);
  return json(result);
};

export default function Roles() {
  const user = useUser();
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const { roles, total, page, limit } = useLoaderData<typeof loader>();
  const hasAddRolePermission = hasPermission(user, ["add-role"]);

  const handleRoleDelete = async (roleId: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Delete this role?",
      "Yes, delete!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("roleId", roleId);
      submit(formData, { method: "post" });
    }
  };

  useEffect(() => {
    if (actionData?.success && actionData.msg) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  const addRoleButton = (
    <Link to="add" type="button" className="btn btn-light-primary">
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Add Role
    </Link>
  );
  return (
    <div>
      <BasicDataTable
        showSerial
        secondary={hasAddRolePermission && addRoleButton}
        columns={roleColumns(handleRoleDelete)}
        rows={roles}
        count={total}
        page={page}
        rowsPerPage={limit}
        // sortables={["id", "name", "email", "status"]}
      />
    </div>
  );
}

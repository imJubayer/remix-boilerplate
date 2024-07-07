import {
  faPen,
  faPlusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Permission } from "@prisma/client";
import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";
import { getPermission, getPermissions } from "~/models/permission.server";

import { deleteRole, getRoles } from "~/models/role.server";
import { hasPermission, useUser } from "~/utils";

export const loader = async () => {
  const permissions: Permission[] = await getPermissions();

  return json({ permissions });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const roleId = formData.get("roleId");

  if (typeof roleId === "string") {
    await deleteRole(roleId);
  }

  const roles = await getRoles(); // Fetch the updated roles
  return json({ roles });
};
export const meta: MetaFunction = () => [{ title: "Permissions" }];

export default function Permissions() {
  const user = useUser();
  const { permissions } = useLoaderData<typeof loader>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleClick = () => {
    // Perform any necessary actions before navigation
    navigate("/somewhere"); // Navigate to the specified path
  };

  const addPermissionButton = (
    <Link to="sync" type="button" className="btn btn-light-primary">
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Sync Permission
    </Link>
  );
  const permissionColumns = [
    { header: "Entity", accessor: "entity", width: "30%" },
    { header: "Action", accessor: "action", width: "30%" },
    { header: "Access", accessor: "access", width: "30%" },
    {
      header: "Action",
      content: (permission: Permission) => {
        return (
          <>
            <Form method="post">
              <button
                type="submit"
                className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                disabled
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faPen} className="text-primary" />
              </button>

              <input type="hidden" name="roleId" value={permission.id} />
              <button
                type="submit"
                className="btn btn-icon btn-active-light-primary w-30px h-30px"
                disabled
              >
                <FontAwesomeIcon icon={faTrash} className="text-danger" />
              </button>
            </Form>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <BasicDataTable
        searchable
        secondary={
          hasPermission(user, ["sync-permission"]) && addPermissionButton
        }
        columns={permissionColumns}
        rows={permissions}
        count={permissions.length}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        // updateStatus={updateStatus}
        showSL={true}
        // sortables={["id", "name", "email", "status"]}
        // updateRows={(data) => setRows(data)}
      />
    </div>
  );
}

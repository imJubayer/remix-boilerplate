import {
  faPen,
  faPlusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";

import { deleteRole, getRoles } from "~/models/role.server";
import { getUser } from "~/session.server";
import { abort, hasPermission, useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  const roles: Role[] = await getRoles();
  // if (!hasPermission(user, ["read"])) {
  //   abort(403);
  // }
  // await requireRoles(request, ["superadmin"]);

  return json({ roles });
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

export default function Roles() {
  const user = useUser();
  const { roles } = useLoaderData<typeof loader>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const hasAddRolePermission = hasPermission(user, ["add-role"]);

  const addRoleButton = (
    <Link to="add" type="button" className="btn btn-light-primary">
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Add Role
    </Link>
  );
  const roleColumns = [
    { header: "Name", accessor: "name", width: "30%" },
    { header: "Description", accessor: "description", width: "30%" },
    {
      header: "Action",
      content: (role: Role) => {
        return (
          <>
            <Form method="post">
              {role.is_modifiable ? (
                <Link
                  to={role.id}
                  className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                >
                  <FontAwesomeIcon icon={faPen} className="text-primary" />
                </Link>
              ) : (
                <button
                  disabled
                  className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                >
                  <FontAwesomeIcon icon={faPen} className="text-primary" />
                </button>
              )}

              <input type="hidden" name="roleId" value={role.id} />
              <button
                disabled={!role.is_modifiable}
                type="submit"
                className="btn btn-icon btn-active-light-primary w-30px h-30px"
              >
                <FontAwesomeIcon icon={faTrash} color="red" />
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
        secondary={hasAddRolePermission && addRoleButton}
        columns={roleColumns}
        rows={roles}
        count={roles.length}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        // updateStatus={updateStatus}
        showSL={true}
        sortables={["id", "name", "email", "status"]}
        // updateRows={(data) => setRows(data)}
      />
    </div>
  );
}

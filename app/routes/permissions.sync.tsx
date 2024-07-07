import { useLoaderData, useSubmit } from "@remix-run/react";

import { Permission, Role } from "@prisma/client";
import { ActionFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { getRoles } from "~/models/role.server";
import { getUser } from "~/session.server";
import {
  addPermissionToRole,
  getPermissions,
  removePermissionFromRole,
} from "~/models/permission.server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPencil,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { abort, hasPermission } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  const roles: Role[] = await getRoles();
  const permissions: Permission[] = await getPermissions();
  if (!hasPermission(user, ["sync-permission"])) {
    abort(403);
  }
  // await requireRoles(request, ["superadmin"]);

  return json({ roles, permissions, user });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const roleId = formData.get("roleId");
  const permissionId = formData.get("permissionId");
  const connect = formData.get("connect") === "true";

  if (typeof roleId === "string" && typeof permissionId === "string") {
    if (!connect) {
      await addPermissionToRole(roleId, permissionId);
    } else {
      await removePermissionFromRole(roleId, permissionId);
    }
    return json({ success: true });
  }

  return json({ success: false }, { status: 400 });
};

function Sync() {
  const { roles, permissions, user } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const handleButtonClick = (
    roleId: Role["id"],
    permissionId: Permission["id"],
    connect = true,
  ) => {
    const formData = new FormData();
    formData.append("roleId", roleId);
    formData.append("permissionId", permissionId);
    formData.append("connect", connect ? "true" : "false");
    submit(formData, { method: "post" });
  };

  return (
    <div className="card">
      <table
        id="kt_datatable_complex_header"
        className={`table table-striped table-row-bordered gy-5 gs-7 border rounded w-100`}
      >
        <thead>
          <tr className="fw-bold fs-6 text-gray-800 px-7">
            <th
              rowSpan={2}
              className="text-center align-middle border-bottom border-end w-200px"
            >
              Name
            </th>
            <th colSpan={roles.length} className="text-center border-bottom">
              Roles
            </th>
            <th
              rowSpan={2}
              className="text-center align-middle border-bottom border-start w-200px"
            >
              Action
            </th>
          </tr>
          <tr className="fw-bold fs-6 text-gray-700 px-7">
            {roles.map((role) => {
              return (
                <th key={role.id} className="text-center">
                  {role.name.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td className="text-center">{permission.action}</td>
              {roles.map((role) => {
                const hasRole = permission.roles.find(
                  (pRole: Role) => pRole.id === role.id,
                );
                return (
                  <td
                    key={`${permission.id}-${role.id}`}
                    className="text-center"
                  >
                    {hasRole ? (
                      <>
                        <button
                          type="button"
                          className={`btn btn-icon btn-bg-light btn-light-success btn-sm me-1`}
                          onClick={() =>
                            handleButtonClick(role.id, permission.id)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="fs-2"
                          />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={`btn btn-icon btn-bg-light btn-light-danger btn-sm me-1`}
                        onClick={() =>
                          handleButtonClick(role.id, permission.id, false)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-2"
                        />
                      </button>
                    )}
                  </td>
                );
              })}
              <td className="text-center">
                <a
                  href="#"
                  className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} className="fs-2" />
                </a>
                <a
                  href="#"
                  className={`btn btn-icon btn-bg-light btn-active-color-danger btn-sm`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className="fs-2" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sync;

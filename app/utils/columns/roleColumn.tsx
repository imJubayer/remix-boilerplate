import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export const roleColumns = (handleRoleDelete: (roleId: string) => void) => [
  {
    header: "Name",
    content: (role: Role) => <div>{role.name.toUpperCase()}</div>,
  },
  {
    header: "Description",
    content: (role: Role) => <div>{role.description}</div>,
  },
  {
    header: "Action",
    content: (role: Role) => {
      return (
        <>
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
            onClick={() => handleRoleDelete(role.id)}
            type="submit"
            className="btn btn-icon btn-active-light-primary w-30px h-30px"
          >
            <FontAwesomeIcon icon={faTrash} className="text-danger" />
          </button>
        </>
      );
    },
  },
];

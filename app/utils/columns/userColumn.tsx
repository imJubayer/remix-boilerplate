import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import moment from "moment";
import { IUser } from "~/types/authentication";

export const userColumns = (handleUserDelete: (userId: string) => void) => [
  {
    header: "User",
    content: (user: IUser) => {
      return (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
            <Link to="/users">
              <div className="symbol-label">
                <img
                  src="assets/media/avatars/300-6.jpg"
                  alt={user.profile?.first_name}
                  className="w-100"
                />
              </div>
            </Link>
          </div>
          <div className="d-flex flex-column">
            <Link to="users" className="text-gray-800 text-hover-primary mb-1">
              {user.profile?.first_name}
            </Link>
            <span>{user.email}</span>
          </div>
        </div>
      );
    },
    width: "20% !important",
  },
  {
    header: "Role",
    accessor: "role",
    content: (user: IUser) => {
      return <div>{user.role?.name.toUpperCase()}</div>;
    },
  },
  {
    header: "Joined Date",
    content: (user: User) => {
      return <div>{moment(user.createdAt).format("LL")}</div>;
    },
  },
  {
    header: "Status",
    content: (user: IUser) => {
      return (
        <span
          className={`badge badge-light-${user.status === "active" ? "success" : "danger"}`}
        >
          {user.status === "active" ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    header: "Action",
    content: (user: User) => {
      return (
        <>
          <Link
            to={user.id}
            className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
          >
            <FontAwesomeIcon icon={faPen} className="text-primary" />
          </Link>

          <input type="hidden" name="userId" value={user.id} />
          <button
            onClick={() => handleUserDelete(user.id)}
            className="btn btn-icon btn-active-light-primary w-30px h-30px"
          >
            <FontAwesomeIcon icon={faTrash} className="text-danger" />
          </button>
        </>
      );
    },
  },
];

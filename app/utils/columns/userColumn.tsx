import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import { IUser } from "~/types/authentication";
import { getProfilePhotoPath, getMediaPath } from "../helper";

export const userColumns = (handleUserDelete: (userId: string) => void) => [
  {
    header: "User",
    content: (user: IUser) => {
      return (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
            <Link to={`/users/${user.id}`}>
              <div className="symbol-label">
                <img
                  src={
                    user.profile?.profile_image
                      ? getProfilePhotoPath(user.profile?.profile_image)
                      : getMediaPath("/avatars/blank.png")
                  }
                  alt={user.profile?.first_name}
                  className="w-100"
                />
              </div>
            </Link>
          </div>
          <div className="d-flex flex-column">
            <Link
              to={`/users/${user.id}`}
              className="text-gray-800 text-hover-primary mb-1"
            >
              {user.profile?.first_name} {user.profile?.last_name}
            </Link>
            <span>{user.email}</span>
          </div>
        </div>
      );
    },
    width: "30% !important",
  },
  {
    header: "Role",
    accessor: "role",
    content: (user: IUser) => {
      return (
        <div>
          <button className="btn btn-sm btn-light-primary fw-bold fs-8 py-1 px-3">
            {user.role?.name.toUpperCase()}
          </button>
        </div>
      );
    },
  },
  {
    header: "Joined Date",
    content: (user: User) => {
      return <div>{dayjs(user.createdAt).format("D MMMM, YYYY")}</div>;
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

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITeamUser } from "~/types/business";

export const FavouriteUsersColumn = (
  handleFavouriteDelete: (id: string) => void,
) => [
  {
    header: "Firstname",
    content: (teamUser: ITeamUser) => {
      return <div>{teamUser.user.profile?.first_name}</div>;
    },
  },
  {
    header: "Lastname",
    content: (teamUser: ITeamUser) => {
      return <div>{teamUser.user.profile?.last_name}</div>;
    },
  },
  {
    header: "Email",
    content: (teamUser: ITeamUser) => {
      return <div>{teamUser.user.email}</div>;
    },
  },
  {
    header: "Action",
    content: (teamUser: ITeamUser) => {
      return (
        <>
          {/* <Link
            to={teamUser.id}
            className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
          >
            <FontAwesomeIcon icon={faPen} className="text-primary" />
          </Link> */}

          <input type="hidden" name="userId" value={teamUser.user_id} />
          <button
            title="Remove user"
            data-bs-toggle="tooltip"
            className="btn btn-icon btn-active-light-primary w-30px h-30px"
            onClick={() => handleFavouriteDelete(teamUser.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-danger" />
          </button>
        </>
      );
    },
  },
];

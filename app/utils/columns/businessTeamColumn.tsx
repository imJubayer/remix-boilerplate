import { ITeamUser } from "~/types/business";

export const BusinessTeamColumn = (
  handleToggleUserStatus: (id: string) => void,
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
          <input type="hidden" name="userId" value={teamUser.user_id} />
          <button
            onClick={() => handleToggleUserStatus(teamUser.user.id)}
            title="Click to toggle"
            data-bs-toggle="tooltip"
            className={`btn btn-sm btn-light-${teamUser.user.status === "active" ? "success" : "danger"} fw-bold ms-2 fs-8 py-1 px-3`}
          >
            {teamUser.user.status === "active" ? "Active" : "Inactive"}
          </button>
        </>
      );
    },
  },
];

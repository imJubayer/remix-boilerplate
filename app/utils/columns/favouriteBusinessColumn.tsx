import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBusinessInfo, IFavouriteBusiness } from "~/types/business";

export const FavouriteBusinessColumn = (
  handleFavouriteDelete: (id: string) => void,
) => [
  {
    header: "Name",
    content: (favourite: IFavouriteBusiness) => {
      return <div>{favourite.business.name}</div>;
    },
  },
  {
    header: "Category",
    content: (favourite: IFavouriteBusiness) => {
      return (
        <div>
          <span className={`badge badge-light-success`}>
            {favourite.business.category?.name}
          </span>
        </div>
      );
    },
  },
  {
    header: "Email",
    content: (favourite: IFavouriteBusiness) => {
      return <div>{favourite.business.email}</div>;
    },
  },
  {
    header: "Phone",
    content: (favourite: IFavouriteBusiness) => {
      return <div>{favourite.business.phone}</div>;
    },
  },
  {
    header: "Action",
    content: (business: IBusinessInfo) => {
      return (
        <>
          {/* <Link
            to={teamUser.id}
            className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
          >
            <FontAwesomeIcon icon={faPen} className="text-primary" />
          </Link> */}

          <input type="hidden" name="userId" value={business.user_id} />
          <button
            title="Dislike business"
            data-bs-toggle="tooltip"
            className="btn btn-icon btn-active-light-primary w-30px h-30px"
            onClick={() => handleFavouriteDelete(business.id)}
          >
            <FontAwesomeIcon icon={faThumbsDown} className="text-warning" />
          </button>
        </>
      );
    },
  },
];

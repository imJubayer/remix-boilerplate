import { Category } from "@prisma/client";
import { Link } from "@remix-run/react";

import StatusBadge from "~/components/common/statusBadge";

import { getDateString } from "../helper";

export const categoryColumn = (
  handleCategoryDelete: (categoryId: string) => void,
) => [
  {
    header: "Category Name",
    content: (category: Category) => {
      return category.name;
    },
  },
  {
    header: "Parent",
    content: (category: Category) => {
      return category.parent ? category.parent.name : "-";
    },
  },
  {
    header: "Description",
    content: (category: Category) => {
      return category.description;
    },
  },
  {
    header: "Number of Listings",
    content: () => {
      return 0;
    },
  },
  {
    header: "Last Updated",
    content: (category: Category) => {
      return getDateString(category.updatedAt.toString());
    },
  },
  {
    header: "Status",
    content: (category: Category) => {
      return <StatusBadge badgeText={category.status} />;
    },
  },
  {
    header: "Action",
    content: (category: Category) => {
      return (
        <>
          <Link
            to={`${category.id}`}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            V
          </Link>
          <Link
            to={`edit/${category.id}`}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            E
          </Link>
          <button
            onClick={() => handleCategoryDelete(category.id)}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            D
          </button>
        </>
      );
    },
  },
];

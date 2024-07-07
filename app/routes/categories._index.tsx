import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import StatusBadge from "~/components/common/statusBadge";
import { prisma } from "~/db.server";
import { getDateString } from "~/utils/helper";

export const loader = async () => {
  const categories = await prisma.category.findMany({
    include: {
      parent: {
        select: {
          name: true,
        },
      },
    },
  });
  return json({ categories });
};

export default function CategoriesIndex() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div className="card mb-5 mb-xl-8">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Cateogory</span>
          {/* <span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 orders
          </span> */}
        </h3>
        <div className="card-toolbar">
          <Link to="add" type="button" className="btn btn-light-primary">
            Create
          </Link>
        </div>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-120px">Category Name</th>
                <th className="min-w-120px">Parent</th>
                <th className="min-w-150px">Description</th>
                <th className="min-w-80px">Number of Listings</th>
                <th className="min-w-100px">Last Updated</th>
                <th className="min-w-80px">Status</th>
                <th className="min-w-100px">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, key) => {
                return (
                  <tr key={key}>
                    <td>{category.name}</td>
                    <td>{category.parent ? category.parent.name : "-"}</td>
                    <td>{category.description}</td>
                    <td>0</td>
                    <td>{getDateString(category.updatedAt)}</td>
                    <td>
                      <StatusBadge badgeText={category.status} />
                    </td>
                    <td>
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
                      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        D
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

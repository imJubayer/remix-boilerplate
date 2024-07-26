import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import categoryService from "~/services/category.service";
import { getDateString } from "~/utils/helper";

export const loader = async (loaderFunctionArgs: LoaderFunctionArgs) => {
  return await categoryService.detailsLoader(loaderFunctionArgs);
};

export default function Category() {
  const { category } = useLoaderData<typeof loader>();
  return (
    <div className="card card-body fs-6 p-10">
      <div className="row mb-12">
        <div className="col-6">
          <div className="row">
            <div className="col-4">
              <div className="fw-bold">Category Name</div>
            </div>
            <div className="col-8">
              <div className="fw-bold text-muted">: {category.name}</div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-4">
              <div className="fw-bold">Status</div>
            </div>
            <div className="col-8">
              <div className="fw-bold text-muted">: {category.status}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-12">
        <div className="col-6">
          <div className="row">
            <div className="col-4">
              <div className="fw-bold">Parent</div>
            </div>
            <div className="col-8">
              <div className="fw-bold text-muted">
                : {category.parentId ? category.parent.name : "--"}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-4">
              <div className="fw-bold">Last Updated</div>
            </div>
            <div className="col-8">
              <div className="fw-bold text-muted">
                : {getDateString(category.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-12">
        <div className="col-2">
          <div className="fw-bold">Description</div>
        </div>
        <div className="col-10">
          <div className="fw-bold text-muted">: {category.description}</div>
        </div>
      </div>
      <div className="row mb-12">
        <div className="col-2">
          <div className="fw-bold">Category Image</div>
        </div>
        <div className="col-2">
          {category.image ? (
            <img
              className="img w-100"
              src={`/uploads/${category.image}`}
              alt={`${category.name}_image`}
            />
          ) : (
            <div className="fw-bold text-muted">: --</div>
          )}
        </div>
      </div>
    </div>
  );
}

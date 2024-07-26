import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { ChangeEvent, useState } from "react";

import categoryService from "~/services/category.service";

export const loader = async (loaderFunctionArgs: LoaderFunctionArgs) => {
  return await categoryService.editLoader(loaderFunctionArgs);
};

export const action = async (actionFunctionArgs: ActionFunctionArgs) => {
  return await categoryService.updateAction(actionFunctionArgs);
};

export default function CategoryEdit() {
  const { category, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const categoriesDropDown = categories.map((categoryFromAll, key) => {
    return (
      <option key={key} value={categoryFromAll.id}>
        {categoryFromAll.name}
      </option>
    );
  });

  const updatePreviewImageUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImageUrl(URL.createObjectURL(file));
    } else {
      setPreviewImageUrl(null);
    }
  };

  return (
    <div className="card card-body p-12">
      <Form className="form" method="post" encType="multipart/form-data">
        <input type="text" name="id" defaultValue={category.id} hidden />
        <div className="row mb-12">
          <div className="col-lg-6">
            <div className="row">
              <label
                htmlFor="name"
                className="col-lg-4 col-form-label required fw-bold fs-6"
              >
                Category Name
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid ${actionData?.errors?.name ? "is-invalid" : ""}`}
                  placeholder="Category Name"
                  required
                  name="name"
                  id="name"
                  defaultValue={category.name}
                />
                {actionData?.errors?.name ? (
                  <div className="invalid-feedback">
                    {actionData?.errors.name}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <label
                htmlFor="status"
                className="col-lg-4 col-form-label fw-bold fs-6"
              >
                Status
              </label>
              <div className="col-lg-8 d-flex align-items-center">
                <div className="form-check form-check-solid form-switch fv-row">
                  <input
                    className={`form-check-input w-45px h-30px ${actionData?.errors?.status ? "is-invalid" : ""}`}
                    type="checkbox"
                    id="allowmarketing"
                    name="status"
                    defaultChecked={category.status == "Active" ? true : false}
                  />
                  {actionData?.errors?.status ? (
                    <div className="invalid-feedback">
                      {actionData?.errors.status}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-12">
          <div className="col-lg-6">
            <div className="row">
              <label
                htmlFor="parent"
                className="col-lg-4 col-form-label fw-bold fs-6"
              >
                Parent Category
              </label>
              <div className="col-lg-8 fv-row">
                <select
                  name="parent"
                  id="parent"
                  className={`form-select form-select-solid form-select-lg ${actionData?.errors?.parent ? "is-invalid" : ""}`}
                  defaultValue={
                    category.parentId ? category.parentId : undefined
                  }
                >
                  <option value="" disabled>
                    Select a Parent Category...
                  </option>
                  {categoriesDropDown}
                </select>
                {actionData?.errors?.parent ? (
                  <div className="invalid-feedback">
                    {actionData?.errors.parent}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-12">
          <div className="col-lg-12">
            <div className="row">
              <label
                htmlFor="description"
                className="col-lg-2 col-form-label required fw-bold fs-6"
              >
                Description
              </label>
              <div className="col-lg-10 fv-row">
                <textarea
                  className={`form-control form-control-lg form-control-solid ${actionData?.errors?.description ? "is-invalid" : ""}`}
                  name="description"
                  id="description"
                  placeholder="Description about the category"
                  defaultValue={
                    category.description ? category.description : ""
                  }
                ></textarea>
                {actionData?.errors?.description ? (
                  <div className="invalid-feedback">
                    {actionData?.errors.description}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-6">
          <div className="col-lg-12">
            <div className="row">
              <label
                htmlFor="image"
                className="col-lg-2 col-form-label fw-bold fs-6"
              >
                Category Image
              </label>
              <div className="col-lg-4 fv-row">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  className={`form-control form-control-lg form-control-solid ${actionData?.errors?.image ? "is-invalid" : ""}`}
                  onChange={updatePreviewImageUrl}
                />
                {actionData?.errors?.image ? (
                  <div className="invalid-feedback">
                    {actionData?.errors.image}
                  </div>
                ) : null}
                {category.image && !previewImageUrl ? (
                  <img
                    src={`/uploads/${category.image}`}
                    alt={`${category.name}_image`}
                    className="img w-25 mt-5"
                  />
                ) : null}
                {previewImageUrl ? (
                  <img
                    alt={`${category.name}_image`}
                    src={previewImageUrl}
                    className="img w-25 mt-5"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/categories" className="btn btn-danger mx-5">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </Form>
    </div>
  );
}

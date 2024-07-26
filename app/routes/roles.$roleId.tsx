import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getRole, updateRole } from "~/models/role.server";
import invariant from "tiny-invariant";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { roleSchema } from "~/schema/rbac.validation";
import * as yup from "yup";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.roleId, "roleId not found");
  const role = await getRole(params.roleId);
  if (!role) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ role });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    invariant(params.roleId, "roleId not found");
    const validatedData = await roleSchema.validate(formDataObject, {
      abortEarly: false,
    });
    const { name } = validatedData;
    await updateRole(params.roleId, name);

    // session.flash("success", "Role added successfully");
    // localStorage.setItem("success", "Role added successfully");
    return redirect("/roles");
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // `inner` property contains an array of validation errors
      const errorFields: any = {};
      error.inner.forEach((err: any) => {
        // Extract the path (field name) and message from each error
        errorFields[err.path] = err.message;
      });
      return json({ errors: errorFields }, { status: 422 });
    }
    return json({ errors: error }, { status: 422 });
  }
};

export default function EditRole() {
  const actionData = useActionData<typeof action>();
  const { role } = useLoaderData<typeof loader>();

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title text-center">
          <div className="d-flex align-items-center position-relative my-1">
            <h2>Edit Role</h2>
          </div>
        </div>
      </div>

      <div className="card-body py-4">
        <Form id="edit_role_form" className="form form-validate" method="POST">
          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-role"
          >
            <div className="fv-row mb-7">
              <label className="required required form-label fw-semibold fs-6 mb-2">
                Name
              </label>

              <input
                type="text"
                id="add-role-name"
                name="name"
                className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.name ? "is-invalid border-danger" : ""}`}
                placeholder="Role name"
                defaultValue={role.name}
              />
              {actionData?.errors?.name ? (
                <div className="text-danger" id="role-name-error">
                  {actionData.errors.name}
                </div>
              ) : null}
            </div>
          </div>
          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10 pt-5"
            id="edit-role"
          >
            <div className="fv-row">
              <label className="form-label fw-semibold fs-6 mb-2">
                Description
              </label>

              <textarea
                id="edit-role-description"
                name="description"
                className={`form-control form-control-solid mb-3 mb-lg-0`}
                placeholder="Role description"
                defaultValue={role.description}
              />
            </div>
          </div>

          <div className="text-center pt-10">
            <button type="reset" className="btn btn-light me-3">
              Discard
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="indicator-label">Submit</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

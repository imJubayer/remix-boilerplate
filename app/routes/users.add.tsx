import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getRoles } from "~/models/role.server";
import { abort, hasPermission } from "~/utils";
import { getUser } from "~/session.server";
import userService from "~/services/userService";
import { IRole } from "~/types/rbac";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredPermissions = ["add-user"];
  const user = await getUser(request);
  if (!hasPermission(user, requiredPermissions)) {
    abort(403);
  }
  const roles: IRole[] = await getRoles();
  return json({ roles });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { user, errors, status } = await userService.addUser(request);
  if (errors) {
    return json({ errors }, { status });
  }
  return redirect("/users");
};

export default function AddUser() {
  const actionData = useActionData<typeof action>();
  const { roles } = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Create User</h1>
      <div className="card">
        <div className="card-body py-4">
          <Form id="add_role_form" className="form form-validate" method="POST">
            <div
              className="d-flex flex-column scroll-y px-5 px-lg-10"
              id="kt_add_user"
            >
              <div className="fv-row mb-7 mt-3">
                <label className="required form-label fw-semibold fs-6 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="add-first-name"
                  name="first_name"
                  className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.first_name ? "is-invalid border-danger" : ""}`}
                  placeholder="First name"
                  autoFocus
                />
                {actionData?.errors?.first_name ? (
                  <div className="text-danger" id="first-name-error">
                    {actionData.errors.first_name}
                  </div>
                ) : null}
              </div>
              <div className="fv-row mb-7">
                <label className="required form-label fw-semibold fs-6 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="add-last-name"
                  name="last_name"
                  className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.last_name ? "is-invalid border-danger" : ""}`}
                  placeholder="Last name"
                />
                {actionData?.errors?.last_name ? (
                  <div className="text-danger" id="last-name-error">
                    {actionData.errors.last_name}
                  </div>
                ) : null}
              </div>
              <div className="fv-row mb-7">
                <label className="required form-label fw-semibold fs-6 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="add-email"
                  name="email"
                  className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.email ? "is-invalid border-danger" : ""}`}
                  placeholder="Email"
                />
                {actionData?.errors?.email ? (
                  <div className="text-danger" id="email-error">
                    {actionData.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="fv-row mb-7">
                <label
                  htmlFor="add-user-gender"
                  className="fw-semibold fs-6 mb-2"
                >
                  Gender
                </label>
                <select
                  id="add-user-gender"
                  className="form-select form-select-solid"
                  name="gender"
                  data-placeholder="Select an option"
                >
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="fv-row mb-7">
                <label
                  htmlFor="add-user-gender"
                  className="required fw-semibold fs-6 mb-2"
                >
                  Role
                </label>
                <select
                  id="add-user-role"
                  className={`form-select form-select-solid ${actionData?.errors?.email ? "is-invalid border-danger" : ""}`}
                  name="role"
                  data-placeholder="Select an option"
                >
                  <option value="">Select an option</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {actionData?.errors?.role ? (
                  <div className="text-danger" id="role-error">
                    {actionData.errors.role}
                  </div>
                ) : null}
              </div>
              <div className="fv-row mb-7">
                <label
                  htmlFor="add-user-status"
                  className="fw-semibold fs-6 mb-2"
                >
                  Status
                </label>
                <select
                  id="add-user-status"
                  className="form-select form-select-solid"
                  name="status"
                >
                  <option selected value="active">
                    Active
                  </option>
                  <option value="inactive">Inactive</option>
                </select>
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
    </>
  );
}

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getRoles } from "~/models/role.server";
import invariant from "tiny-invariant";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import userService from "~/services/userService";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.userId, "userId not found");
  const user = await getUserById(params.userId);
  const roles = await getRoles();
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user, roles });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "userId not found");
  const { user, errors, status } = await userService.updateUser(
    params.userId,
    request,
  );
  if (errors) {
    return json({ errors }, { status });
  }
  return redirect("/users");
};

export default function EditUser() {
  const actionData = useActionData<typeof action>();
  const { user, roles } = useLoaderData<typeof loader>();

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title text-center">
          <div className="d-flex align-items-center position-relative my-1">
            <h2>Edit User</h2>
          </div>
        </div>
      </div>

      <div className="card-body py-4">
        <Form id="edit_role_form" className="form form-validate" method="POST">
          <input
            id="edit-email"
            name="email"
            className="d-none"
            defaultValue={user.email}
          />
          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-first-name"
          >
            <div className="fv-row mb-7">
              <label className="required required form-label fw-semibold fs-6 mb-2">
                Firstname
              </label>

              <input
                type="text"
                id="edit-first-name"
                name="first_name"
                className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.first_name ? "is-invalid border-danger" : ""}`}
                placeholder="Firstname"
                defaultValue={user.profile?.first_name}
              />
              {actionData?.errors?.first_name ? (
                <div className="text-danger" id="first-name-error">
                  {actionData.errors.first_name}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-last-name"
          >
            <div className="fv-row mb-7">
              <label className="required required form-label fw-semibold fs-6 mb-2">
                Lastname
              </label>

              <input
                type="text"
                id="edit-last-name"
                name="last_name"
                className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.last_name ? "is-invalid border-danger" : ""}`}
                placeholder="Lastname"
                defaultValue={user.profile?.last_name}
              />
              {actionData?.errors?.last_name ? (
                <div className="text-danger" id="last-name-error">
                  {actionData.errors.last_name}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-gender"
          >
            <div className="fv-row mb-7">
              <label
                htmlFor="edit-user-gender"
                className="fw-semibold fs-6 mb-2"
              >
                Gender
              </label>
              <select
                id="edit-user-gender"
                className="form-select form-select-solid"
                name="gender"
                data-placeholder="Select an option"
                defaultValue={user.profile?.gender}
              >
                <option value="">Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {actionData?.errors?.gender ? (
                <div className="text-danger" id="gender-error">
                  {actionData.errors.gender}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-role"
          >
            <div className="fv-row mb-7">
              <label htmlFor="edit-user-role" className="fw-semibold fs-6 mb-2">
                Role
              </label>
              <select
                id="edit-user-role"
                className={`form-select form-select-solid ${actionData?.errors?.role ? "is-invalid border-danger" : ""}`}
                name="role"
                data-placeholder="Select an option"
                defaultValue={user.role.name}
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
          </div>

          <div
            className="d-flex flex-column scroll-y px-5 px-lg-10"
            id="edit-status"
          >
            <div className="fv-row mb-7">
              <label
                htmlFor="edit-user-status"
                className="fw-semibold fs-6 mb-2"
              >
                Status
              </label>
              <select
                id="edit-user-status"
                className={`form-select form-select-solid ${actionData?.errors?.status ? "is-invalid border-danger" : ""}`}
                name="status"
                data-placeholder="Select an option"
                defaultValue={user.status}
              >
                <option selected value="active">
                  Active
                </option>
                <option value="inactive">Inactive</option>
              </select>
              {actionData?.errors?.status ? (
                <div className="text-danger" id="status-error">
                  {actionData.errors.status}
                </div>
              ) : null}
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

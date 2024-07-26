import { Form } from "@remix-run/react";
import { IUser } from "~/types/authentication";

type businessInfoFormPropsType = {
  actionData: any;
  roles: any[];
  user?: IUser;
  isSubmitting: boolean;
};

export default function AddEditUserForm({
  actionData,
  roles,
  user,
  isSubmitting = false,
}: businessInfoFormPropsType) {
  return (
    <Form id="add-edit-user-form" method="post">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title pb-6">
            {user ? "Edit User" : "Create User"}
          </h2>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="first_name"
                className="form-label required fw-bold"
              >
                First Name
              </label>
              <input
                type="text"
                className={`form-control form-control-solid ${actionData?.errors?.first_name ? "is-invalid border-danger" : ""}`}
                id="first-name"
                name="first_name"
                placeholder="First name"
                autoFocus
                defaultValue={user?.profile?.first_name}
              />
              {actionData?.errors?.first_name ? (
                <div className="text-danger" id="business-first-name-error">
                  {actionData.errors.first_name}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="last_name"
                className="form-label required fw-bold"
              >
                Last Name
              </label>
              <input
                type="text"
                className={`form-control form-control-solid ${actionData?.errors?.last_name ? "is-invalid border-danger" : ""}`}
                id="last-name"
                name="last_name"
                placeholder="Last name"
                defaultValue={user?.profile?.last_name}
              />
              {actionData?.errors?.last_name ? (
                <div className="text-danger" id="business-last-name-error">
                  {actionData.errors.last_name}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label htmlFor="email" className="form-label required fw-bold">
                Email
              </label>
              <input
                type="email"
                className={`form-control form-control-solid ${actionData?.errors?.email ? "is-invalid border-danger" : ""}`}
                id="business-email"
                name="email"
                placeholder="User email"
                defaultValue={user?.email}
              />
              {actionData?.errors?.email ? (
                <div className="text-danger" id="business-email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 ps-4">
              <label htmlFor="gender" className="form-label fw-bold">
                Gender
              </label>
              <select
                className={`form-select form-select-solid form-select-lg`}
                id="gender"
                name="gender"
                defaultValue={user?.profile?.gender}
              >
                <option value="">Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label htmlFor="role" className="form-label required fw-bold">
                Role
              </label>
              <select
                className={`form-select form-select-solid form-select-lg ${actionData?.errors?.role ? "is-invalid border-danger" : ""}`}
                id="role"
                name="role"
                defaultValue={user?.role.name}
              >
                <option value="">Select an option</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name.toUpperCase()}
                  </option>
                ))}
              </select>
              {actionData?.errors?.role ? (
                <div className="text-danger" id="role-error">
                  {actionData.errors.role}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 ps-4">
              <div className="row mt-8">
                <label
                  htmlFor="status"
                  className="col-lg-4 col-form-label fw-bold fs-6"
                >
                  Status
                </label>
                <div className="col-lg-8 d-flex align-items-center">
                  <div className="form-check form-check-solid form-switch fv-row mt-2">
                    <input
                      className={`form-check-input w-45px h-30px ${actionData?.errors?.status ? "is-invalid" : ""}`}
                      type="checkbox"
                      id="status"
                      name="status"
                      defaultChecked={
                        user ? (user?.status === "active" ? true : false) : true
                      }
                    />
                  </div>
                </div>
              </div>
              {/* <select
                className={`form-select form-select-solid form-select-lg ${actionData?.errors?.status ? "is-invalid border-danger" : ""}`}
                id="status"
                name="status"
                defaultValue={user?.status || "active"}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select> */}
              {actionData?.errors?.status ? (
                <div className="text-danger" id="business-category-error">
                  {actionData.errors.status}
                </div>
              ) : null}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success"
            >
              <span className="indicator-label">
                Submit{" "}
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

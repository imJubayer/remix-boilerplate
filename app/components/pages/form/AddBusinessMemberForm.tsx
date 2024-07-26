import { Form } from "@remix-run/react";
import { useUser } from "~/utils";

type businessInfoFormPropsType = {
  actionData: any;
};

export default function BusinessTeamMemberForm({
  actionData,
}: businessInfoFormPropsType) {
  const user = useUser();
  return (
    <Form method="post">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title pb-6">Team Member Information</h2>
          <div className="row">
            {/* <input type="hidden" name="user_id" value={user.id} /> */}
            <input type="hidden" name="created_by" value={user.id} />
            <input type="hidden" name="business_id" value={user.business?.id} />
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
                id="business-first-name"
                name="first_name"
                placeholder="First name"
                autoFocus
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
                Last name
              </label>
              <input
                type="text"
                className={`form-control form-control-solid ${actionData?.errors?.last_name ? "is-invalid border-danger" : ""}`}
                id="business-last-name"
                name="last_name"
                placeholder="Last name"
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
                placeholder="Member email"
              />
              {actionData?.errors?.email ? (
                <div className="text-danger" id="business-email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 pe-6">
              <label htmlFor="phone" className="form-label required fw-bold">
                Phone
              </label>
              <input
                type="text"
                className={`form-control form-control-solid ${actionData?.errors?.phone ? "is-invalid border-danger" : ""}`}
                id="business-phone"
                name="phone"
                placeholder="Member phone"
              />
              {actionData?.errors?.phone ? (
                <div className="text-danger" id="business-phone-error">
                  {actionData.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

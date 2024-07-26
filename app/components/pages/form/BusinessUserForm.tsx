import { Form, Link } from "@remix-run/react";
import PasswordInput from "~/components/common/password";

type BusinessUserFormProps = {
  actionData: any;
  isSubmitting: boolean;
};

export default function BusinessUserForm({
  actionData,
  isSubmitting,
}: BusinessUserFormProps) {
  return (
    <Form method="post" className="form w-100" noValidate id="kt_sign_up_form">
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>
      </div>

      <div className="fv-row mb-8">
        <input
          id="business-name"
          type="text"
          autoFocus={true}
          placeholder="Business name"
          name="business_name"
          className={`form-control bg-transparent ${actionData?.errors?.business_name ? "is-invalid" : ""}`}
        />
        {actionData?.errors?.business_name ? (
          <div className="text-danger" id="business-name-error">
            {actionData.errors.business_name}
          </div>
        ) : null}
      </div>

      <div className="fv-row mb-8">
        <input
          id="business-number"
          type="text"
          placeholder="Business number"
          name="business_number"
          className={`form-control bg-transparent ${actionData?.errors?.business_number ? "is-invalid" : ""}`}
        />
        {actionData?.errors?.business_number ? (
          <div className="text-danger" id="business-number-error">
            {actionData.errors.business_number}
          </div>
        ) : null}
      </div>

      <div className="fv-row mb-8">
        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          className={`form-control bg-transparent ${actionData?.errors?.email ? "is-invalid" : ""}`}
        />
        {actionData?.errors?.email ? (
          <div className="text-danger" id="email-error">
            {actionData.errors.email}
          </div>
        ) : null}
      </div>

      <div className="fv-row mb-8">
        <input
          id="first_name"
          type="text"
          placeholder="First name"
          name="first_name"
          className={`form-control bg-transparent ${actionData?.errors?.first_name ? "is-invalid" : ""}`}
        />
        {actionData?.errors?.first_name ? (
          <div className="text-danger" id="first-name-error">
            {actionData.errors.first_name}
          </div>
        ) : null}
      </div>

      <div className="fv-row mb-8">
        <input
          id="last_name"
          type="text"
          placeholder="Last name"
          name="last_name"
          className={`form-control bg-transparent ${actionData?.errors?.last_name ? "is-invalid" : ""}`}
        />
        {actionData?.errors?.last_name ? (
          <div className="text-danger" id="last-name-error">
            {actionData.errors.last_name}
          </div>
        ) : null}
      </div>

      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <div className="position-relative mb-3">
            <PasswordInput error={actionData?.errors.password} />
          </div>
        </div>

        <div className="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>

      <div className="fv-row mb-8">
        <label className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          />
          <span className="form-check-label fw-semibold text-gray-700 fs-base ms-1">
            I Accept the
            <a href="#" className="ms-1 link-primary">
              Terms
            </a>
          </span>
        </label>
      </div>
      <input type="hidden" name="account_type" value="businessUser" />

      <div className="d-grid mb-10">
        <button
          type="submit"
          disabled={isSubmitting}
          id="kt_sign_up_submit"
          className="btn btn-primary"
        >
          <span className="indicator-label">
            Sign up{" "}
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            )}
          </span>
        </button>
      </div>

      <div className="text-gray-500 text-center fw-semibold fs-6">
        Already have an Account?
        <Link to="/login" className="link-primary fw-semibold">
          Sign in
        </Link>
      </div>
    </Form>
  );
}

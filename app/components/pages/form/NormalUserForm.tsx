import { useRef, useEffect } from "react";
import { Form, Link, useActionData } from "@remix-run/react";
import PasswordInput from "~/components/common/password";

type NormalUserFormProps = {
  actionData: any;
  isSubmitting: boolean;
};

export default function NormalUserForm({
  actionData,
  isSubmitting,
}: NormalUserFormProps) {
  //   const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.repeatPassword) {
      repeatPasswordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post" className="form w-100" noValidate id="kt_sign_up_form">
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>

        {/* <div className="text-gray-500 fw-semibold fs-6">
    Your Social Campaigns
  </div> */}
      </div>

      {/* <div className="row g-3 mb-9">
  <div className="col-md-6">
    <a
      href="#"
      className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
    >
      <img
        alt="Logo"
        src="assets/media/svg/brand-logos/google-icon.svg"
        className="h-15px me-3"
      />
      Sign in with Google
    </a>
  </div>

  <div className="col-md-6">
    <a
      href="#"
      className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
    >
      <img
        alt="Logo"
        src="assets/media/svg/brand-logos/apple-black.svg"
        className="theme-light-show h-15px me-3"
      />
      <img
        alt="Logo"
        src="assets/media/svg/brand-logos/apple-black-dark.svg"
        className="theme-dark-show h-15px me-3"
      />
      Sign in with Apple
    </a>
  </div>
</div>

<div className="separator separator-content my-14">
  <span className="w-125px text-gray-500 fw-semibold fs-7">
    Or with email
  </span>
</div> */}

      <div className="fv-row mb-8">
        <input
          id="email"
          ref={emailRef}
          type="email"
          autoFocus={true}
          placeholder="Email"
          name="email"
          autoComplete="on"
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
      {/* <input type="hidden" name="redirectTo" value={redirectTo} /> */}
      <input type="hidden" name="account_type" value="user" />

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

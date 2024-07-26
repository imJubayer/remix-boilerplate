import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import PasswordInput from "~/components/common/password";
import AuthLayout from "~/components/layouts/auth";
import { authenticationService } from "~/services/auth.service";
import { createUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await authenticationService.loginUser(request);
  if (result.success) {
    return createUserSession({
      redirectTo: "/dashboard",
      remember: false,
      request,
      userId: result.data!.userId,
    });
  } else {
    console.log(result);
    return json({ errors: result.errors }, { status: 401 });
  }
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const actionData = useActionData<typeof action>();
  return (
    <AuthLayout>
      <Form className="form w-100" method="post" id="kt_sign_in_form">
        <div className="text-center mb-11">
          <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>

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
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="new-email"
            className={`form-control bg-transparent ${actionData?.errors?.email ? "is-invalid" : ""}`}
            autoFocus={true}
            defaultValue="super@admin.com"
          />
          {actionData?.errors?.email ? (
            <div className="text-danger" id="email-error">
              {actionData.errors.email}
            </div>
          ) : null}
        </div>

        <div className="fv-row mb-3">
          <PasswordInput error={actionData?.errors.password} value="password" />
        </div>

        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
          <div></div>
          <Link to="/forgot-password" className="link-primary">
            Forgot Password ?
          </Link>
        </div>

        <div className="d-grid mb-10">
          <button
            disabled={isSubmitting}
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-primary"
          >
            <span className="indicator-label">
              Sign In{" "}
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              )}
            </span>

            {/* <span className="indicator-progress">
          Please wait...
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span> */}
          </button>
        </div>

        <div className="text-gray-500 text-center fw-semibold fs-6">
          Not a Member yet?
          <Link to="/account-type" className="link-primary">
            Sign up
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
}

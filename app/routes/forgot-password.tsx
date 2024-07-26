import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import AuthLayout from "~/components/layouts/auth";
import { authenticationService } from "~/services/auth.service";

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await authenticationService.forgotPassword(request);
  if (result.success) {
    return redirect(`/verification?email=${result.data?.email}`);
  } else {
    return json(
      { success: result.success, errors: result.errors },
      { status: 422 },
    );
  }
};

export default function ForgotPassword() {
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const actionData = useActionData<typeof action>();
  return (
    <AuthLayout>
      <Form className="form w-100" id="password_reset_form" method="post">
        <div className="text-center mb-10">
          <h1 className="text-gray-900 fw-bolder mb-3">Forgot Password ?</h1>

          <div className="text-gray-500 fw-semibold fs-6">
            Enter your email to reset your password.
          </div>
        </div>

        <div className="fv-row mb-8">
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoFocus
            className={`form-control bg-transparent ${actionData?.errors?.email ? "is-invalid" : ""}`}
          />
          {actionData?.errors?.email ? (
            <div className="text-danger" id="email-error">
              {actionData.errors.email}
            </div>
          ) : null}
        </div>

        <div className="d-flex flex-wrap justify-content-center pb-lg-0">
          <button
            disabled={isSubmitting}
            type="submit"
            id="kt_password_reset_submit"
            className="btn btn-primary me-4"
          >
            <span className="indicator-label">
              Submit{" "}
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              )}
            </span>
          </button>
          <Link to="/login" className="btn btn-light">
            Cancel
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
}

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { verifyLogin } from "~/models/user.server";
import { signInSchema } from "~/schema/authentication";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import * as yup from "yup";
import PasswordInput from "~/components/common/password";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  // const email = formData.get("email");
  // const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/dashboard");
  const remember = formData.get("remember");

  try {
    const validatedData = await signInSchema.validate(formDataObject, {
      abortEarly: false,
    });
    const { email, password } = validatedData;
    const user = await verifyLogin(email, password);

    if (!user) {
      return json(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 },
      );
    }

    return createUserSession({
      redirectTo,
      remember: remember === "on" ? true : false,
      request,
      userId: user.id,
    });
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

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div
      className="d-flex flex-column flex-root"
      id="kt_app_root"
      style={{ backgroundImage: `url(assets/media/auth/bg4.jpg)` }}
    >
      {/* <style>body { background-image: url('assets/media/auth/bg4.jpg'); } [data-bs-theme="dark"] body { background-image: url('assets/media/auth/bg4-dark.jpg'); }</style> */}

      <div className="d-flex flex-column flex-column-fluid flex-lg-row">
        <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
          <div className="d-flex flex-center flex-lg-start flex-column">
            <a href="index.html" className="mb-7">
              <img alt="Logo" src="assets/media/logos/custom-3.svg" />
            </a>

            <h2 className="text-white fw-normal m-0">
              Branding tools designed for your business
            </h2>
          </div>
        </div>

        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
          <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
            <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
              <Form className="form w-100" method="post" id="kt_sign_in_form">
                <div className="text-center mb-11">
                  <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>

                  <div className="text-gray-500 fw-semibold fs-6">
                    Your Social Campaigns
                  </div>
                </div>

                <div className="row g-3 mb-9">
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
                </div>

                <div className="fv-row mb-8">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className={`form-control bg-transparent ${actionData?.errors?.email ? "is-invalid" : ""}`}
                    autoFocus={true}
                  />
                  {actionData?.errors?.email ? (
                    <div className="text-danger" id="email-error">
                      {actionData.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="fv-row mb-3">
                  <PasswordInput error={actionData?.errors.password} />
                </div>

                <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                  <div></div>

                  <a
                    href="authentication/layouts/creative/reset-password.html"
                    className="link-primary"
                  >
                    Forgot Password ?
                  </a>
                </div>

                <div className="d-grid mb-10">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-primary"
                  >
                    <span className="indicator-label">Sign In</span>

                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>

                <div className="text-gray-500 text-center fw-semibold fs-6">
                  Not a Member yet?
                  <Link to="/join" className="link-primary">
                    Sign up
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

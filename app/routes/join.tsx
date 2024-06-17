import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { signUpSchema } from "~/schema/authentication";
import { createUserSession, getUserId } from "~/session.server";
// import { safeRedirect, validateEmail } from "~/utils";
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

  const errors = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
  };

  try {
    const validatedData = await signUpSchema.validate(formDataObject, {
      abortEarly: false,
    });
    const { email, first_name, last_name, password, redirectTo } =
      validatedData;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return json(
        {
          errors: {
            ...errors,
            email: "User already exist",
          },
        },
        { status: 400 },
      );
    }

    const user = await createUser(email, first_name, last_name, password);

    return createUserSession({
      redirectTo: redirectTo || "/",
      remember: false,
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

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
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
              <Form
                method="post"
                className="form w-100"
                noValidate
                id="kt_sign_up_form"
              >
                <div className="text-center mb-11">
                  <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>

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
                    id="email"
                    ref={emailRef}
                    type="email"
                    autoFocus={true}
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
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
                      {/* <input
                        id="password"
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        className={`form-control bg-transparent ${actionData?.errors?.password ? "is-invalid" : ""}`}
                      />
                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                      {actionData?.errors?.password ? (
                        <div className="text-danger" id="password-error">
                          {actionData.errors.password}
                        </div>
                      ) : null} */}
                      <PasswordInput error={actionData?.errors.password} />
                    </div>

                    {/* <div
                      className="d-flex align-items-center mb-3"
                      data-kt-password-meter-control="highlight"
                    >
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                    </div> */}
                  </div>

                  <div className="text-muted">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </div>
                </div>

                {/* <div className="fv-row mb-8">
                  <input
                    placeholder="Repeat Password"
                    name="confirm-password"
                    type="password"
                    autoComplete="off"
                    className="form-control bg-transparent"
                  />
                </div> */}

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
                <input type="hidden" name="redirectTo" value={redirectTo} />

                <div className="d-grid mb-10">
                  <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn btn-primary"
                  >
                    <span className="indicator-label">Sign up</span>

                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

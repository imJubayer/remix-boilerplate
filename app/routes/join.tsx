import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
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
    // <div className="flex min-h-full flex-col justify-center">
    //   <div className="mx-auto w-full max-w-md px-8">
    //     <Form method="post" className="space-y-6">
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Email address
    //         </label>
    //         <div className="mt-1">
    //           <input
    //             ref={emailRef}
    //             id="email"
    //             required
    //             // eslint-disable-next-line jsx-a11y/no-autofocus
    //             autoFocus={true}
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             aria-invalid={actionData?.errors?.email ? true : undefined}
    //             aria-describedby="email-error"
    //             className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
    //           />
    //           {actionData?.errors?.email ? (
    //             <div className="pt-1 text-red-700" id="email-error">
    //               {actionData.errors.email}
    //             </div>
    //           ) : null}
    //         </div>
    //       </div>

    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Password
    //         </label>
    //         <div className="mt-1">
    //           <input
    //             id="password"
    //             ref={passwordRef}
    //             name="password"
    //             type="password"
    //             autoComplete="new-password"
    //             aria-invalid={actionData?.errors?.password ? true : undefined}
    //             aria-describedby="password-error"
    //             className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
    //           />
    //           {actionData?.errors?.password ? (
    //             <div className="pt-1 text-red-700" id="password-error">
    //               {actionData.errors.password}
    //             </div>
    //           ) : null}
    //         </div>
    //       </div>

    //       <input type="hidden" name="redirectTo" value={redirectTo} />
    //       <button
    //         type="submit"
    //         className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
    //       >
    //         Create Account
    //       </button>
    //       <div className="flex items-center justify-center">
    //         <div className="text-center text-sm text-gray-500">
    //           Already have an account?{" "}
    //           <Link
    //             className="text-blue-500 underline"
    //             to={{
    //               pathname: "/login",
    //               search: searchParams.toString(),
    //             }}
    //           >
    //             Log in
    //           </Link>
    //         </div>
    //       </div>
    //     </Form>
    //   </div>
    // </div>

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
                    aria-invalid={actionData?.errors?.email ? true : undefined}
                    aria-describedby="email-error"
                    className="form-control bg-transparent"
                  />
                  {actionData?.errors?.email ? (
                    <div className="text-danger" id="email-error">
                      {actionData.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="fv-row mb-8" data-kt-password-meter="true">
                  <div className="mb-1">
                    <div className="position-relative mb-3">
                      <input
                        id="password"
                        ref={passwordRef}
                        aria-describedby="password-error"
                        className="form-control bg-transparent"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        aria-invalid={
                          actionData?.errors?.password ? true : undefined
                        }
                      />
                      {actionData?.errors?.password ? (
                        <div className="text-danger" id="password-error">
                          {actionData.errors.password}
                        </div>
                      ) : null}
                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <i className="ki-duotone ki-eye-slash fs-2"></i>
                        <i className="ki-duotone ki-eye fs-2 d-none"></i>
                      </span>
                    </div>

                    <div
                      className="d-flex align-items-center mb-3"
                      data-kt-password-meter-control="highlight"
                    >
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                    </div>
                  </div>

                  <div className="text-muted">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </div>
                </div>

                <div className="fv-row mb-8">
                  <input
                    placeholder="Repeat Password"
                    name="confirm-password"
                    type="password"
                    autoComplete="off"
                    className="form-control bg-transparent"
                  />
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

            <div className="d-flex flex-stack px-lg-10">
              <div className="me-0">
                <button
                  className="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-start"
                  data-kt-menu-offset="0px, 0px"
                >
                  <img
                    data-kt-element="current-lang-flag"
                    className="w-20px h-20px rounded me-3"
                    src="assets/media/flags/united-states.svg"
                    alt=""
                  />
                  <span data-kt-element="current-lang-name" className="me-1">
                    English
                  </span>
                  <i className="ki-duotone ki-down fs-5 text-muted rotate-180 m-0"></i>
                </button>

                <div
                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7"
                  data-kt-menu="true"
                  id="kt_auth_lang_menu"
                >
                  <div className="menu-item px-3">
                    <a
                      href="#"
                      className="menu-link d-flex px-5"
                      data-kt-lang="English"
                    >
                      <span className="symbol symbol-20px me-4">
                        <img
                          data-kt-element="lang-flag"
                          className="rounded-1"
                          src="assets/media/flags/united-states.svg"
                          alt=""
                        />
                      </span>
                      <span data-kt-element="lang-name">English</span>
                    </a>
                  </div>

                  <div className="menu-item px-3">
                    <a
                      href="#"
                      className="menu-link d-flex px-5"
                      data-kt-lang="Spanish"
                    >
                      <span className="symbol symbol-20px me-4">
                        <img
                          data-kt-element="lang-flag"
                          className="rounded-1"
                          src="assets/media/flags/spain.svg"
                          alt=""
                        />
                      </span>
                      <span data-kt-element="lang-name">Spanish</span>
                    </a>
                  </div>

                  <div className="menu-item px-3">
                    <a
                      href="#"
                      className="menu-link d-flex px-5"
                      data-kt-lang="German"
                    >
                      <span className="symbol symbol-20px me-4">
                        <img
                          data-kt-element="lang-flag"
                          className="rounded-1"
                          src="assets/media/flags/germany.svg"
                          alt=""
                        />
                      </span>
                      <span data-kt-element="lang-name">German</span>
                    </a>
                  </div>

                  <div className="menu-item px-3">
                    <a
                      href="#"
                      className="menu-link d-flex px-5"
                      data-kt-lang="Japanese"
                    >
                      <span className="symbol symbol-20px me-4">
                        <img
                          data-kt-element="lang-flag"
                          className="rounded-1"
                          src="assets/media/flags/japan.svg"
                          alt=""
                        />
                      </span>
                      <span data-kt-element="lang-name">Japanese</span>
                    </a>
                  </div>

                  <div className="menu-item px-3">
                    <a
                      href="#"
                      className="menu-link d-flex px-5"
                      data-kt-lang="French"
                    >
                      <span className="symbol symbol-20px me-4">
                        <img
                          data-kt-element="lang-flag"
                          className="rounded-1"
                          src="assets/media/flags/france.svg"
                          alt=""
                        />
                      </span>
                      <span data-kt-element="lang-name">French</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex fw-semibold text-primary fs-base gap-5">
                <a href="pages/team.html" target="_blank">
                  Terms
                </a>
                <a href="pages/pricing/column.html" target="_blank">
                  Plans
                </a>
                <a href="pages/contact.html" target="_blank">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

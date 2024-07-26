import {
  faRightLong,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import AuthLayout from "~/components/layouts/auth";

export const meta: MetaFunction = () => [{ title: "Account Type" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const accountType = formData.get("account_type");

  if (typeof accountType === "string") {
    return redirect(`/join?type=${accountType}`);
  }

  return json({ error: "Invalid account type" }, { status: 400 });
};

export default function AccountType() {
  return (
    <AuthLayout>
      <Form
        className="form w-100"
        method="post"
        id="kt_create_account_type_form"
      >
        <div className="text-center mb-11">
          <h1 className="text-gray-900 fw-bolder mb-3">Create an account</h1>
          <div className="current" data-kt-stepper-element="content">
            <div className="w-100">
              <div className="pb-10 pb-lg-15">
                <h2 className="fw-bold d-flex align-items-center text-gray-900">
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    title="Billing is issued based on your selected account typ"
                  >
                    <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                  </span>
                </h2>

                <div className="text-muted fw-semibold fs-6">
                  Select user type
                </div>
              </div>

              <div className="fv-row">
                <div className="row">
                  <div className="col-lg-12">
                    <input
                      type="radio"
                      className="btn-check"
                      name="account_type"
                      value="normal"
                      id="kt_create_account_form_account_type_normal"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10"
                      htmlFor="kt_create_account_form_account_type_normal"
                    >
                      {/* <i className="ki-duotone ki-badge fs-3x me-5">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i> */}
                      <FontAwesomeIcon icon={faUser} className="fs-3x me-5" />

                      <span className="d-block fw-semibold text-start">
                        <span className="text-gray-900 fw-bold d-block fs-4 mb-2">
                          Normal User
                        </span>
                        <span className="text-muted fw-semibold fs-6">
                          Sign up to explore and connect with businesses.
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className="col-lg-12">
                    <input
                      type="radio"
                      className="btn-check"
                      name="account_type"
                      value="business"
                      id="kt_create_account_form_account_type_business"
                    />
                    <label
                      className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center"
                      htmlFor="kt_create_account_form_account_type_business"
                    >
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className="fs-3x me-5"
                      />

                      <span className="d-block fw-semibold text-start">
                        <span className="text-gray-900 fw-bold d-block fs-4 mb-2">
                          Business User
                        </span>
                        <span className="text-muted fw-semibold fs-6">
                          Register your business to list services and connect
                          with clients.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="d-grid mt-10">
                    <button
                      type="submit"
                      id="kt_sign_up_submit"
                      className="btn btn-primary"
                    >
                      <span className="indicator-label">Next</span>
                      <FontAwesomeIcon icon={faRightLong} className="ps-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
}

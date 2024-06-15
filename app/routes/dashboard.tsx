import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import MainLayout from "~/components/layouts/main";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];
  return (
    <>
      <MainLayout title="Account" breadCrumb={breadcrumbItems}>
        <div className="card mb-5 mb-xl-10">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img src="assets/media/avatars/300-2.jpg" alt="image" />
                  <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="#"
                        className="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                      >
                        Eugenia
                      </a>
                      <a href="#">
                        <i className="ki-duotone ki-verify fs-1 text-primary">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_upgrade_plan"
                      >
                        Upgrade to Pro
                      </a>
                    </div>

                    <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone ki-profile-circle fs-4 me-1">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                        Developer
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone ki-geolocation fs-4 me-1">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        SF, Bay Area
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <i className="ki-duotone ki-sms fs-4 me-1">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        eugenia@kt.com
                      </a>
                    </div>
                  </div>

                  <div className="d-flex my-4">
                    <a
                      href="#"
                      className="btn btn-sm btn-light me-2"
                      id="kt_user_follow_button"
                    >
                      <i className="ki-duotone ki-check fs-2 d-none"></i>

                      <span className="indicator-label">Follow</span>

                      <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-light me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_offer_a_deal"
                    >
                      Hire Me
                    </a>

                    <div className="me-0">
                      <button
                        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        <i className="ki-solid ki-dots-horizontal fs-1"></i>
                      </button>

                      <div
                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3"
                        data-kt-menu="true"
                      >
                        <div className="menu-item px-3">
                          <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
                            Payments
                          </div>
                        </div>

                        <div className="menu-item px-3">
                          <a href="#" className="menu-link px-3">
                            Create Invoice
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a href="#" className="menu-link flex-stack px-3">
                            Create Payment
                            <span
                              className="ms-2"
                              data-bs-toggle="tooltip"
                              title="Specify a target name for future usage and reference"
                            >
                              <i className="ki-duotone ki-information fs-6">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                              </i>
                            </span>
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a href="#" className="menu-link px-3">
                            Generate Bill
                          </a>
                        </div>

                        <div
                          className="menu-item px-3"
                          data-kt-menu-trigger="hover"
                          data-kt-menu-placement="right-end"
                        >
                          <a href="#" className="menu-link px-3">
                            <span className="menu-title">Subscription</span>
                            <span className="menu-arrow"></span>
                          </a>

                          <div className="menu-sub menu-sub-dropdown w-175px py-4">
                            <div className="menu-item px-3">
                              <a href="#" className="menu-link px-3">
                                Plans
                              </a>
                            </div>

                            <div className="menu-item px-3">
                              <a href="#" className="menu-link px-3">
                                Billing
                              </a>
                            </div>

                            <div className="menu-item px-3">
                              <a href="#" className="menu-link px-3">
                                Statements
                              </a>
                            </div>

                            <div className="separator my-2"></div>

                            <div className="menu-item px-3">
                              <div className="menu-content px-3">
                                <label className="form-check form-switch form-check-custom form-check-solid">
                                  <input
                                    className="form-check-input w-30px h-20px"
                                    type="checkbox"
                                    value="1"
                                    name="notifications"
                                  />

                                  <span className="form-check-label text-muted fs-6">
                                    Recuring
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="menu-item px-3 my-1">
                          <a href="#" className="menu-link px-3">
                            Settings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap flex-stack">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <i className="ki-duotone ki-arrow-up fs-2 text-success me-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div
                            className="fs-2 fw-bold"
                            data-kt-countup="true"
                            data-kt-countup-value="4500"
                            data-kt-countup-prefix="$"
                          >
                            0
                          </div>
                        </div>

                        <div className="fw-semibold fs-6 text-gray-500">
                          Earnings
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <i className="ki-duotone ki-arrow-down fs-2 text-danger me-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div
                            className="fs-2 fw-bold"
                            data-kt-countup="true"
                            data-kt-countup-value="75"
                          >
                            0
                          </div>
                        </div>

                        <div className="fw-semibold fs-6 text-gray-500">
                          Projects
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <i className="ki-duotone ki-arrow-up fs-2 text-success me-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div
                            className="fs-2 fw-bold"
                            data-kt-countup="true"
                            data-kt-countup-value="60"
                            data-kt-countup-prefix="%"
                          >
                            0
                          </div>
                        </div>

                        <div className="fw-semibold fs-6 text-gray-500">
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                    <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                      <span className="fw-semibold fs-6 text-gray-500">
                        Profile Compleation
                      </span>
                      <span className="fw-bold fs-6">50%</span>
                    </div>
                    {/* <div className="h-5px mx-3 w-100 bg-light mb-3">
																<div className="bg-success rounded h-5px" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
															</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
          <div className="card-header cursor-pointer">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Profile Details</h3>
            </div>

            <a
              href="account/settings.html"
              className="btn btn-sm btn-primary align-self-center"
            >
              Edit Profile
            </a>
          </div>

          <div className="card-body p-9">
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Full Name
              </label>

              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">Max Smith</span>
              </div>
            </div>

            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">Company</label>

              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">
                  Keenthemes
                </span>
              </div>
            </div>

            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Contact Phone
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                >
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                </span>
              </label>

              <div className="col-lg-8 d-flex align-items-center">
                <span className="fw-bold fs-6 text-gray-800 me-2">
                  044 3276 454 935
                </span>
                <span className="badge badge-success">Verified</span>
              </div>
            </div>

            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Company Site
              </label>

              <div className="col-lg-8">
                <a
                  href="#"
                  className="fw-semibold fs-6 text-gray-800 text-hover-primary"
                >
                  keenthemes.com
                </a>
              </div>
            </div>

            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Country
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                >
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                </span>
              </label>

              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">Germany</span>
              </div>
            </div>

            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Communication
              </label>

              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">Email, Phone</span>
              </div>
            </div>

            <div className="row mb-10">
              <label className="col-lg-4 fw-semibold text-muted">
                Allow Changes
              </label>

              <div className="col-lg-8">
                <span className="fw-semibold fs-6 text-gray-800">Yes</span>
              </div>
            </div>

            <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
              <i className="ki-duotone ki-information fs-2tx text-warning me-4">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </i>

              <div className="d-flex flex-stack flex-grow-1">
                <div className="fw-semibold">
                  <h4 className="text-gray-900 fw-bold">
                    We need your attention!
                  </h4>
                  <div className="fs-6 text-gray-700">
                    Your payment was declined. To start using tools, please
                    <a className="fw-bold" href="account/billing.html">
                      Add Payment Method
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

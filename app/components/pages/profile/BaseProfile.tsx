import {
  faCircleCheck,
  faLocationArrow,
  faMailBulk,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "@remix-run/react";
import { IUser } from "~/types/authentication";
import { getProfilePhotoPath, getMediaPath } from "~/utils/helper";

type BaseProfilePropsType = {
  user: IUser;
};
export default function BaseProfile({ user }: BaseProfilePropsType) {
  const location = useLocation();
  return (
    <>
      {user.force_password_change && (
        <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6 mb-6">
          <i className="ki-duotone ki-bank fs-2tx text-primary me-4">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
            <div className="mb-3 mb-md-0 fw-semibold">
              <h4 className="text-gray-900 fw-bold">
                Password Change Notice!!!
              </h4>
              <div className="fs-6 text-gray-700 pe-7">
                You must change your password to continue through the system.
              </div>
            </div>
            {/* <a
            href="#"
            className="btn btn-primary px-6 align-self-center text-nowrap"
          >
            Withdraw Money
          </a> */}
          </div>
        </div>
      )}
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img
                  src={
                    user.profile?.profile_image
                      ? getProfilePhotoPath(user.profile?.profile_image)
                      : getMediaPath("/avatars/blank.png")
                  }
                  alt={user.profile?.first_name}
                />
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
                      {`${user.profile?.first_name} ${user.profile?.last_name}`}
                    </a>
                    <a href="#">
                      {/* <i className="ki-duotone ki-verify fs-1 text-primary">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i> */}
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="fs-1 text-primary"
                      />
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3"
                    >
                      Upgrade to Pro
                    </a>
                  </div>
                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      {/* <i className="ki-duotone ki-profile-circle fs-4 me-1">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i> */}
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="fs-4 me-1"
                      />
                      {user.role.name.toUpperCase()}
                    </a>
                    {user.profile?.address && (
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <FontAwesomeIcon
                          icon={faLocationArrow}
                          className="fs-4 me-1"
                        />
                        {user.profile.address}
                      </a>
                    )}
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                    >
                      <FontAwesomeIcon
                        icon={faMailBulk}
                        className="fs-4 me-1"
                      />
                      {user.email}
                    </a>
                  </div>
                </div>
                {/* <div className="d-flex my-4">
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
                                checked
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
              </div> */}
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
                  <div className="h-5px mx-3 w-100 bg-light mb-3">
                    {/* @ts-ignore */}
                    <div
                      className="bg-success rounded h-5px"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
            <li className="nav-item mt-2">
              <Link
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${location.pathname === "/profile" && "active"}`}
                to="/profile"
              >
                Overview
              </Link>
            </li>
            <li className="nav-item mt-2">
              <Link
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${location.pathname === "/change-password" && "active"}`}
                to="/change-password"
              >
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

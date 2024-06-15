import { faHome, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Children } from "react";
import { BreadCrumb } from "~/types/common";
import { Link } from "@remix-run/react";
import React from "react";
interface DashboardLayoutProps {
  breadCrumb?: BreadCrumb[];
  tabs?: React.ReactNode;
  children: React.ReactNode;
  // breadcrumbs?: Breadcrumb[]
  title: string;
  secondary?: React.ReactNode;
  loading?: boolean;
}
const MainLayout = ({ title, children, breadCrumb }: DashboardLayoutProps) => {
  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div
          id="kt_app_header"
          className="app-header"
          data-kt-sticky="true"
          data-kt-sticky-activate="{default: false, lg: true}"
          data-kt-sticky-name="app-header-sticky"
          data-kt-sticky-offset="{default: false, lg: '300px'}"
        >
          <div
            className="app-container container-fluid d-flex flex-stack"
            id="kt_app_header_container"
          >
            <div
              className="d-flex align-items-center d-block d-lg-none ms-n3"
              title="Show sidebar menu"
            >
              <div
                className="btn btn-icon btn-active-color-primary w-35px h-35px me-2"
                id="kt_app_sidebar_mobile_toggle"
              >
                <i className="ki-duotone ki-abstract-14 fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>

              <a href="index.html">
                <img
                  alt="Logo"
                  src="assets/media/logos/demo36.svg"
                  className="h-30px theme-light-show"
                />
                <img
                  alt="Logo"
                  src="assets/media/logos/demo36.svg"
                  className="h-30px theme-dark-show"
                />
              </a>
            </div>

            <div
              className="d-flex flex-stack flex-lg-row-fluid"
              id="kt_app_header_wrapper"
            >
              <div
                className="page-title gap-4 me-3 mb-5 mb-lg-0"
                data-kt-swapper="true"
                data-kt-swapper-mode="{default: 'prepend', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_content_container', lg: '#kt_app_header_wrapper'}"
              >
                <div className="d-flex align-items-center mb-3">
                  <a href="index.html">
                    <img
                      alt="Logo"
                      src="assets/media/logos/demo36.svg"
                      className="me-7 d-none d-lg-inline h-25px"
                    />
                  </a>

                  <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7">
                    <li className="breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1">
                      <Link to="/dashboard" className="text-hover-primary">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="fs-6 text-gray-700"
                        />
                      </Link>
                    </li>
                    {breadCrumb?.length &&
                      breadCrumb.map((item, index) => (
                        <React.Fragment key={index}>
                          <li className="breadcrumb-item">
                            <FontAwesomeIcon
                              icon={faRightLong}
                              className="fs-6 text-gray-700"
                            />
                          </li>
                          <li
                            className={`breadcrumb-item text-gray-700 fw-bold lh-1 mx-n1 ${index === breadCrumb.length - 1 ? "text-gray-500" : ""}`}
                          >
                            {item.link && index !== breadCrumb.length - 1 ? (
                              <Link
                                to={item.link}
                                className="text-hover-primary"
                              >
                                {item.title}
                              </Link>
                            ) : (
                              item.title
                            )}
                          </li>
                        </React.Fragment>
                      ))}
                  </ul>
                </div>

                <h1 className="text-gray-900 fw-bolder m-0">{title}</h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className="app-wrapper flex-column flex-row-fluid"
          id="kt_app_wrapper"
        >
          <div
            id="kt_app_sidebar"
            className="app-sidebar flex-column"
            data-kt-drawer="true"
            data-kt-drawer-name="app-sidebar"
            data-kt-drawer-activate="{default: true, lg: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="250px"
            data-kt-drawer-direction="start"
            data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
          >
            <div
              className="app-sidebar-header d-flex flex-column px-10 pt-8"
              id="kt_app_sidebar_header"
            >
              <div className="d-flex flex-stack mb-10">
                <div className="">
                  <div
                    className="d-flex align-items-center"
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-overflow="true"
                    data-kt-menu-placement="top-start"
                  >
                    <div className="d-flex flex-center cursor-pointer symbol symbol-custom symbol-40px">
                      <img src="assets/media/avatars/300-2.jpg" alt="image" />
                    </div>

                    <a
                      href="#"
                      className="text-white text-hover-primary fs-4 fw-bold ms-3"
                    >
                      Eugenia
                    </a>
                  </div>

                  <div
                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                    data-kt-menu="true"
                    // style={{ position: 'absolute', zIndex: '107' }}
                  >
                    <div className="menu-item px-3">
                      <div className="menu-content d-flex align-items-center px-3">
                        <div className="symbol symbol-50px me-5">
                          <img
                            alt="Logo"
                            src="assets/media/avatars/300-2.jpg"
                          />
                        </div>

                        <div className="d-flex flex-column">
                          <div className="fw-bold d-flex align-items-center fs-5">
                            Eugenia
                            <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                              Pro
                            </span>
                          </div>
                          <a
                            href="#"
                            className="fw-semibold text-muted text-hover-primary fs-7"
                          >
                            eugenia@kt.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="separator my-2"></div>

                    <div className="menu-item px-5">
                      <a
                        href="account/overview.html"
                        className="menu-link px-5"
                      >
                        My Profile
                      </a>
                    </div>

                    <div className="menu-item px-5">
                      <a
                        href="apps/projects/list.html"
                        className="menu-link px-5"
                      >
                        <span className="menu-text">My Projects</span>
                        <span className="menu-badge">
                          <span className="badge badge-light-danger badge-circle fw-bold fs-7">
                            3
                          </span>
                        </span>
                      </a>
                    </div>

                    <div
                      className="menu-item px-5"
                      data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                      data-kt-menu-placement="right-end"
                      data-kt-menu-offset="-15px, 0"
                    >
                      <a href="#" className="menu-link px-5">
                        <span className="menu-title">My Subscription</span>
                        <span className="menu-arrow"></span>
                      </a>

                      <div className="menu-sub menu-sub-dropdown w-175px py-4">
                        <div className="menu-item px-3">
                          <a
                            href="account/referrals.html"
                            className="menu-link px-5"
                          >
                            Referrals
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/billing.html"
                            className="menu-link px-5"
                          >
                            Billing
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/statements.html"
                            className="menu-link px-5"
                          >
                            Payments
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/statements.html"
                            className="menu-link d-flex flex-stack px-5"
                          >
                            Statements
                            <span
                              className="ms-2 lh-0"
                              data-bs-toggle="tooltip"
                              title="View your statements"
                            >
                              <i className="ki-duotone ki-information-5 fs-5">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                              </i>
                            </span>
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
                              <span className="form-check-label text-muted fs-7">
                                Notifications
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="menu-item px-5">
                      <a
                        href="account/statements.html"
                        className="menu-link px-5"
                      >
                        My Statements
                      </a>
                    </div>

                    <div className="separator my-2"></div>

                    <div
                      className="menu-item px-5"
                      data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                      data-kt-menu-placement="left-start"
                      data-kt-menu-offset="-15px, 0"
                    >
                      <a href="#" className="menu-link px-5">
                        <span className="menu-title position-relative">
                          Mode
                          <span className="ms-5 position-absolute translate-middle-y top-50 end-0">
                            <i className="ki-duotone ki-night-day theme-light-show fs-2">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                              <span className="path5"></span>
                              <span className="path6"></span>
                              <span className="path7"></span>
                              <span className="path8"></span>
                              <span className="path9"></span>
                              <span className="path10"></span>
                            </i>
                            <i className="ki-duotone ki-moon theme-dark-show fs-2">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </span>
                        </span>
                      </a>

                      <div
                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
                        data-kt-menu="true"
                        data-kt-element="theme-mode-menu"
                      >
                        <div className="menu-item px-3 my-0">
                          <a
                            href="#"
                            className="menu-link px-3 py-2"
                            data-kt-element="mode"
                            data-kt-value="light"
                          >
                            <span className="menu-icon" data-kt-element="icon">
                              <i className="ki-duotone ki-night-day fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                                <span className="path5"></span>
                                <span className="path6"></span>
                                <span className="path7"></span>
                                <span className="path8"></span>
                                <span className="path9"></span>
                                <span className="path10"></span>
                              </i>
                            </span>
                            <span className="menu-title">Light</span>
                          </a>
                        </div>

                        <div className="menu-item px-3 my-0">
                          <a
                            href="#"
                            className="menu-link px-3 py-2"
                            data-kt-element="mode"
                            data-kt-value="dark"
                          >
                            <span className="menu-icon" data-kt-element="icon">
                              <i className="ki-duotone ki-moon fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                            <span className="menu-title">Dark</span>
                          </a>
                        </div>

                        <div className="menu-item px-3 my-0">
                          <a
                            href="#"
                            className="menu-link px-3 py-2"
                            data-kt-element="mode"
                            data-kt-value="system"
                          >
                            <span className="menu-icon" data-kt-element="icon">
                              <i className="ki-duotone ki-screen fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                              </i>
                            </span>
                            <span className="menu-title">System</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div
                      className="menu-item px-5"
                      data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                      data-kt-menu-placement="right-end"
                      data-kt-menu-offset="-15px, 0"
                    >
                      <a href="#" className="menu-link px-5">
                        <span className="menu-title position-relative">
                          Language
                          <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
                            English
                            <img
                              className="w-15px h-15px rounded-1 ms-2"
                              src="assets/media/flags/united-states.svg"
                              alt=""
                            />
                          </span>
                        </span>
                      </a>

                      <div className="menu-sub menu-sub-dropdown w-175px py-4">
                        <div className="menu-item px-3">
                          <a
                            href="account/settings.html"
                            className="menu-link d-flex px-5 active"
                          >
                            <span className="symbol symbol-20px me-4">
                              <img
                                className="rounded-1"
                                src="assets/media/flags/united-states.svg"
                                alt=""
                              />
                            </span>
                            English
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/settings.html"
                            className="menu-link d-flex px-5"
                          >
                            <span className="symbol symbol-20px me-4">
                              <img
                                className="rounded-1"
                                src="assets/media/flags/spain.svg"
                                alt=""
                              />
                            </span>
                            Spanish
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/settings.html"
                            className="menu-link d-flex px-5"
                          >
                            <span className="symbol symbol-20px me-4">
                              <img
                                className="rounded-1"
                                src="assets/media/flags/germany.svg"
                                alt=""
                              />
                            </span>
                            German
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/settings.html"
                            className="menu-link d-flex px-5"
                          >
                            <span className="symbol symbol-20px me-4">
                              <img
                                className="rounded-1"
                                src="assets/media/flags/japan.svg"
                                alt=""
                              />
                            </span>
                            Japanese
                          </a>
                        </div>

                        <div className="menu-item px-3">
                          <a
                            href="account/settings.html"
                            className="menu-link d-flex px-5"
                          >
                            <span className="symbol symbol-20px me-4">
                              <img
                                className="rounded-1"
                                src="assets/media/flags/france.svg"
                                alt=""
                              />
                            </span>
                            French
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="menu-item px-5 my-1">
                      <a
                        href="account/settings.html"
                        className="menu-link px-5"
                      >
                        Account Settings
                      </a>
                    </div>

                    <div className="menu-item px-5">
                      <a
                        href="authentication/layouts/corporate/sign-in.html"
                        className="menu-link px-5"
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="app-sidebar-navs flex-column-fluid"
              id="kt_app_sidebar_navs"
            >
              <Sidebar />
            </div>
          </div>

          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
              <div
                id="kt_app_content"
                className="app-content flex-column-fluid"
              >
                <div
                  id="kt_app_content_container"
                  className="app-container container-fluid"
                >
                  {children}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;

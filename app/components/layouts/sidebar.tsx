import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { Form, Link, useLocation } from "@remix-run/react";
import { useUser } from "~/utils";

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  return json({ pathname });
};

const Sidebar = () => {
  const user = useUser();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const sidebar = document.getElementById("kt_app_sidebar_navs_wrappers");
    if (sidebar) {
      // Ensure the sidebar scrolls properly
      sidebar.style.overflowY = "auto";
      sidebar.style.maxHeight = "calc(100vh - 10px)"; // Adjust as needed
    }
  }, []);

  const handleMenuClick = (itemId: string) => {
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  return (
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
              // data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-overflow="true"
              data-kt-menu-placement="top-start"
            >
              <div className="d-flex flex-center cursor-pointer symbol symbol-custom symbol-40px">
                <img
                  src="assets/media/avatars/300-2.jpg"
                  alt="image"
                  onClick={() => setShowHeader(!showHeader)}
                />
              </div>

              <a
                href="#"
                className="text-white text-hover-primary fs-4 fw-bold ms-3"
              >
                Eugenia
              </a>
            </div>

            {showHeader && (
              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                data-kt-menu="true"
                style={{ display: "block", zIndex: "107" }}
              >
                <div className="menu-item px-3">
                  <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                      <img alt="Logo" src="assets/media/avatars/300-2.jpg" />
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
                        {user.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="separator my-2"></div>

                <div className="menu-item px-5">
                  <a href="account/overview.html" className="menu-link px-5">
                    My Profile
                  </a>
                </div>

                <div className="separator my-2"></div>

                {/* <div
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
              </div> */}

                {/* <div
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
              </div> */}

                {/* <div className="menu-item px-5 my-1">
                <a href="account/settings.html" className="menu-link px-5">
                  Account Settings
                </a>
              </div> */}

                <div className="menu-item px-5">
                  {/* <a
                  href="authentication/layouts/corporate/sign-in.html"
                  className="menu-link px-5"
                >
                  Sign Out
                </a> */}
                  <Form action="/logout" method="post">
                    <button type="submit" className="menu-link px-5">
                      Logout
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="app-sidebar-navs flex-column-fluid"
        id="kt_app_sidebar_navs"
      >
        <div
          id="kt_app_sidebar_navs_wrappers"
          className="hover-scroll-y mx-3 my-2"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_app_sidebar_header, #kt_app_sidebar_projects"
          data-kt-scroll-wrappers="#kt_app_sidebar_navs"
          data-kt-scroll-offset="5px"
        >
          <div
            id="#kt_app_sidebar_menu"
            data-kt-menu="true"
            data-kt-menu-expand="false"
            className="menu menu-column menu-rounded menu-sub-indention menu-state-bullet-primary px-4"
          >
            <div className="menu-item">
              <div className="menu-content menu-heading text-uppercase fs-7">
                Pages
              </div>
            </div>
            <div className="menu-item">
              <Link
                className={`menu-link ${location.pathname === "/dashboard" ? "here active" : ""}`}
                to="/dashboard"
              >
                <span className="menu-icon">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="fs-2"
                    style={{
                      color: location.pathname === "/dashboard" ? "white" : "",
                    }}
                  />
                </span>
                <span className="menu-title">Dashboard</span>
              </Link>
            </div>

            <div
              data-kt-menu-trigger="click"
              className={`menu-item menu-accordion ${activeMenu === "dashboard" ? "here show" : ""}`}
              onClick={() => handleMenuClick("dashboard")}
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faHome} className="fs-2" />
                </span>
                <span className="menu-title">Dashboards</span>
                <span className="menu-arrow"></span>
              </span>

              <div className="menu-sub menu-sub-accordion">
                <div className="menu-item">
                  <a className="menu-link active" href="index.html">
                    <span className="menu-bullet">
                      <span className="bullet bullet-dot"></span>
                    </span>
                    <span className="menu-title">Default</span>
                  </a>
                </div>
              </div>
            </div>

            <div
              data-kt-menu-trigger="click"
              className={`menu-item menu-accordion ${activeMenu === "pages" ? "show" : ""}`}
              onClick={() => handleMenuClick("pages")}
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faGift} className="fs-2" />
                </span>
                <span className="menu-title">Pages</span>
                <span className="menu-arrow"></span>
              </span>

              <div className="menu-sub menu-sub-accordion">
                <div
                  data-kt-menu-trigger="click"
                  className="menu-item menu-accordion"
                >
                  <span className="menu-link">
                    <span className="menu-bullet">
                      <span className="bullet bullet-dot"></span>
                    </span>
                    <span className="menu-title">User Profile</span>
                    <span className="menu-arrow"></span>
                  </span>

                  <div className="menu-sub menu-sub-accordion">
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/overview.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Overview</span>
                      </a>
                    </div>

                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/projects.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Projects</span>
                      </a>
                    </div>

                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/campaigns.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Campaigns</span>
                      </a>
                    </div>

                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/documents.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Documents</span>
                      </a>
                    </div>

                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/followers.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Followers</span>
                      </a>
                    </div>

                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="pages/user-profile/activity.html"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Activity</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="separator mx-8"></div>

          <div className="menu menu-rounded menu-column px-4">
            <div className="menu-item">
              <div className="menu-content menu-heading text-uppercase fs-7">
                Projects
              </div>
            </div>

            <div className="menu-item">
              <a className="menu-link" href="apps/projects/project.html">
                <span className="menu-icon">
                  <span className="bullet bullet-dot h-10px w-10px bg-primary"></span>
                </span>

                <span className="menu-title">Google Ads</span>

                <span className="menu-badge">
                  <span className="badge badge-custom">6</span>
                </span>
              </a>
            </div>

            <div className="menu-item">
              <a className="menu-link" href="apps/projects/targets.html">
                <span className="menu-icon">
                  <span className="bullet bullet-dot h-10px w-10px bg-success"></span>
                </span>

                <span className="menu-title">AirStoke App</span>

                <span className="menu-badge">
                  <span className="badge badge-custom">2</span>
                </span>
              </a>
            </div>

            <div className="menu-item">
              <a className="menu-link" href="apps/projects/budget.html">
                <span className="menu-icon">
                  <span className="bullet bullet-dot h-10px w-10px bg-warning"></span>
                </span>

                <span className="menu-title">Internal Tasks</span>

                <span className="menu-badge">
                  <span className="badge badge-custom">37</span>
                </span>
              </a>
            </div>

            <div
              className="menu-inner flex-column collapse"
              id="kt_app_sidebar_menu_projects_collapse"
            >
              <div className="menu-item">
                <a className="menu-link" href="apps/projects/users.html">
                  <span className="menu-icon">
                    <span className="bullet bullet-dot h-10px w-10px bg-danger"></span>
                  </span>

                  <span className="menu-title">Fitnes App</span>

                  <span className="menu-badge">
                    <span className="badge badge-custom">3</span>
                  </span>
                </a>
              </div>

              <div className="menu-item">
                <a className="menu-link" href="apps/projects/files.html">
                  <span className="menu-icon">
                    <span className="bullet bullet-dot h-10px w-10px bg-info"></span>
                  </span>

                  <span className="menu-title">Oppo CRM</span>

                  <span className="menu-badge">
                    <span className="badge badge-custom">12</span>
                  </span>
                </a>
              </div>

              <div className="menu-item">
                <a className="menu-link" href="apps/projects/activity.html">
                  <span className="menu-icon">
                    <span className="bullet bullet-dot h-10px w-10px bg-warning"></span>
                  </span>

                  <span className="menu-title">Finance Dispatch</span>

                  <span className="menu-badge">
                    <span className="badge badge-custom">25</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="menu-item">
              <a
                className="menu-link menu-collapse-toggle toggle collapsible collapsed"
                data-bs-toggle="collapse"
                href="#kt_app_sidebar_menu_projects_collapse"
                data-kt-toggle-text="Show less"
              >
                <span className="menu-icon">
                  <i className="ki-duotone ki-down toggle-off fs-2 me-0"></i>
                  <i className="ki-duotone ki-up toggle-on fs-2 me-0"></i>
                </span>

                <span className="menu-title" data-kt-toggle-text-target="true">
                  Show more
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

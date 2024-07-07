import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faCopy,
  faGift,
  faHome,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { Form, Link, useLocation } from "@remix-run/react";
import { useUser, hasRole } from "~/utils";
import { IUser } from "~/types/authentication";

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  return json({ pathname });
};

const Sidebar = () => {
  const user: IUser = useUser();
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

              <Link
                className="text-white text-hover-primary fs-4 fw-bold ms-3"
                to="/profile"
              >
                {user.profile?.first_name}
              </Link>
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
                        {user.profile?.first_name}
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
                  <Link className="menu-link px-5" to="/profile">
                    My Profile
                  </Link>
                </div>

                <div className="separator my-2"></div>

                <div className="menu-item px-5">
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
            <div className="menu-item">
              <Link
                className={`menu-link ${location.pathname === "/categories" ? "here active" : ""}`}
                to="/categories"
              >
                <span className="menu-icon">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="fs-2"
                    style={{
                      color: location.pathname === "/categories" ? "white" : "",
                    }}
                  />
                </span>
                <span className="menu-title">Cateogry Management</span>
              </Link>
            </div>

            {hasRole(user, ["superadmin", "admin", "user"]) && (
              <>
                <div className="menu-item pt-5">
                  <div className="menu-content">
                    <span className="menu-heading fw-bold text-uppercase fs-7">
                      User Management
                    </span>
                  </div>
                </div>
                <div
                  data-kt-menu-trigger="click"
                  className={`menu-item menu-accordion ${activeMenu === "users" || location.pathname === "/users/add" || location.pathname === "/users" ? "here show" : ""}`}
                  onClick={() => handleMenuClick("users")}
                >
                  <span className="menu-link">
                    <span className="menu-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <span className="menu-title">Users</span>
                    <span className="menu-arrow"></span>
                  </span>

                  <div className="menu-sub menu-sub-accordion menu-active-bg">
                    <div className="menu-item">
                      <Link
                        className={`menu-link ${location.pathname === "/users" ? "here active" : ""}`}
                        to="/users"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Users List</span>
                      </Link>
                    </div>

                    <div className="menu-item">
                      <Link
                        className={`menu-link ${location.pathname === "/users/add" ? "here active" : ""}`}
                        to="/users/add"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Add User</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {hasRole(user, ["superadmin", "admin"]) && (
              <>
                <div className="menu-item pt-5">
                  <div className="menu-content">
                    <span className="menu-heading fw-bold text-uppercase fs-7">
                      Access & Controls
                    </span>
                  </div>
                </div>
                <div
                  data-kt-menu-trigger="click"
                  className={`menu-item menu-accordion ${activeMenu === "rbac" || location.pathname === "/roles" || location.pathname === "/roles/add" || location.pathname === "/permissions" || location.pathname === "/permissions/sync" ? "here show" : ""}`}
                  onClick={() => handleMenuClick("rbac")}
                >
                  <span className="menu-link">
                    <span className="menu-icon">
                      <FontAwesomeIcon icon={faBank} />
                    </span>
                    <span className="menu-title">Roles & Permissions</span>
                    <span className="menu-arrow"></span>
                  </span>

                  <div className="menu-sub menu-sub-accordion menu-active-bg">
                    <div className="menu-item">
                      <Link
                        className={`menu-link ${location.pathname === "/roles" || location.pathname === "/roles/add" ? "here active" : ""}`}
                        to="/roles"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Roles</span>
                      </Link>
                    </div>

                    <div className="menu-item">
                      <Link
                        className={`menu-link ${location.pathname === "/permissions" || location.pathname === "/permissions/sync" ? "here active" : ""}`}
                        to="/permissions"
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">Permissions</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="separator mx-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

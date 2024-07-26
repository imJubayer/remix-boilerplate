import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faBriefcase,
  faCopy,
  faHome,
  faThumbsUp,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { Form, Link, useLocation } from "@remix-run/react";
import { useUser, hasRole, hasPermission } from "~/utils";
import { IUser } from "~/types/authentication";
import { getMediaPath, getProfilePhotoPath } from "~/utils/helper";

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
                  src={
                    user.profile?.profile_image
                      ? getProfilePhotoPath(user.profile?.profile_image)
                      : getMediaPath("/avatars/blank.png")
                  }
                  alt={user.profile?.first_name}
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
                      <img
                        alt={user.profile?.first_name}
                        src={
                          user.profile?.profile_image
                            ? getProfilePhotoPath(user.profile?.profile_image)
                            : getMediaPath("/avatars/blank.png")
                        }
                      />
                    </div>

                    <div className="d-flex flex-column">
                      <div className="fw-bold d-flex align-items-center fs-5">
                        {user.profile?.first_name}
                        <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                          {user.role.name.toUpperCase()}
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

                <div className="custom-separator my-2"></div>

                <div className="menu-item px-5">
                  <Link className="custom-menu-link px-5" to="/profile">
                    My Profile
                  </Link>
                </div>

                <div className="custom-separator my-2"></div>

                <div className="menu-item px-5">
                  <Form action="/logout" method="post">
                    <button type="submit" className="btn btn-light-primary">
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
                className={`menu-link ${location.pathname.startsWith("/categories") ? "here active" : ""}`}
                to="/categories"
              >
                <span className="menu-icon">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="fs-2"
                    style={{
                      color: location.pathname.startsWith("/categories")
                        ? "white"
                        : "",
                    }}
                  />
                </span>
                <span className="menu-title">Cateogry Management</span>
              </Link>
            </div>
            {/* {hasRole(user, ["businessUser"]) && (
              <div className="menu-item">
                <Link
                  className={`menu-link ${location.pathname === "/business/team" || location.pathname === "/business/add-member" ? "here active" : ""}`}
                  to="/business/team"
                >
                  <span className="menu-icon">
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="fs-2"
                      style={{
                        color:
                          location.pathname === "/business/team" ||
                          location.pathname === "/business/add-member"
                            ? "white"
                            : "",
                      }}
                    />
                  </span>
                  <span className="menu-title">Team Management</span>
                </Link>
              </div>
            )} */}

            {hasRole(user, ["businessUser"]) && (
              <div
                className={`menu-item menu-accordion ${activeMenu === "business" || location.pathname.startsWith("/business") ? "here show" : ""}`}
                onClick={() => handleMenuClick("business")}
              >
                <span className="menu-link">
                  <span className="menu-icon">
                    <FontAwesomeIcon className="fs-2" icon={faBriefcase} />
                  </span>
                  <span className="menu-title">Business</span>
                  <span className="menu-arrow"></span>
                </span>

                <div className="menu-sub menu-sub-accordion menu-active-bg">
                  <div className="menu-item">
                    <Link
                      className={`menu-link ${location.pathname === "/business/information" ? "here active" : ""}`}
                      to="/business/information"
                    >
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot"></span>
                      </span>
                      <span className="menu-title">Business Infomation</span>
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link
                      className={`menu-link ${location.pathname === "/business/team" || location.pathname === "/business/add-member" ? "here active" : ""}`}
                      to="/business/team"
                    >
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot"></span>
                      </span>
                      <span className="menu-title">Team Management</span>
                    </Link>
                  </div>

                  <div className="menu-item">
                    <Link
                      className={`menu-link ${location.pathname === "/business/favourite-users" ? "here active" : ""}`}
                      to="/business/favourite-users"
                    >
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot"></span>
                      </span>
                      <span className="menu-title">Favourite User's</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {hasRole(user, ["user"]) && (
              <div className="menu-item">
                <Link
                  className={`menu-link ${location.pathname.startsWith("/business/favourite") ? "here active" : ""}`}
                  to="/business/favourite-business"
                >
                  <span className="menu-icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="fs-2"
                      style={{
                        color: location.pathname.startsWith(
                          "/business/favourite",
                        )
                          ? "white"
                          : "",
                      }}
                    />
                  </span>
                  <span className="menu-title">Favourite Business</span>
                </Link>
              </div>
            )}
            {hasPermission(user, ["view-users", "add-user"]) && (
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
                  className={`menu-item menu-accordion ${activeMenu === "users" || location.pathname.startsWith("/users") ? "here show" : ""}`}
                  onClick={() => handleMenuClick("users")}
                >
                  <span className="menu-link">
                    <span className="menu-icon">
                      <FontAwesomeIcon className="fs-2" icon={faUsers} />
                    </span>
                    <span className="menu-title">Users</span>
                    <span className="menu-arrow"></span>
                  </span>

                  <div className="menu-sub menu-sub-accordion menu-active-bg">
                    {hasPermission(user, ["view-users"]) && (
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
                    )}

                    {hasPermission(user, ["add-user"]) && (
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
                    )}
                  </div>
                </div>
              </>
            )}

            {/* <div className="menu-item pt-5">
              <div className="menu-content">
                <span className="menu-heading fw-bold text-uppercase fs-7">
                  Profile Management
                </span>
              </div>
            </div> */}
            {/* <div
              data-kt-menu-trigger="click"
              className={`menu-item menu-accordion ${activeMenu === "profile-management" || location.pathname === "/business/information" || location.pathname === "/profile" || location.pathname === "/change-password" ? "here show" : ""}`}
              onClick={() => handleMenuClick("profile-management")}
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faUserTie} />
                </span>
                <span className="menu-title">Profile Management</span>
                <span className="menu-arrow"></span>
              </span>

              <div className="menu-sub menu-sub-accordion menu-active-bg">
                <div className="menu-item">
                  <Link
                    className={`menu-link ${location.pathname === "/profile" ? "here active" : ""}`}
                    to="/profile"
                  >
                    <span className="menu-bullet">
                      <span className="bullet bullet-dot"></span>
                    </span>
                    <span className="menu-title">My Profile</span>
                  </Link>
                </div>

                {hasRole(user, ["superadmin", "admin", "businessUser"]) && (
                  <div className="menu-item">
                    <Link
                      className={`menu-link ${location.pathname === "/business/information" ? "here active" : ""}`}
                      to="/business/information"
                    >
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot"></span>
                      </span>
                      <span className="menu-title">Business Infomation</span>
                    </Link>
                  </div>
                )}

                <div className="menu-item">
                  <Link
                    className={`menu-link ${location.pathname === "/change-password" ? "here active" : ""}`}
                    to="/change-password"
                  >
                    <span className="menu-bullet">
                      <span className="bullet bullet-dot"></span>
                    </span>
                    <span className="menu-title">Change Password</span>
                  </Link>
                </div>
              </div>
            </div> */}

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
                  className={`menu-item menu-accordion ${activeMenu === "rbac" || location.pathname.startsWith("/roles") || location.pathname.startsWith("/permissions") ? "here show" : ""}`}
                  onClick={() => handleMenuClick("rbac")}
                >
                  <span className="menu-link">
                    <span className="menu-icon">
                      <FontAwesomeIcon className="fs-2" icon={faBank} />
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
                        to="/permissions/sync"
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

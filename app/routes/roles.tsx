import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { useEffect } from "react";

import MainLayout from "~/components/layouts/main";
import { getUser } from "~/session.server";
import { abort, handleSuccessToast, hasRole } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredRoles = ["admin", "superadmin"];
  const user = await getUser(request);
  if (!hasRole(user, requiredRoles)) {
    abort(403);
  }
  return {};
};

export default function RolesIndex() {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbItems = [{ title: "Roles", link: "/roles" }];
  if (pathname === "/roles/add") {
    breadcrumbItems.push({ title: "Add Role", link: "/roles/add" });
  }

  useEffect(() => {
    const successMessage = localStorage.getItem("success");
    if (successMessage) {
      handleSuccessToast(successMessage);
      localStorage.removeItem("success");
      // session.forget('success');
    }
  }, [location]);

  return (
    <MainLayout
      title="Role Management"
      breadCrumb={breadcrumbItems}
      headerTitle="Roles"
    >
      <Outlet />
    </MainLayout>
  );
}

import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import MainLayout from "~/components/layouts/main";
import { getUser } from "~/session.server";
import { abort, hasRole } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredRoles = ["admin", "superadmin"];
  const user = await getUser(request);
  if (user && !hasRole(user, requiredRoles)) {
    abort(403);
  }
  return 1;
};

export default function PermissionIndex() {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbItems = [{ title: "Permissions", link: "/permissions" }];
  if (pathname === "/permissions/add") {
    breadcrumbItems.push({
      title: "Add Permissions",
      link: "/permissions/add",
    });
  }

  return (
    <MainLayout
      title="Permission Management"
      breadCrumb={breadcrumbItems}
      headerTitle="Permissions"
    >
      <Outlet />
    </MainLayout>
  );
}

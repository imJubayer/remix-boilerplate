import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";

import MainLayout from "~/components/layouts/main";
import { getUser } from "~/session.server";
import { abort, hasRole } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredRoles = ["admin", "superadmin"];
  const user = await getUser(request);
  if (!hasRole(user, requiredRoles)) {
    abort(403);
  }
  return {};
};

export default function UsersIndex() {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbItems = [{ title: "Users", link: "/users" }];
  if (pathname === "/users/add") {
    breadcrumbItems.push({ title: "Add User", link: "/users/add" });
  }

  return (
    <MainLayout
      title="User Management"
      breadCrumb={breadcrumbItems}
      headerTitle="User"
    >
      <Outlet />
    </MainLayout>
  );
}

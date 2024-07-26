import { Outlet, useLocation } from "@remix-run/react";
import MainLayout from "~/components/layouts/main";

export default function Business() {
  const location = useLocation();
  const pathname = location.pathname;
  const breadcrumbItems = [
    { title: "Business", link: "/business/information" },
  ];

  if (pathname === "/business/team") {
    breadcrumbItems.push({ title: "Team", link: "/business/team" });
  }
  if (pathname === "/business/add-member") {
    breadcrumbItems.push({ title: "Team", link: "/business/team" });
    breadcrumbItems.push({ title: "Add Team", link: "/business/add-member" });
  }

  if (pathname === "/business/favourite-users") {
    breadcrumbItems.push({
      title: "Favourite User's",
      link: "/business/favourite-users",
    });
  }

  return (
    <MainLayout
      title="Business"
      breadCrumb={breadcrumbItems}
      headerTitle="Business"
    >
      <Outlet />
    </MainLayout>
  );
}

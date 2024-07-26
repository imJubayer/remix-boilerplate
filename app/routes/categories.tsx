import { Outlet } from "@remix-run/react";

import MainLayout from "~/components/layouts/main";

export default function CategoriesIndex() {
  const breadcrumbItems = [{ title: "Categories", link: "/categories" }];

  return (
    <MainLayout
      title="Category Management"
      breadCrumb={breadcrumbItems}
      headerTitle="Category"
    >
      <Outlet />
    </MainLayout>
  );
}

import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import StatusBadge from "~/components/common/statusBadge";
import { prisma } from "~/db.server";
import { getDateString } from "~/utils/helper";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    return redirect("/categories");
  }

  const categoryId: number | undefined = parseInt(params.id);
  if (!categoryId) {
    return redirect("/categories");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      parent: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!category) {
    return redirect("/404");
  }

  return json({ category });
};

export default function Category() {
  const { category } = useLoaderData<typeof loader>();
  return (
    <div className="card card-body">
      <div className="fs-6">
        <div className="fw-bold">Category Name</div>
        <div className="text-gray-600">{category.name}</div>
        <div className="fw-bold mt-5">Parent Category Name</div>
        <div className="text-gray-600">
          {category.parent ? category.parent.name : "-"}
        </div>
        <div className="fw-bold mt-5">Description</div>
        <div className="text-gray-600">{category.description}</div>
        <div className="fw-bold mt-5">Last Updated</div>
        <div className="text-gray-600">{getDateString(category.updatedAt)}</div>
        <div className="fw-bold mt-5">Status</div>
        <div className="text-gray-600">
          <StatusBadge badgeText={category.status} />
        </div>
      </div>
    </div>
  );
}

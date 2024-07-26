import { Category } from "@prisma/client";

import { prisma } from "~/db.server";
import { uploadFile } from "~/utils/helper.server";

export async function getCategoryById(id: string): Promise<Category | null> {
  return prisma.category.findUnique({
    where: {
      deletedAt: null,
      id: id,
    },
    include: {
      parent: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getCategories(
  page?: number,
  limit?: number,
  searchQuery?: string,
): Promise<Category[]> {
  return prisma.category.findMany({
    where: {
      deletedAt: null,
      name: searchQuery ? { contains: searchQuery } : undefined,
    },
    include: {
      parent: {
        select: {
          name: true,
        },
      },
    },
    skip: page && limit ? (page - 1) * limit : undefined,
    take: limit,
  });
}

export async function categoryCount(): Promise<number> {
  return await prisma.category.count({
    where: {
      deletedAt: null,
    },
  });
}

export async function createCategory({
  name,
  description,
  status,
  parent,
  image,
}: {
  name: string;
  description: string;
  status?: string;
  parent?: string;
  image?: File;
}): Promise<Category | null> {
  let imageFilePath = undefined;

  if (image) {
    imageFilePath = await uploadFile(image, "categories");
  }

  return prisma.category.create({
    data: {
      name,
      description,
      status: status ? "Active" : "Inactive",
      parent: parent ? { connect: { id: parent } } : undefined,
      image: imageFilePath,
    },
  });
}

export async function updateCategory({
  id,
  name,
  description,
  status,
  parentId,
  image,
}: {
  id: string;
  name: string;
  description: string;
  status?: string;
  parentId?: string;
  image?: File;
}): Promise<Category | null> {
  let imageFilePath = undefined;

  if (image) {
    imageFilePath = await uploadFile(image, "categories");
  }

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      status: status ? "Active" : "Inactive",
      parent: parentId ? { connect: { id: parentId } } : undefined,
      image: imageFilePath,
    },
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: {
      id: id,
    },
  });
}

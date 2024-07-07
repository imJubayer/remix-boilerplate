import { json, useMatches } from "@remix-run/react";
import { useMemo } from "react";
import toast from "react-hot-toast";

import { getUserById, type User } from "~/models/user.server";
// import { User as UserType } from "./types/authentication";
// import { RoleName } from "./types/rbac";
// import { request } from "http";
// import { requireUser, requireUserId } from "./session.server";
import { Permission, Role } from "@prisma/client";
import { IUser } from "./types/authentication";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as Record<string, unknown>;
}

function isUser(user: unknown): user is IUser {
  return (
    user != null &&
    typeof user === "object" &&
    "email" in user &&
    typeof user.email === "string"
  );
}

export function useOptionalUser(): IUser | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): IUser {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function hasRole(user: IUser | null, requiredRoles: string[]): boolean {
  if (!user || !user.role) {
    return false; // If user is null or user has no role, return false
  }
  return requiredRoles.includes(user.role!.name);
}

// export async function requireRoles(
//   request: Request,
//   requiredRoles: string[],
// ): Promise<boolean> {
//   try {
//     const user = await requireUser(request);
//     // Check if the user has at least one of the required roles
//     if (!requiredRoles.some((role) => hasRole(user, role))) {
//       abort(403);
//     }
//     return true; // Return true if user has required roles
//   } catch (error) {
//     // Handle errors from requireUser, such as logout
//     throw error;
//   }
// }

export function abort(
  status: number,
  message: string = "Permission denied",
): never {
  throw json(
    {
      error: "Forbidden",
      message,
    },
    { status },
  );
}

export function hasPermission(
  user: IUser | null,
  permissions: string[],
): boolean {
  try {
    if (!user) {
      return false; // User not authenticated or not found
    }

    // Check if any of the user's roles have the required permissions
    const hasPermission = user.role?.permissions.some(
      (permission: Permission) => permissions.includes(permission.action),
    );
    return hasPermission;
  } catch (error) {
    throw error;
  }
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const handleSuccessToast = (msg: string) => {
  toast.success(msg);
};

export const handleErrorToast = (msg: string) => {
  toast.error(msg);
};

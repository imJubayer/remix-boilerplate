/**
 * Permissions and Roles.
 * Implementation based on github.com/epicweb-dev/epic-stack
 */
import { json } from "@remix-run/node";
import { RoleName } from "~/types/rbac";
import { useUser } from "~/utils";

export async function requireUserWithRole(request: Request, name: RoleName) {
  const user = await useUser();
  // const hasRole = hasRole(user, name);
  // if (!hasRole) {
  //   throw json(
  //     {
  //       error: "Unauthorized",
  //       requiredRole: name,
  //       message: `Unauthorized: required role: ${name}`,
  //     },
  //     { status: 403 },
  //   );
  // }
  // return user;
}

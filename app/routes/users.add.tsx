import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { getRoles } from "~/models/role.server";
import { handleSuccessToast, hasPermission } from "~/utils";
import { getUser } from "~/session.server";
import userService from "~/services/user.service";
import { useEffect } from "react";
import AddEditUserForm from "~/components/pages/form/AddEditForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredPermissions = ["add-user"];
  const user = await getUser(request);
  if (!hasPermission(user, requiredPermissions)) {
    return redirect("/forbidden");
  }
  const { roles } = await getRoles();
  return json({ roles });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await userService.addUser(request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function AddUser() {
  const navigate = useNavigate();
  const transition = useNavigation();

  const isSubmitting = transition.state === "submitting";
  const actionData = useActionData<typeof action>();
  const { roles } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
      navigate("/users");
    }
  }, [actionData]);
  return (
    <>
      <AddEditUserForm
        actionData={actionData}
        roles={roles}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

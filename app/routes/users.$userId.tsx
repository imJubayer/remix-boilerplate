import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { getRoles } from "~/models/role.server";
import invariant from "tiny-invariant";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import userService from "~/services/user.service";
import { useEffect } from "react";
import { handleSuccessToast } from "~/utils";
import AddEditUserForm from "~/components/pages/form/AddEditForm";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.userId, "userId not found");
  const user = await getUserById(params.userId);
  const { roles } = await getRoles();
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user, roles });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "userId not found");
  const response = await userService.updateUser(params.userId, request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function EditUser() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const { user, roles } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
      navigate("/users");
    }
  }, [actionData]);

  return <AddEditUserForm actionData={actionData} roles={roles} user={user} />;
}

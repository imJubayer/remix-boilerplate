import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";
import businessService from "~/services/business.service";
import userService from "~/services/user.service";
import { handleSuccessToast } from "~/utils";
import { BusinessTeamColumn } from "~/utils/columns/businessTeamColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { members, total, page, limit } =
    await businessService.getTeamMembers(request);
  return json({ members, total, page, limit });
};

export const action = async (actionFunctionArgs: ActionFunctionArgs) => {
  const response = await userService.userStatusToggle(actionFunctionArgs);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function BusinessTeam() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { members, total, page, limit } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleToggleUserStatus = async (id: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Update user status?",
      "Yes, update!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("id", id);
      submit(formData, { method: "put" });
    }
  };

  const addMemberButton = (
    <Link
      to="/business/add-member"
      type="button"
      className="btn btn-light-primary"
    >
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Add Team Member
    </Link>
  );

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
      navigate("/business/team");
    }
  }, [actionData]);

  return (
    <BasicDataTable
      // searchable
      showSerial
      name="Business Team Member's"
      secondary={addMemberButton}
      columns={BusinessTeamColumn(handleToggleUserStatus)}
      rows={members}
      count={total}
      page={page}
      rowsPerPage={limit}
    />
  );
}

import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import BusinessTeamMemberForm from "~/components/pages/form/AddBusinessMemberForm";
import businessService from "~/services/business.service";
import { handleSuccessToast } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await businessService.addTeamMember(request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function AddTeamMember() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
      navigate("/business/team");
    }
  }, [actionData]);
  return <BusinessTeamMemberForm actionData={actionData} />;
}

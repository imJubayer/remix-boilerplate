import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import BusinessInformationDetails from "~/components/pages/business/Information";
import BusinessInfoForm from "~/components/pages/form/BusinessInformationForm";
import businessService from "~/services/business.service";
import categoryService from "~/services/category.service";
import { handleSuccessToast, useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const categories = await categoryService.addLoader();
  return json({ categories });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await businessService.updateBusinessInfo(request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function BusinessInformation() {
  const user = useUser();
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [editProfileMode, setEditProfileMode] = useState(false);

  const handleEditMode = () => {
    setEditProfileMode(!editProfileMode);
  };

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      setEditProfileMode(false);
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  return (
    <>
      {editProfileMode ? (
        <BusinessInfoForm
          actionData={actionData}
          categories={categories}
          handleEditMode={handleEditMode}
        />
      ) : (
        <BusinessInformationDetails
          user={user}
          editProfileMode={editProfileMode}
          handleEditMode={handleEditMode}
        />
      )}
    </>
  );
}

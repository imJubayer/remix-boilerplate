import React from "react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import MainLayout from "~/components/layouts/main";
import { handleSuccessToast, useUser } from "~/utils";
import { useEffect, useState } from "react";
import { IUser } from "~/types/authentication";
import { getMediaPath, getProfilePhotoPath } from "~/utils/helper";
import userService from "~/services/user.service";
import EditProfileForm from "~/components/pages/form/EditProfileForm";
import BaseProfile from "~/components/pages/profile/BaseProfile";
import ProfileDetails from "~/components/pages/profile/ProfileDetails";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await userService.updateProfile(request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

const Profile = () => {
  const user: IUser = useUser();
  const breadcrumbItems = [{ title: "Profile", link: "/profile" }];
  const actionData = useActionData<typeof action>();

  const [editProfileMode, setEditProfileMode] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    user.profile?.profile_image
      ? getProfilePhotoPath(user.profile?.profile_image)
      : getMediaPath("/avatars/blank.png"),
  );

  const updatePreviewImageUrl = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImageUrl(URL.createObjectURL(file));
    } else {
      setPreviewImageUrl(null);
    }
  };

  const handleEditMode = () => {
    setEditProfileMode(!editProfileMode);
  };

  useEffect(() => {
    if (actionData?.success && actionData.msg) {
      handleSuccessToast(actionData.msg);
      setEditProfileMode(false);
    }
  }, [actionData]);
  return (
    <MainLayout
      title="Profile"
      breadCrumb={breadcrumbItems}
      headerTitle="Profile"
    >
      <>
        <BaseProfile user={user} />
        <div className="card mb-5 mb-xl-10">
          <div className="card-header border-0 cursor-pointer" role="button">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Profile Details</h3>
            </div>
            {!editProfileMode && (
              <button
                onClick={handleEditMode}
                className="btn btn-sm btn-primary align-self-center"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div
            id="kt_account_settings_profile_details"
            className="collapse show"
          >
            {editProfileMode ? (
              <EditProfileForm
                actionData={actionData}
                user={user}
                previewImageUrl={previewImageUrl}
                updatePreviewImageUrl={updatePreviewImageUrl}
                handleEditMode={handleEditMode}
              />
            ) : (
              <ProfileDetails user={user} />
            )}
          </div>
        </div>
      </>
    </MainLayout>
  );
};
export default Profile;

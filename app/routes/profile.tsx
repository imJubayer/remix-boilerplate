import {
  faInfo,
  faPencil,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Profile } from "@prisma/client";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import MainLayout from "~/components/layouts/main";
import { getProfile, updateUserProfile } from "~/models/profile.server";
import { profileUpdateSchema } from "~/schema/authentication";
import { requireUserId } from "~/session.server";
import { handleSuccessToast, useUser } from "~/utils";
import { useEffect } from "react";
import { User } from "~/types/authentication";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    const validatedData = await profileUpdateSchema.validate(formDataObject, {
      abortEarly: false,
    });
    const { first_name, last_name, phone, gender, age } = validatedData;

    await updateUserProfile(userId, {
      first_name,
      last_name,
      phone,
      gender,
      age,
    });
    return json({ success: true, msg: "Profile Updated successfully" });
  } catch (error) {
    return json(
      { success: false, msg: "Something went wrong", errors: error },
      { status: 422 },
    );
  }
};

const Profile = () => {
  const user: User = useUser();
  const breadcrumbItems = [{ title: "Profile", link: "/profile" }];
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);
  return (
    <MainLayout title="Profile" breadCrumb={breadcrumbItems}>
      <div className="card mb-5 mb-xl-10">
        <div
          className="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Profile Details</h3>
          </div>
        </div>

        <div id="kt_account_settings_profile_details" className="collapse show">
          <Form
            id="kt_account_profile_details_form"
            className="form"
            method="post"
          >
            <div className="card-body border-top p-9">
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-semibold fs-6">
                  Avatar
                </label>

                <div className="col-lg-8">
                  <div
                    className="image-input image-input-outline"
                    data-kt-image-input="true"
                  >
                    <div
                      className="image-input-wrapper w-125px h-125px"
                      style={{
                        backgroundImage: `url(assets/media/avatars/300-1.jpg)`,
                      }}
                    ></div>

                    <label
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      title="Change avatar"
                    >
                      {/* <i className="ki-duotone ki-pencil fs-7">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i> */}
                      <FontAwesomeIcon
                        className="text-gray-500 fs-6"
                        icon={faPencil}
                      />

                      <input
                        type="file"
                        name="avatar"
                        accept=".png, .jpg, .jpeg"
                      />
                      <input type="hidden" name="avatar_remove" />
                    </label>

                    <span
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="cancel"
                      data-bs-toggle="tooltip"
                      title="Cancel avatar"
                    >
                      {/* <i className="ki-duotone ki-cross fs-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i> */}
                      <FontAwesomeIcon
                        className="text-gray-500 fs-6"
                        icon={faTimesCircle}
                      />
                    </span>

                    <span
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      title="Remove avatar"
                    >
                      {/* <i className="ki-duotone ki-cross fs-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i> */}
                      <FontAwesomeIcon
                        className="text-gray-500 fs-6"
                        icon={faTimesCircle}
                      />
                    </span>
                  </div>

                  <div className="form-text">
                    Allowed file types: png, jpg, jpeg.
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                  Full Name
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        name="first_name"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="First name"
                        defaultValue={user.profile?.first_name}
                      />
                    </div>

                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        name="last_name"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="Last name"
                        defaultValue={user.profile?.last_name}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-semibold fs-6">
                  <span className="required">Contact Phone</span>
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    title="Phone number must be active"
                  >
                    {/* <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i> */}
                    <FontAwesomeIcon
                      className="text-gray-500 fs-6"
                      icon={faInfo}
                    />
                  </span>
                </label>

                <div className="col-lg-8 fv-row">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Phone number"
                    value={user.profile?.phone}
                  />
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-semibold fs-6">
                  <span className="required">Gender</span>
                </label>
                <div className="col-lg-8 fv-row">
                  <select
                    name="gender"
                    aria-label="Select a Gender"
                    data-control="select2"
                    data-placeholder="Select a gender..."
                    className="form-select form-select-solid form-select-lg fw-semibold"
                    defaultValue={user.profile?.gender}
                  >
                    <option value="">Select an option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="reset"
                className="btn btn-light btn-active-light-primary me-2"
              >
                Discard
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="kt_account_profile_details_submit"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};
export default Profile;

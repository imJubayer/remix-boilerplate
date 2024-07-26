import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "@remix-run/react";
import { IUser } from "~/types/authentication";

type businessInfoFormPropsType = {
  actionData: any;
  user: IUser;
  previewImageUrl?: string | null;
  updatePreviewImageUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditMode: () => void;
};

export default function EditProfileForm({
  actionData,
  user,
  previewImageUrl,
  updatePreviewImageUrl,
  handleEditMode,
}: businessInfoFormPropsType) {
  return (
    <Form
      id="kt_account_profile_details_form"
      className="form"
      method="post"
      encType="multipart/form-data"
    >
      <div className="card-body border-top p-9">
        <input type="hidden" name="user_id" value={user.id} />
        <div className="row mb-6">
          <label className="col-lg-4 col-form-label fw-semibold fs-6">
            Profile Image
          </label>

          <div className="col-lg-8">
            <div
              className="image-input image-input-outline"
              data-kt-image-input="true"
            >
              <div
                className="image-input-wrapper w-125px h-125px"
                style={{
                  // backgroundImage: `url(assets/media/avatars/300-1.jpg)`,
                  backgroundImage: `url(${previewImageUrl || "assets/media/avatars/blank.png"})`,
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
                  className="text-gray-500 fs-6 text-hover-primary"
                  icon={faPencil}
                />

                <input
                  type="file"
                  name="profile_image"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  onChange={updatePreviewImageUrl}
                />
                <input type="hidden" name="avatar_remove" />
              </label>
            </div>

            <div className="form-text">
              Allowed file types: png, jpg, jpeg, gif.
            </div>
            <div className="form-text">Max size: 5 MB.</div>
            {actionData?.errors?.profile_image ? (
              <div className="text-danger" id="business-profile-image-error">
                {actionData.errors.profile_image}
              </div>
            ) : null}
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
                  className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.first_name ? "is-invalid border-danger" : ""}`}
                  placeholder="First name"
                  defaultValue={user.profile?.first_name}
                />
                {actionData?.errors?.first_name ? (
                  <div className="text-danger" id="business-first-name-error">
                    {actionData.errors.first_name}
                  </div>
                ) : null}
              </div>

              <div className="col-lg-6 fv-row">
                <input
                  type="text"
                  name="last_name"
                  className={`form-control form-control-lg form-control-solid ${actionData?.errors?.last_name ? "is-invalid border-danger" : ""}`}
                  placeholder="Last name"
                  defaultValue={user.profile?.last_name}
                />
                {actionData?.errors?.last_name ? (
                  <div className="text-danger" id="business-last-name-error">
                    {actionData.errors.last_name}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-6">
          <label className="col-lg-4 col-form-label fw-semibold fs-6">
            <span className="">Contact Phone</span>
          </label>

          <div className="col-lg-8 fv-row">
            <input
              type="tel"
              name="phone"
              className="form-control form-control-lg form-control-solid"
              placeholder="Phone number"
              defaultValue={user.profile?.phone}
            />
          </div>
        </div>

        <div className="row mb-6">
          <label className="col-lg-4 col-form-label fw-semibold fs-6">
            <span className="">Gender</span>
          </label>
          <div className="col-lg-8 fv-row">
            <select
              name="gender"
              aria-label="Select a Gender"
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
        <div className="row mb-6">
          <label className="col-lg-4 col-form-label fw-semibold fs-6">
            <span className="">Address</span>
          </label>
          <div className="col-lg-8 fv-row">
            <textarea
              name="address"
              placeholder="Your address"
              className="form-control form-control-lg form-control-solid h-100px"
              defaultValue={user.profile?.address}
            />
          </div>
        </div>
      </div>

      <div className="card-footer d-flex justify-content-end py-6 px-9">
        <button
          onClick={handleEditMode}
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
  );
}

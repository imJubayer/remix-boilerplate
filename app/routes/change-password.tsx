import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import PasswordInput from "~/components/common/password";
import MainLayout from "~/components/layouts/main";
import BaseProfile from "~/components/pages/profile/BaseProfile";
import userService from "~/services/user.service";
import { handleSuccessToast, useUser } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await userService.changePassword(request);
  return json(
    { success: response.success, msg: response.msg, errors: response.errors },
    { status: response.status },
  );
};

export default function ChangePassword() {
  const user = useUser();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  return (
    <MainLayout title="Change Password" headerTitle="Change Password">
      <BaseProfile user={user} />
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
            <h3 className="fw-bold m-0">Change Password</h3>
          </div>
        </div>

        <div id="kt_account_settings_profile_details" className="collapse show">
          <Form
            id="kt_account_change_password_form"
            className="form"
            method="post"
          >
            <div className="card-body border-top p-9">
              <input type="hidden" name="user_id" value={user.id} />

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6 required">
                  <span className="">New Password</span>
                </label>

                <div className="col-lg-8 fv-row">
                  <PasswordInput error={actionData?.errors?.password} />
                </div>
              </div>
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6 required">
                  <span className="">Confirm Password</span>
                </label>

                <div className="col-lg-8 fv-row">
                  <PasswordInput
                    name="confirm_password"
                    placeHolder="Confirm password"
                    error={actionData?.errors?.confirm_password}
                  />
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
}

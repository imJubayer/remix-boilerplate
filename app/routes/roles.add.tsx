import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { addRole } from "~/models/role.server";
import { roleSchema } from "~/schema/rbac";
import * as yup from "yup";
import { abort, hasPermission } from "~/utils";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredPermissions = ["add-role"];
  const user = await getUser(request);
  if (!hasPermission(user, requiredPermissions)) {
    abort(403);
  }
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    const validatedData = await roleSchema.validate(formDataObject, {
      abortEarly: false,
    });
    const { name } = validatedData;
    await addRole(name);

    // session.flash("success", "Role added successfully");
    return redirect("/roles");
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errorFields: any = {};
      error.inner.forEach((err: any) => {
        errorFields[err.path] = err.message;
      });
      return json({ errors: errorFields }, { status: 422 });
    }
    return json({ errors: error }, { status: 422 });
  }
};

export default function AddRole() {
  const actionData = useActionData<typeof action>();

  // useEffect(() => {
  //   if (actionData?.success) {
  //     handleSuccessToast(actionData.msg);
  //     redirect("/roles");
  //   }
  // }, [actionData]);
  return (
    <>
      <h1>Create Role</h1>
      <div className="card">
        {/* <div className="card-header border-0 pt-6">
          <div className="card-title text-center">
            <div className="d-flex align-items-center position-relative my-1">
              <h2>Create Role</h2>
            </div>
          </div>
        </div> */}

        <div className="card-body py-4">
          <Form id="add_role_form" className="form form-validate" method="POST">
            <div
              className="d-flex flex-column scroll-y px-5 px-lg-10"
              id="add_user"
            >
              <div className="fv-row">
                <label className="required required form-label fw-semibold fs-6 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  id="add-role-name"
                  name="name"
                  className={`form-control form-control-solid mb-3 mb-lg-0 ${actionData?.errors?.name ? "is-invalid border-danger" : ""}`}
                  placeholder="Role name"
                  autoFocus
                />
                {actionData?.errors?.name ? (
                  <div className="text-danger" id="role-name-error">
                    {actionData.errors.name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="text-center pt-10">
              <button type="reset" className="btn btn-light me-3">
                Discard
              </button>
              <button type="submit" className="btn btn-primary">
                <span className="indicator-label">Submit</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

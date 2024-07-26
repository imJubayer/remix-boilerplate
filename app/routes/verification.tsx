import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import AuthLayout from "~/components/layouts/auth";
import { authenticationService } from "~/services/auth.service";
import { useEffect, useRef } from "react";
import { handleErrorToast, handleSuccessToast } from "~/utils";
import toast from "react-hot-toast";

export const meta: MetaFunction = () => [{ title: "Verification" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let url = new URL(request.url);
  let email = url.searchParams.get("email");
  if (!email) {
    return redirect("/login");
  }
  return json({ email });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await authenticationService.verifyOTP(request);
  if (result.success) {
    return json({ success: result.success, msg: result.msg }, { status: 200 });
    // return redirect("/login");
  } else {
    return json({ success: result.success, msg: result.msg }, { status: 422 });
  }
};

export default function Verification() {
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const { email } = useLoaderData<typeof loader>();

  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    if (e.currentTarget.value.length === e.currentTarget.maxLength) {
      const nextInput = inputRefs[index + 1];
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    }
  };

  useEffect(() => {
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    if (actionData?.msg && actionData.success === false) {
      handleErrorToast(actionData?.msg);
    }
    if (actionData?.success && actionData?.msg) {
      handleSuccessToast(actionData?.msg);
      navigate("/login");
    }
  }, [actionData]);

  return (
    <AuthLayout>
      <Form
        className="form w-100 mb-13"
        method="post"
        id="kt_sing_in_two_factor_form"
      >
        <div className="text-center mb-10">
          <img
            alt="Logo"
            className="mh-125px"
            // src="assets/media/svg/misc/smartphone-2.svg"
            src="assets/media/auth/verify-email.png"
          />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-gray-900 mb-3">OTP Verification</h1>

          <div className="text-muted fw-semibold fs-5 mb-5">
            Enter the verification code we sent to
          </div>

          <div className="fw-bold text-gray-900 fs-3">{email}</div>
        </div>

        <div className="mb-10">
          <div className="fw-bold text-start text-gray-900 fs-6 mb-1 ms-1">
            Type your 6 digit OTP
          </div>

          <div className="d-flex flex-wrap flex-stack">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code_${index + 1}`}
                  data-inputmask="'mask': '9', 'placeholder': ''"
                  maxLength={1}
                  className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                  ref={inputRefs[index]}
                  onInput={(e) => handleInput(e, index)}
                />
              ))}
            <input type="hidden" name="email" value={email} />
          </div>
        </div>

        <div className="d-flex flex-center">
          <button
            disabled={isSubmitting}
            type="submit"
            id="kt_sing_in_two_factor_submit"
            className="btn btn-lg btn-primary fw-bold"
          >
            <span className="indicator-label">
              Submit{" "}
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              )}
            </span>
          </button>
        </div>
      </Form>
    </AuthLayout>
  );
}

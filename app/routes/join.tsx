import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createUserSession } from "~/session.server";
import AuthLayout from "~/components/layouts/auth";
import { authenticationService } from "~/services/auth.service";
import NormalUserForm from "~/components/pages/form/NormalUserForm";
import BusinessUserForm from "~/components/pages/form/BusinessUserForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let url = new URL(request.url);
  let type = url.searchParams.get("type");
  if (!type) {
    return redirect("/account-type");
  }
  return json({ type });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await authenticationService.registerUser(request);

  if (result.success) {
    return createUserSession({
      redirectTo: "/dashboard",
      remember: false,
      request,
      userId: result.data!.user.id,
    });
  } else {
    return json({ errors: result.errors }, { status: 422 });
  }
};

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const { type } = useLoaderData<typeof loader>();
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <AuthLayout>
      {type === "normal" ? (
        <NormalUserForm isSubmitting={isSubmitting} actionData={actionData} />
      ) : (
        <BusinessUserForm isSubmitting={isSubmitting} actionData={actionData} />
      )}
    </AuthLayout>
  );
}

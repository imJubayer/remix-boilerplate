// services/AuthenticationService.ts

import {
  businessUserSignUpSchema,
  fogotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "~/schema/authentication.validation";
import * as yup from "yup";
import {
  createUser,
  getUserByEmail,
  User,
  verifyLogin,
} from "~/models/user.server";
import { ResponseFormat } from "~/types/common";
import { handleResponse } from "~/utils";
import sendMail from "~/utils/mailer";
import { generateRandomSixDigitNumber, regEmailTemplate } from "~/utils/helper";
import { forgotPasswordMail } from "~/mail/AuthenticationMail";
import {
  addUserSecret,
  deleteUserSecret,
  getUserSecretByUserId,
} from "~/models/user-secret.server";
import dayjs from "dayjs";

interface FormDataObject {
  [key: string]: any;
}

interface ValidatedData extends FormDataObject {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  redirectTo?: string;
}

class AuthenticationService {
  async registerUser(
    request: Request,
  ): Promise<ResponseFormat<{ user: User }>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(
      formData.entries(),
    ) as FormDataObject;

    const accountType = formData.get("account_type");
    const validationSchema =
      accountType === "user" ? signUpSchema : businessUserSignUpSchema;
    try {
      const validatedData = (await validationSchema.validate(formDataObject, {
        abortEarly: false,
      })) as ValidatedData;
      const {
        email,
        first_name,
        last_name,
        password,
        business_name,
        business_number,
      } = validatedData;

      const user = await createUser(
        email,
        first_name,
        last_name,
        password,
        business_name,
        business_number,
      );

      sendMail({
        to: email,
        subject: "Welcome to AllinOne",
        text: "Assalamu Alaikum",
        html: regEmailTemplate(first_name),
      }).catch((error) => {
        console.error("Error sending email:", error);
      });

      return handleResponse({ success: true, data: { user } });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errorFields[err.path] = err.message;
          }
        });
        return handleResponse({ success: false, errors: errorFields });
      }
      return handleResponse({ success: false, errors: error });
    }
  }

  async loginUser(
    request: Request,
  ): Promise<ResponseFormat<{ userId: string }>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      const validatedData = await signInSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const { email, password } = validatedData;
      const user = await verifyLogin(email, password);

      if (!user) {
        return handleResponse({
          success: false,
          errors: { email: "Invalid email or password", password: null },
        });
      }

      if (user.status !== "active") {
        return handleResponse({
          success: false,
          errors: { email: "This account is inactive", password: null },
        });
      }

      return handleResponse({ success: true, data: { userId: user.id } });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errorFields[err.path] = err.message;
          }
        });
        return handleResponse({ success: false, errors: errorFields });
      }
      return handleResponse({ success: false, errors: error });
    }
  }

  async forgotPassword(
    request: Request,
  ): Promise<ResponseFormat<{ email: string }>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await fogotPasswordSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const { email } = validatedData;
      const user = await getUserByEmail(email);
      const otp = generateRandomSixDigitNumber();
      if (user) {
        const expirationDate = dayjs().add(2, "minute").toDate();
        await addUserSecret(user?.id, `${otp}`, expirationDate);
      }

      // userSecret = await updateUserSecret(id, { secret, expiredAt: expiredAt ? new Date(expiredAt as string) : null });
      sendMail({
        to: email,
        subject: "Forgot password",
        text: "Forgot password OTP",
        html: forgotPasswordMail(`${otp}`),
      }).catch((error) => {
        return handleResponse({
          success: false,
          msg: "Email send failed.",
          status: 401,
        });
      });

      return handleResponse({
        success: true,
        msg: "OTP send to your email",
        data: { email: email },
        status: 200,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errorFields[err.path] = err.message;
          }
        });
        return handleResponse({ success: false, errors: errorFields });
      }
      return handleResponse({ success: false, errors: error });
    }
  }

  async verifyOTP(request: Request): Promise<ResponseFormat<{}>> {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      const validatedData = await fogotPasswordSchema.validate(formDataObject, {
        abortEarly: false,
      });
      const { email } = validatedData;
      const user = await getUserByEmail(email);
      if (!user) {
        return handleResponse({ success: false, msg: "User not found" });
      }
      const userSecret = await getUserSecretByUserId(user?.id);
      const otp = [
        formDataObject.code_1,
        formDataObject.code_2,
        formDataObject.code_3,
        formDataObject.code_4,
        formDataObject.code_5,
        formDataObject.code_6,
      ].join("");
      if (!userSecret) {
        return handleResponse({ success: false, msg: "User secret not found" });
      }
      const isOtpValid = userSecret.secret === otp;
      const isOtpExpired = dayjs().isAfter(userSecret.expiredAt);
      if (!isOtpValid) {
        return handleResponse({ success: false, msg: "Invalid OTP" });
      }

      if (isOtpExpired) {
        return handleResponse({ success: false, msg: "OTP has expired" });
      }

      // delete otp if done
      await deleteUserSecret(userSecret.id);

      return handleResponse({
        success: true,
        msg: "OTP verification successful",
        data: { email: email },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorFields: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errorFields[err.path] = err.message;
          }
        });
        return handleResponse({ success: false, errors: errorFields });
      }
      return handleResponse({ success: false, errors: error });
    }
  }
}

export const authenticationService = new AuthenticationService();

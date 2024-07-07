import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    emailExists(message?: string): this;
    roleExist(message?: string): this;
    roleNameExist(message?: string): this;
  }
}

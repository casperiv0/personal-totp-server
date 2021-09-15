import * as yup from "yup";

export const createAccountSchema = {
  secret: yup.string().required(),
};

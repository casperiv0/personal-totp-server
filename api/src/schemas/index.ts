import * as yup from "yup";

export const createAccountSchema = {
  secret: yup.string().required(),
  name: yup.string().required(),
};

export const authenticateSchema = {
  username: yup.string().required(),
  password: yup.string().required(),
};

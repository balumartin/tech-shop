import * as yup from "yup";

export const registerSchema = yup.object().shape({
  userName: yup.string().required("User name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[#?!@$%^&*-]/, "Password requires a symbol")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Must match "password" field value')
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

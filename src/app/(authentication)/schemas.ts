import * as Yup from "yup";

export const PasswordCheckSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("This field is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password must differ from old password",
    ),
  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

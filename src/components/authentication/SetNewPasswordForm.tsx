"use client";

import { useFormik } from "formik";
import { useFormState } from "react-dom";
import { ActionButton } from "../authentication";
import { setNewPassword } from "@/app/(authentication)/actions";
import { PasswordCheckSchema } from "@/app/(authentication)/schemas";
import FormikTextField from "./common/FormikTextField";

export default function SetNewPasswordForm() {
  const [errorMessage, dispatch] = useFormState(setNewPassword, undefined);
  let userEmail = "";
  let otpCode = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage.getItem("regEmail") ?? "";
    otpCode = localStorage.getItem("otpCode") ?? "";
  }

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      resetCode: otpCode,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: PasswordCheckSchema,
    onSubmit: () => console.log("Updating password"),
  });
  return (
    <form
      action={() => {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...rest } = formik.values;
        dispatch(rest);
      }}
      className="flex flex-col gap-8"
    >
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          New Password
        </label>
        <FormikTextField
          placeholder="New Password"
          name="newPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          Confirm Password
        </label>
        <FormikTextField
          placeholder="Confirm Password"
          name="confirmPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
      <ActionButton
        disabled={!formik.isValid || !formik.dirty}
        text="Save New Password"
      />
    </form>
  );
}

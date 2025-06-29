"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ActionButton } from "./common";
import FormikTextField from "./common/FormikTextField";
import { resetPassViaEmail } from "@/app/(authentication)/actions";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email field is required")
    .email("Enter a valid email"),
});

export default function ForgotPasswordForm() {
  const [errorMessage, dispatch] = useFormState(resetPassViaEmail, undefined);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Checking for email"),
  });

  return (
    <form
      action={() => {
        dispatch(formik.values);
        localStorage.setItem("regEmail", formik.values.email);
      }}
      className="flex flex-col gap-8"
    >
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          Email Address
        </label>
        <FormikTextField
          placeholder="Email Address"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <ActionButton
        disabled={!formik.isValid || !formik.dirty}
        text="Send email"
      />
    </form>
  );
}

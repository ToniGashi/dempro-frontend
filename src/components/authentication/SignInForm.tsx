"use client";

import { useActionState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { FormikCheckBox, ActionButton } from "./common";
import FormikTextField from "./common/FormikTextField";
import { authenticateCR } from "@/app/(authentication)/actions";
import { useRouter } from "next/navigation";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email field is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password field is required"),
});

export default function SignInForm() {
  const router = useRouter();

  // Adapter matches (prevError, formData) => newError
  const actionAdapter = async (
    prevError: string | void | undefined,
    formData: FormData
  ) => {
    try {
      console.log("SignInForm: Authenticating user...");
      await authenticateCR(formData);
      console.log("SignInForm: User authenticated successfully");
      router.push("/"); // client-side redirect on success
    } catch (error: any) {
      console.error("SignInForm error:", error);
      // return a string to set as errorMessage
      return error?.message ?? "An unexpected error occurred";
    }
  };

  // errorMessage will be the returned string from actionAdapter
  const [errorMessage] = useActionState(actionAdapter, undefined);

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema: ValidationSchema,
    onSubmit: () => {}, // we handle submission via the action prop
  });

  return (
    <form
      action={(formData) => actionAdapter(undefined, formData)}
      className="flex flex-col gap-8"
    >
      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          Email Address
        </label>
        <FormikTextField
          name="email"
          placeholder="Email Address"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>

      {/* Password + Remember Me / Forgot */}
      <div>
        <label htmlFor="password" className="mb-1 block text-lg font-medium">
          Password
        </label>
        <FormikTextField
          name="password"
          type="password"
          placeholder="Password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />

        <div className="flex items-center justify-between py-3">
          <FormikCheckBox
            name="rememberMe"
            label="Remember me"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rememberMe && !!formik.errors.rememberMe}
          />
          <Link
            href="/forgotten-password"
            className="text-xs text-primary-grey300 hover:opacity-80"
          >
            Forgot your password?
          </Link>
        </div>

        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>

      {/* Submit */}
      <ActionButton
        disabled={!formik.isValid || !formik.dirty}
        text="Sign In"
      />
    </form>
  );
}

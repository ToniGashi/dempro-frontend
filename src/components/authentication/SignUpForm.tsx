"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { FormikCheckBox, ActionButton } from "./common";
import { register } from "@/app/(authentication)/actions";
import FormikTextField from "./common/FormikTextField";

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("This field is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
  areConditionsAccepted: Yup.boolean().oneOf(
    [true],
    "This field must be checked"
  ),
});

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      areConditionsAccepted: false,
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Registering User"),
  });
  return (
    <form
      action={(formData) => {
        dispatch(formData);
        localStorage.setItem("regEmail", formik.values.email);
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex w-full justify-between gap-4">
        <div className="w-1/2">
          <label htmlFor="firstName" className="mb-1 block text-lg font-medium">
            First Name
          </label>
          <FormikTextField
            placeholder="First Name"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="lastName" className="mb-1 block text-lg font-medium">
            Last Name
          </label>
          <FormikTextField
            placeholder="Last Name"
            name="lastName"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          Email Address
        </label>
        <FormikTextField
          name="email"
          placeholder="Email Address"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-lg font-medium">
          Password
        </label>
        <FormikTextField
          placeholder="Password"
          name="password"
          type="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormikCheckBox
          error={
            formik.touched.areConditionsAccepted &&
            Boolean(formik.errors.areConditionsAccepted)
          }
          name="areConditionsAccepted"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          noreferrerLink
          checked={formik.values.areConditionsAccepted}
          label="I agree to the Terms & Privacy"
          helperText="You have to agree to the Terms & Privacy before continuing"
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
      <ActionButton
        disabled={!formik.isValid || !formik.dirty}
        text="Sign Up"
      />
    </form>
  );
}

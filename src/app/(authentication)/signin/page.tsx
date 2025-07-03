"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MicrosoftLoginButton from "@/components/microsoft-login-button";
import {
  AuthenticationIcon,
  TriangeErrorIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@/components/icons";
import { FormFieldInput } from "@/components/custom-form-fields";
import { Form } from "@/components/ui/form";
import {
  SignInUser,
  signInUserSchema,
  SignUpUser,
  signUpUserSchema,
} from "@/lib/schema";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = isSignUp ? signUpUserSchema : signInUserSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignUp ? { firstName: "", lastName: "" } : {}),
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(
          errorData.error || "Failed to authenticate, try another method"
        );
        return;
      }

      router.replace("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const onSubmit = useCallback(
    async (values: SignUpUser | SignInUser) => {
      setIsSubmitting(true);
      setError("");

      try {
        const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Authentication failed");
        }

        toast.success(
          isSignUp ? "Account created successfully!" : "Welcome back!"
        );
        form.reset();
        router.replace("/");
      } catch (error: any) {
        console.error("Error authenticating:", error);
        const errorMessage =
          error.message || "Failed to authenticate. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, isSignUp, router]
  );

  const handleMicrosoftAuthentication = async (accessToken: string) => {
    try {
      const endpoint = "/api/auth/azure";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Authentication failed");
      }
      router.replace("/");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate with server");
      console.error("Authentication error:", err);
    }
  };

  const resetForm = (isSignUpMode: boolean) => {
    form.reset(
      isSignUpMode
        ? //@ts-expect-error we know this is available only when isSignUp is true
          { email: "", password: "", firstName: "", lastName: "" }
        : { email: "", password: "" }
    );
    setError("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dpro-accent px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-dpro-secondary">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-dpro-primary rounded-full shadow-lg">
            <AuthenticationIcon />
          </div>
          <h1 className="text-3xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isSignUp
              ? "Join our platform to get started"
              : "Sign in to your account to continue"}
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              resetForm(false);
            }}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
              !isSignUp
                ? "bg-white text-dpro-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              resetForm(true);
            }}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
              isSignUp
                ? "bg-white text-dpro-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <FormFieldInput
                    //@ts-expect-error we know this is available only when isSignUp is true
                    name="firstName"
                    placeholder="First Name"
                    form={form}
                  />
                </div>

                <div>
                  <FormFieldInput
                    //@ts-expect-error we know this is available only when isSignUp is true
                    name="lastName"
                    placeholder="Last Name"
                    form={form}
                  />
                </div>
              </>
            )}

            <div>
              <FormFieldInput name="email" placeholder="Email" form={form} />
            </div>

            <div className="relative">
              <FormFieldInput
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                form={form}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg hover:from-teal-700 hover:to-teal-800 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>
        </Form>

        {/* OAuth Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="mx-4 text-sm text-gray-500">or continue with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <GoogleLogin
                width={320}
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Sign-In failed")}
                text={isSignUp ? "signup_with" : "signin_with"}
              />
            </div>

            <div className="flex justify-center">
              <MicrosoftLoginButton
                handleAuthentication={handleMicrosoftAuthentication}
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <p className="flex items-center text-sm text-red-700">
              <TriangeErrorIcon />
              {error}
            </p>
          </div>
        )}

        {/* Footer Links */}
        <div className="text-center space-y-2">
          {!isSignUp && (
            <Link
              href="/forgot-password"
              className="block text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              Forgot your password?
            </Link>
          )}

          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              href="/support"
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DemPro. All rights reserved.
      </p>
    </div>
  );
}

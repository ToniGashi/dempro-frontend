import Link from "next/link";
import { type Metadata } from "next";
import SignInForm from "@/components/authentication/SignInForm";
import OAuthProviders from "@/components/authentication/OAuthProviders";
import { Logo } from "@/components/authentication/common/Logo";

export const metadata: Metadata = {
  title: `Sign Up`,
  description: "Booking Platform Authentication Sign Up Page",
};

export default function SignIn() {
  return (
    <div className="flex w-full flex-col gap-4 sm:gap-20">
      <div className="w-full">
        <Logo />
      </div>
      <div className="flex flex-col gap-4 sm:gap-8">
        <div>
          <h1 className="mb-4 text-[28px] sm:text-3xl">Sign in</h1>
          <p className="text-[#9FA4AA]">
            Be ready to unlock exclusive features only with CoolVacay
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8">
          <SignInForm />
          <OAuthProviders page="signin" />
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Don’t have an account?
          <Link className="ml-2 text-primary-primary600" href="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { type Metadata } from "next";
import SignUpForm from "@/components/authentication/SignUpForm";
import OAuthProviders from "@/components/authentication/OAuthProviders";
import { Logo } from "@/components/authentication/common/Logo";

export const metadata: Metadata = {
  title: `Sign Up`,
  description: "Booking Platform Authentication Sign Up Page",
};

export default function SignUp() {
  return (
    <div className="flex w-full flex-col gap-4 sm:gap-12">
      <div className="w-full">
        <Logo />
      </div>
      <div className="flex flex-col  gap-4 sm:gap-6">
        <div>
          <h1 className="mb-4 text-[28px] sm:text-3xl">Create an account</h1>
          <p className="text-[#9FA4AA]">
            Don&apos;t miss out on the benefits, sign up now!
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:gap-7">
          <SignUpForm />
          <OAuthProviders />
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Already have an account?
          <Link className="ml-2 text-primary" href="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

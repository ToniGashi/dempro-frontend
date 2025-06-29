import { ForgotPasswordForm } from "@/components/authentication";
import { Logo } from "@/components/authentication/common/Logo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Forgotten Password`,
  description: "Booking Platform Authentication Forgotten Password Page",
};

function ForgottenPassword() {
  return (
    <div className="flex flex-col gap-20">
      <Logo />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Forgot password?</h1>
          <p className="text-[#9FA4AA]">
            {
              "Enter your email address and we'll send you a code to set your password."
            }
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgottenPassword;

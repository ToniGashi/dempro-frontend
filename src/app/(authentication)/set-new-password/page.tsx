import { type Metadata } from "next";
import { Logo } from "@/components/authentication/common/Logo";
import SetNewPasswordForm from "@/components/authentication/SetNewPasswordForm";

export const metadata: Metadata = {
  title: `Set New Password`,
  description: "Booking Platform Authentication Set New Password Page",
};

export default function SetNewPassword() {
  return (
    <div className="flex flex-col gap-20">
      <Logo />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Set a new password</h1>
          <p className="text-[#9FA4AA]">
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <SetNewPasswordForm />
      </div>
    </div>
  );
}

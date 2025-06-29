import OTPForm from "@/components/authentication/OTPForm";
import { Logo } from "@/components/authentication/common/Logo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Code Verification`,
  description: "Booking Platform Authentication Code Verification Page",
};

export default function AccountCreationCode() {
  return (
    <div className="flex w-full flex-col gap-[170px]">
      <div className="w-full">
        <Logo />
      </div>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="mb-3 text-3xl">Enter the code</h1>
          <p className="text-[#9FA4AA]">
            To finish creating your account, enter the verification code.
          </p>
        </div>
        <div className="flex flex-col">
          <OTPForm type="verify" />
        </div>
      </div>
    </div>
  );
}

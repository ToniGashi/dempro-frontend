"use client";

import { useRouter } from "next/navigation";

import { CheckCircle, HomeIcon } from "lucide-react";

export default function AwaitingConfirmationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dpro-accent px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-dpro-secondary">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>

          <div className="space-y-3 text-gray-600">
            <p>{`We've sent an activation link to your email address.`}</p>
            <p>
              Please click the link in your email to verify your account and
              complete the registration process.
            </p>
            <p className="text-sm text-gray-500">
              You can safely close this window after clicking the verification
              link.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-dpro-primary text-white font-medium rounded-lg hover:bg-dpro-primary/90 focus:ring-2 focus:ring-dpro-primary focus:ring-offset-2 transition-all duration-200"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DemPro. All rights reserved.
      </p>
    </div>
  );
}

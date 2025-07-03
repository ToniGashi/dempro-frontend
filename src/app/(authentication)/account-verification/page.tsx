"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from "lucide-react";

function VerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activationCode = searchParams.get("code");

    if (!activationCode) {
      setStatus("error");
      setMessage("Invalid activation link. No verification code found.");
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await fetch("/api/auth/activate", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activationCode }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage(
            data.message || "Your account has been successfully activated!"
          );
          toast.success("Account activated successfully!");
        } else {
          setStatus("error");
          setMessage(
            data.error || "Account activation failed. Please try again."
          );
          toast.error(data.error || "Account activation failed");
        }
      } catch (error) {
        console.error("Activation error:", error);
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
        toast.error("Something went wrong during activation");
      }
    };

    activateAccount();
  }, [searchParams]);

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <LoaderIcon className="w-8 h-8 text-white animate-spin" />;
      case "success":
        return <CheckCircleIcon className="w-8 h-8 text-green-600" />;
      case "error":
        return <XCircleIcon className="w-8 h-8 text-red-600" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Activating Your Account...";
      case "success":
        return "Account Activated!";
      case "error":
        return "Activation Failed";
    }
  };

  const getBgColor = () => {
    switch (status) {
      case "loading":
        return "bg-dpro-primary";
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dpro-accent px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-dpro-secondary">
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 mb-4 ${getBgColor()} rounded-full`}
          >
            {getIcon()}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {getTitle()}
          </h1>

          <p className="text-gray-600 mb-6">{message}</p>
        </div>

        {status !== "loading" && (
          <div className="space-y-3">
            {status === "success" && (
              <button
                onClick={() => router.push("/signin")}
                className="w-full py-3 px-4 bg-dpro-primary text-white font-medium rounded-lg hover:bg-dpro-primary/90 focus:ring-2 focus:ring-dpro-primary focus:ring-offset-2 transition-all duration-200"
              >
                Sign In to Your Account
              </button>
            )}

            <button
              onClick={() => router.push("/")}
              className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-200 ${
                status === "success"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-dpro-primary text-white hover:bg-dpro-primary/90 focus:ring-2 focus:ring-dpro-primary focus:ring-offset-2"
              }`}
            >
              Go to Homepage
            </button>

            {status === "error" && (
              <button
                onClick={() => router.push("/signin")}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Try Signing Up Again
              </button>
            )}
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DemPro. All rights reserved.
      </p>
    </div>
  );
}

export default function AccountVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoaderIcon className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}

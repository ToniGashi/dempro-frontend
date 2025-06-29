"use client";

import { useRouter } from "next/navigation";

const AccessDenied = () => {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center">
      <p className="text-center text-5xl font-bold text-primary">
        403 - Access Denied
      </p>
      <div className="my-10 text-center text-xl font-medium">
        Your account has been deactivated, please contact customer support at
        this number to reactivate it:{" "}
        <span className="underline">
          <a href="tel:302-581-9342">(302) 581-9342</a>
        </span>
      </div>
      <p className="py-3 text-center text-xl font-medium">
        Try to sign in with a different account.
      </p>
      <button
        onClick={() => router.push("/signin")}
        className="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors"
      >
        Back to sign In
      </button>
    </main>
  );
};

export default AccessDenied;

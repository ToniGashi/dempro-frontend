"use client";

import { redirect } from "next/navigation";

export default function Page() {
  let userEmail = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage?.getItem("regEmail") ?? "";
  }
  if (userEmail === "") {
    redirect("/forgotten-password");
  }
  return (
    <div className="flex w-full flex-col gap-[170px]">
      <div className="w-full">{/* <Logo /> */}</div>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="mb-3 text-3xl">Password reset</h1>
          <p className="text-[#9FA4AA]">We sent a code to {userEmail}</p>
        </div>
        <div className="flex flex-col">{/* <OTPForm type="reset" /> */}</div>
      </div>
    </div>
  );
}

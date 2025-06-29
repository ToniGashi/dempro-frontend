"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { ActionButton } from "./common";
import {
  resendOtp,
  resetPassOTP,
  verifyAccount,
} from "@/app/(authentication)/actions";

function OTP({
  length,
  value,
  onChange,
}: {
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length }, () => null)
  );

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) focusInput(currentIndex - 1);
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) focusInput(currentIndex + 1);
        break;
      case "Delete":
        event.preventDefault();
        onChange(
          (prev) => prev.slice(0, currentIndex) + prev.slice(currentIndex + 1)
        );
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) focusInput(currentIndex - 1);
        onChange(
          (prev) => prev.slice(0, currentIndex) + prev.slice(currentIndex + 1)
        );
        break;
      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const inputVal = event.target.value;
    let i = 0;
    while (i <= currentIndex && inputRefs.current[i]?.value && i < currentIndex)
      i++;

    onChange((prev) => {
      const arr = prev.split("");
      const lastChar = inputVal[inputVal.length - 1];
      arr[i] = lastChar ?? "";
      return arr.join("");
    });

    if (inputVal && currentIndex < length - 1) focusInput(currentIndex + 1);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) =>
    selectInput(idx);

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").trim().slice(0, length);
    let start = 0;
    while (
      start <= currentIndex &&
      inputRefs.current[start]?.value &&
      start < currentIndex
    )
      start++;

    const arr = value.split("");
    for (let j = start; j < length; j++) {
      arr[j] = text[j - start] ?? "";
    }
    onChange(arr.join(""));
  };

  return (
    <div className="flex w-full justify-between">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="\\d*"
          placeholder="-"
          aria-label={`Digit ${idx + 1} of OTP`}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          value={value[idx] ?? ""}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onChange={(e) => handleChange(e, idx)}
          onClick={(e) => handleClick(e, idx)}
          onPaste={(e) => handlePaste(e, idx)}
          className={`w-[60px] h-[60px] text-[32px] font-medium leading-[38px] py-2 px-0 rounded-[12px] text-center text-[#1C2025] bg-white border border-[#DAE2ED] shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:border-[#29ABE2] focus:border-[#29ABE2] focus:shadow-[0_0_0_3px_#80BFFF] placeholder:text-[#212529] placeholder:opacity-80 outline-none focus-visible:outline-none`}
        />
      ))}
    </div>
  );
}

export default function OTPForm({ type }: { type: "verify" | "reset" }) {
  const [otp, setOtp] = useState("");
  const verifyAction = type === "verify" ? verifyAccount : resetPassOTP;
  const [errorOtp, dispatchOTP] = useFormState(verifyAction, undefined);
  const [resendError, dispatchResendOTP] = useFormState(resendOtp, undefined);
  const [canResend, setCanResend] = useState(true);

  const resetTimer = () => {
    setCanResend(false);
    setTimeout(() => setCanResend(true), 30000);
  };

  let userEmail = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage.getItem("regEmail") ?? "";
  }

  return (
    <form
      action={() => {
        dispatchOTP({ code: otp, email: userEmail });
        localStorage.setItem("otpCode", otp);
      }}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-6">
        <OTP length={6} value={otp} onChange={setOtp} />
        {errorOtp && <p className="text-sm text-red-500">{errorOtp}</p>}
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Didn&apos;t receive code?
          <button
            disabled={!canResend}
            onClick={async (e) => {
              e.preventDefault();
              resetTimer();
              dispatchResendOTP(userEmail);
            }}
            className="ml-2 text-[#212529] disabled:text-[#9FA4AA]"
          >
            Send Again
          </button>
        </div>
        {resendError && <p className="text-sm text-red-500">{resendError}</p>}
      </div>
      <ActionButton disabled={otp.length < 6} text="Verify Email" />
    </form>
  );
}

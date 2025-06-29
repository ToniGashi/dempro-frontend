"use client";

import { useFormStatus } from "react-dom";

export default function ActionButton({
  disabled,
  text,
  type,
  borderRadius = "rounded",
  className,
}: {
  disabled?: boolean;
  text: string;
  type?: "small" | "big";
  borderRadius?: "rectangle" | "rounded";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={
        className ??
        `h-${type === "small" ? "12" : "15"} ${borderRadius === "rounded" ? "rounded-[100px]" : "rounded-[8px]"} flex w-full items-center justify-center bg-primary p-4 text-white disabled:opacity-50`
      }
      //eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      aria-disabled={disabled || pending}
      //eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={disabled || pending}
    >
      {text}
    </button>
  );
}

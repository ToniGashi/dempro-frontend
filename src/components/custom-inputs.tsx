"use client";

import { cn } from "@/lib/utils";

export function RoundedPrimaryInput({
  name,
  placeholder,
  disabled,
  value,
  onChange,
  onFocus,
  className,
}: {
  name?: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  className?: string;
}) {
  return (
    <input
      id={name}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={cn(
        "w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1",
        className
      )}
    />
  );
}

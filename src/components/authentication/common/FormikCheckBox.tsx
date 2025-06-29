"use client";

import React, { type FocusEvent } from "react";
import Link from "next/link";

interface FormikCheckBoxProps {
  name: string;
  label: string;
  checked: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText?: string;
  noreferrerLink?: boolean;
}

export default function FormikCheckBox({
  error,
  name,
  onChange,
  onBlur,
  label,
  helperText,
  checked,
  noreferrerLink,
}: FormikCheckBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary border-gray-300 rounded"
        />

        {noreferrerLink ? (
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline"
          >
            {label}
          </Link>
        ) : (
          <label htmlFor={name} className="text-sm font-medium">
            {label}
          </label>
        )}
      </div>

      {error && helperText && (
        <p className="text-sm text-red-600">{helperText}</p>
      )}
    </div>
  );
}

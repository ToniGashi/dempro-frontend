"use client";

import { useState, type FocusEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormikTextFieldProps {
  name: string;
  placeholder: string;
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: React.ReactNode;
  type?: string;
}

export default function FormikTextField({
  name,
  placeholder,
  onBlur,
  onChange,
  error,
  helperText,
  type = "text",
}: FormikTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={inputType}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-2 pr-10 rounded-full border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && helperText && (
        <p className="mt-1 text-sm text-red-600">{helperText}</p>
      )}
    </div>
  );
}

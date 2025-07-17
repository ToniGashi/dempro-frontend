"use client";

import { LicenseType } from "@/lib/types";
import React from "react";

interface LicenseChipProps {
  /** A single Creative Commons license code */
  license?: LicenseType;
}

// Map each license to a distinct Tailwind color schema
const licenseColorMap: Record<LicenseType, { bg: string; text: string }> = {
  "CC BY": { bg: "bg-green-100", text: "text-green-800" },
  "CC BY-SA": { bg: "bg-blue-100", text: "text-blue-800" },
  "CC BY-ND": { bg: "bg-purple-100", text: "text-purple-800" },
  "CC BY-NC": { bg: "bg-yellow-100", text: "text-yellow-800" },
  "CC BY-NC-SA": { bg: "bg-orange-100", text: "text-orange-800" },
  "CC BY-NC-ND": { bg: "bg-red-100", text: "text-red-800" },
};

export default function LicenseChip({ license }: LicenseChipProps) {
  if (!license) return "no license";
  const colors = licenseColorMap[license] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };
  return (
    <span
      className={`inline-flex items-center ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-medium`}
    >
      {license}
    </span>
  );
}

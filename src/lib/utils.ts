import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DemProAPIResponse } from "./api-helpers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ApplicationError extends Error {
  info: string;
  status: number;
}

export async function swrFetcher<T extends DemProAPIResponse>(url: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url}`
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as ApplicationError;

    error.info = await response.json();
    error.status = response.status;

    throw error;
  }
  const result = (await response.json()) as T;

  return result.result ?? result;
}

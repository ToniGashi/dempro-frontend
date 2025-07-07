"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSuccessfulAuth = () => {
    const returnUrlFromQuery = searchParams.get("returnUrl");

    const returnUrl = returnUrlFromQuery || "/";

    router.push(returnUrl);
  };

  return { handleSuccessfulAuth };
}

import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { UserProfile } from "./types";

export interface DemProAPIResponse {
  page?: number;
  pageSize?: number;
  totalCount?: number;
  success?: boolean;
  message?: string;
  error?: string | null;
  result: any;
}

export async function enhancedFetcher<T extends DemProAPIResponse>(
  url: string,
  options: RequestInit & {
    cache?: RequestCache;
    expectHtml?: boolean;
  } = {}
) {
  const { cache = "force-cache", expectHtml = false, ...restOptions } = options;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const requestHeaders = {
    ...(restOptions.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url}`,
      {
        cache,
        ...restOptions,
        headers: requestHeaders,
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        await clearAuthCookies();

        const headersList = await headers();
        const currentUrl = headersList.get("x-current-path") || "/";
        redirect(
          `/signin?returnUrl=${encodeURIComponent(currentUrl)}&expired=true`
        );
      }

      let errorMessage = `API error: ${res.status} ${res.statusText}`;
      try {
        const text = await res.text();
        if (text) {
          try {
            const errorData = JSON.parse(text);
            errorMessage =
              process.env.NODE_ENV === "development"
                ? errorData.error || errorMessage
                : "An error occurred";
          } catch {
            errorMessage =
              process.env.NODE_ENV === "development"
                ? text.slice(0, 200) + "..."
                : "An error occurred";
          }
        }
      } catch (parseError) {
        if (process.env.NODE_ENV === "development") {
          console.error("Unable to parse error response:", parseError);
        }
      }
      throw new Error(errorMessage, { cause: res.status });
    }

    // Handle HTML responses
    if (expectHtml) {
      const htmlContent = await res.text();
      return { result: htmlContent as T["result"], success: true };
    }

    // Default JSON handling
    const data = (await res.json()) as T;
    if (!data.success) {
      throw new Error(data.error || "Unknown API error");
    }

    return { result: data.result as T["result"], success: true };
  } catch (error: any) {
    // Check if this is a Next.js redirect error and re-throw it
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error;
    }
    if (error.cause === 502) {
      throw new Error(error.message || "Unknown API error");
    }
    console.error(`API error:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export function createApiOperation<TInput, TOutput>({
  url,
  method,
  tags = [],
  transform,
  cache = "force-cache",
  sendRawContent = false,
}: {
  url: string | ((input: TInput) => string);
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  tags?: string[];
  transform?: (input: TInput) => any;
  cache?: RequestCache;
  sendRawContent?: boolean;
}) {
  return async (input: TInput) => {
    const resolvedUrl = typeof url === "function" ? url(input) : url;

    let body: string | FormData | undefined;
    let headers: Record<string, string> = {};

    if (input instanceof FormData) {
      body = input;
    } else if (input && method !== "GET" && method !== "DELETE") {
      const transformedInput = transform ? transform(input) : input;

      if (sendRawContent) {
        body =
          typeof transformedInput === "string"
            ? transformedInput
            : String(transformedInput);
        headers["Content-Type"] = "text/plain";
      } else {
        body = JSON.stringify(transformedInput);
        headers["Content-Type"] = "application/json";
      }
    }

    const options: RequestInit = {
      method,
      cache,
      headers,
      ...(body ? { body } : {}),
    };
    const result = await enhancedFetcher<{ result: TOutput }>(
      resolvedUrl,
      options
    );

    if (result.success && method !== "GET" && tags.length > 0) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }
    return result;
  };
}

export function createReadOperation<TInput = void, TOutput = any>({
  url,
  tags = [],
  cache = "force-cache",
  expectHtml = false,
}: {
  url: string | ((first: TInput, ...rest: any[]) => string);
  tags?: string[];
  cache?: RequestCache;
  expectHtml?: boolean;
}) {
  return async (first?: TInput, ...rest: any[]) => {
    let resolvedUrl: string;

    if (typeof url === "string") {
      resolvedUrl = url;
    } else if (rest.length === 0 && first === undefined) {
      // No arguments case (void)
      resolvedUrl = (url as Function)();
    } else if (rest.length === 0) {
      // Single argument case
      resolvedUrl = url(first as TInput);
    } else {
      // Multiple arguments case
      resolvedUrl = (url as Function)(first, ...rest);
    }

    const options: RequestInit & { expectHtml?: boolean } = {
      method: "GET",
      cache,
      expectHtml,
      next: { tags },
    };

    return enhancedFetcher<{ result: TOutput }>(resolvedUrl, options);
  };
}

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie) as UserProfile;
  } catch {
    return null;
  }
}

export async function getServerUser() {
  const user = await getUserFromCookie();
  return { user };
}

async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  cookieStore.set("user", "", {
    maxAge: 0,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

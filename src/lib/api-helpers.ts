import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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
  options: RequestInit & { cache?: RequestCache } = {}
) {
  const { cache = "force-cache", ...restOptions } = options;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const headers = {
    ...(restOptions.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url}`,
      {
        cache,
        ...restOptions,
        headers,
      }
    );

    if (!res.ok) {
      let errorMessage = `API error: ${res.status} ${res.statusText}`;
      try {
        const text = await res.text();
        if (text) {
          const errorData = JSON.parse(text);
          errorMessage =
            process.env.NODE_ENV === "development"
              ? errorData.error || errorMessage
              : "An error occurred";
        }
      } catch (parseError) {
        if (process.env.NODE_ENV === "development") {
          console.error("Unable to parse error response:", parseError);
        }
      }
      throw new Error(errorMessage, { cause: res.status });
    }

    const data = (await res.json()) as T;
    if (!data.success) {
      throw new Error(data.error || "Unknown API error");
    }

    return { result: data.result as T["result"], success: true };
  } catch (error: any) {
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
}: {
  url: string | ((input: TInput) => string);
  method: "GET" | "POST" | "PUT" | "DELETE";
  tags?: string[];
  transform?: (input: TInput) => any;
  cache?: RequestCache;
}) {
  // We return a Server Action
  return async (input: TInput) => {
    const resolvedUrl = typeof url === "function" ? url(input) : url;

    let body: string | FormData | undefined;
    if (input instanceof FormData) {
      body = input;
    } else if (input && method !== "GET" && method !== "DELETE") {
      body = JSON.stringify(transform ? transform(input) : input);
    }

    const options: RequestInit = {
      method,
      cache,
      ...(body && !(body instanceof FormData)
        ? {
            headers: { "Content-Type": "application/json" },
          }
        : {}),
      ...(body ? { body } : {}),
    };

    const result = await enhancedFetcher<{ result: TOutput }>(
      resolvedUrl,
      options
    );

    // we revalidate only for mutations (POST, PUT, DELETE) and only after successful operations
    if (result.success && method !== "GET" && tags.length > 0) {
      // This must only run after mutations, not during initial render
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    return result;
  };
}

// For read-only operations that should include tags but not revalidate
export function createReadOperation<TInput = void, TOutput = any>({
  url,
  tags = [],
  cache = "force-cache",
}: {
  url: string | ((first: TInput, ...rest: any[]) => string);
  tags?: string[];
  cache?: RequestCache;
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

    const options: RequestInit = {
      method: "GET",
      cache,
      next: { tags },
    };

    return enhancedFetcher<{ result: TOutput }>(resolvedUrl, options);
  };
}

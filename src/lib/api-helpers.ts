import { auth } from "@/auth";
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
const API_BASE_URL = process.env.API_URL;

export async function enhancedFetcher<T extends DemProAPIResponse>(
  url: string,
  options: RequestInit & {
    cache?: RequestCache;
    expectHtml?: boolean;
  } = {}
) {
  const { cache = "force-cache", expectHtml = false, ...restOptions } = options;
  const headers = {
    ...(restOptions.headers || {}),
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRvbmlnYXNoaTk5OUBnbWFpbC5jb20iLCJuYmYiOjE3NTE0MDg5NjAsImV4cCI6MTc1MTQ5NTM2MCwiaWF0IjoxNzUxNDA4OTYwLCJpc3MiOiJEZW1Qcm8ifQ.qLGFdTMTOVpPFiXYdPEf-cLgy6q-pOQJ2a3Me9OyrJo",
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
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value || "";
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
        headers[
          "Authorization"
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRvbmlnYXNoaTk5OUBnbWFpbC5jb20iLCJuYmYiOjE3NTE0MDg5NjAsImV4cCI6MTc1MTQ5NTM2MCwiaWF0IjoxNzUxNDA4OTYwLCJpc3MiOiJEZW1Qcm8ifQ.qLGFdTMTOVpPFiXYdPEf-cLgy6q-pOQJ2a3Me9OyrJo`;
      } else {
        body = JSON.stringify(transformedInput);
        headers["Content-Type"] = "application/json";
        headers[
          "Authorization"
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRvbmlnYXNoaTk5OUBnbWFpbC5jb20iLCJuYmYiOjE3NTE0MDg5NjAsImV4cCI6MTc1MTQ5NTM2MCwiaWF0IjoxNzUxNDA4OTYwLCJpc3MiOiJEZW1Qcm8ifQ.qLGFdTMTOVpPFiXYdPEf-cLgy6q-pOQJ2a3Me9OyrJo`;
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

// For read-only operations that should include tags but not revalidate
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
export class FetchError extends Error {
  constructor(public error?: string, public status?: number) {
    super(error);
    this.status = status;
    this.name = "FetchError";
  }
}
export async function postFetch<R, B = Record<string, any>>(
  url: string,
  body: B | FormData,
  method?: string
): Promise<R | FetchError | null> {
  const headers = new Headers({
    Authorization: `…`,
  });
  if (!(body instanceof FormData)) {
    headers.append("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE_URL}/api${url}`, {
    method: method ?? "POST",
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    const errJson = JSON.parse(errText);
    throw new FetchError(errJson.error ?? errJson.message);
  }
  const text = await res.text();
  return text ? (JSON.parse(text) as R) : null;
}

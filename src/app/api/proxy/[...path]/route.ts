import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams.path, "GET");
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams.path, "POST");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams.path, "PUT");
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams.path, "DELETE");
}

async function handleRequest(
  req: NextRequest,
  pathSegments: string[],
  method: string
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    const response = NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
    response.cookies.set("user", "", { maxAge: 0, path: "/" });
    return response;
  }

  const path = pathSegments.join("/");
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${path}${
    searchParams ? `?${searchParams}` : ""
  }`;

  const headers: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
  };

  let body: string | undefined;
  if (method !== "GET" && method !== "DELETE") {
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(await req.json());
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

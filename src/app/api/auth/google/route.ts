import { NextRequest, NextResponse } from "next/server";
import { AuthResponse, LimitedUserProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    }
  );

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: backendRes.statusText },
      { status: backendRes.status }
    );
  }

  const data = (await backendRes.json()) as AuthResponse;

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const limitedProfileData: LimitedUserProfile = {
    fullName: data.profile.fullName,
    email: data.profile.email,
    firstName: data.profile.firstName,
    lastName: data.profile.lastName,
    isActivated: data.profile.isActivated,
  };

  response.cookies.set("user", JSON.stringify(limitedProfileData), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

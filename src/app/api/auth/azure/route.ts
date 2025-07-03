import { AuthResponse, LimitedUserProfile } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/azure`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }),
      }
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendResponse.statusText },
        { status: backendResponse.status }
      );
    }

    const data = (await backendResponse.json()) as AuthResponse;

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
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

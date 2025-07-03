import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { activationCode } = await req.json();

    if (!activationCode) {
      return NextResponse.json(
        { error: "Activation code is required" },
        { status: 400 }
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/User/activate`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activationCode }),
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          error: data.error || "Account activation failed",
          success: false,
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.message || "Account activated successfully!",
    });
  } catch (error) {
    console.error("Account activation error:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

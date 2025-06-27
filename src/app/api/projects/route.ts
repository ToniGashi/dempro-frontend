import { NextResponse } from "next/server";
import { createProjectContainer } from "@/lib/blob-service-client";

export async function POST(req: Request) {
  const { projectId } = await req.json();
  try {
    await createProjectContainer(projectId);
  } catch (err: any) {
    console.error("Failed to create blob container:", err);
    return NextResponse.json(
      { error: "Could not initialize storage for project" },
      { status: 500 }
    );
  }

  // 3) Return success
  return NextResponse.json({ success: true });
}

// app/api/media/upload/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const containerName = url.searchParams.get("id");
  const folderName = url.searchParams.get("folder");

  if (!containerName) {
    return NextResponse.json(
      { error: "Missing `id` parameter" },
      { status: 400 }
    );
  }
  if (!folderName) {
    return NextResponse.json(
      { error: "Missing `folder` parameter" },
      { status: 400 }
    );
  }

  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
  if (!conn) {
    return NextResponse.json(
      { error: "Storage connection not configured" },
      { status: 500 }
    );
  }

  // Connect to the right container
  const blobService = BlobServiceClient.fromConnectionString(conn);
  const container = blobService.getContainerClient(
    `${containerName}-projectid`
  );

  // Parse form-data
  const form = await req.formData();
  const entries = form.getAll("files") as FormDataEntryValue[];
  if (!entries.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploaded: { name: string; url: string }[] = [];

  for (const entry of entries) {
    if (!(entry instanceof Blob)) continue;
    const file = entry as File;
    const filename = file.name;
    const blobPath = `${folderName}/${filename}`;
    const blockBlobClient = container.getBlockBlobClient(blobPath);

    // Read file into a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload and set proper MIME type
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    uploaded.push({
      name: filename,
      url: `${container.url}/${blobPath}`,
    });
  }

  return NextResponse.json(uploaded);
}

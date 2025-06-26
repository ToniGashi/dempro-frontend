// app/api/media/upload/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const folder = url.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "Missing folder" }, { status: 400 });
  }

  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
  const containerName = process.env.AZURE_STORAGE_CONTAINER!;
  const blobService = BlobServiceClient.fromConnectionString(conn);
  const container = blobService.getContainerClient(containerName);

  const form = await req.formData();
  const entries = form.getAll("files"); // FormDataEntryValue[]
  if (!entries.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploaded: { name: string; url: string }[] = [];

  for (const entry of entries) {
    // entry should be a Blob/File
    if (!(entry instanceof Blob)) continue;

    // pull filename from the File metadata if available:
    const filename = (entry as File).name || `upload-${Date.now()}`;
    const blobPath = `${folder}/${filename}`;
    const block = container.getBlockBlobClient(blobPath);

    // read into an ArrayBuffer, then into a Node Buffer
    const arrayBuffer = await entry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await block.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: entry.type },
    });

    uploaded.push({
      name: filename,
      url: `${container.url}/${blobPath}`,
    });
  }

  return NextResponse.json(uploaded);
}

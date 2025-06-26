// app/api/media/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getContainerClient } from "@/lib/blob-service-client";
import { FolderType } from "@/lib/types";
import { BlobServiceClient } from "@azure/storage-blob";

export async function GET() {
  const folderMap: Record<string, FolderType> = {};

  // use your secret var, not NEXT_PUBLIC_…
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    return NextResponse.json(
      { error: "AZURE_STORAGE_CONNECTION_STRING not set" },
      { status: 500 }
    );
  }

  const containerClient = getContainerClient(connectionString);

  for await (const blob of containerClient.listBlobsFlat()) {
    const [folderName, ...rest] = blob.name.split("/");
    if (!folderMap[folderName]) {
      folderMap[folderName] = {
        id: folderName,
        name: folderName,
        folder: true,
        children: [],
      };
    }
    if (rest.length) {
      folderMap[folderName].children.push({
        id: blob.name,
        name: rest.join("/"),
        url: `${containerClient.url}/${blob.name}`,
        folder: false,
      });
    }
  }

  return NextResponse.json({ folders: Object.values(folderMap) });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file) {
    return NextResponse.json({ error: "Missing file param" }, { status: 400 });
  }

  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!conn) {
    return NextResponse.json(
      { error: "Storage connection not configured" },
      { status: 500 }
    );
  }

  const blobService = BlobServiceClient.fromConnectionString(conn);
  const container = blobService.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER!
  );
  const client = container.getBlobClient(file);

  await client.deleteIfExists();
  return NextResponse.json({ success: true });
}

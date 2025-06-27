// app/api/media/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getContainerClient } from "@/lib/blob-service-client";
import { BlobServiceClient } from "@azure/storage-blob";

const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawId = searchParams.get("id");
  if (!rawId) {
    return NextResponse.json({ error: "Missing `id` param" }, { status: 400 });
  }

  // ensure valid length ≥ 3:
  const containerName = `${rawId}-projectId`.toLowerCase();

  // this now returns a ContainerClient for your named container
  const containerClient = getContainerClient(conn, containerName);

  const folderMap: Record<string, any> = {};
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

  const containerName = searchParams.get("id");
  if (!containerName) {
    return NextResponse.json(
      { error: "Missing `id` query parameter" },
      { status: 400 }
    );
  }

  const filePath = searchParams.get("file");
  if (!filePath) {
    return NextResponse.json(
      { error: "Missing `file` query parameter" },
      { status: 400 }
    );
  }

  // only allow deleting real files (must include a folder prefix)
  const [folderPrefix, ...rest] = filePath.split("/");
  if (!rest.length || rest.join("") === "") {
    return NextResponse.json(
      { error: "Cannot delete a folder placeholder" },
      { status: 400 }
    );
  }

  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
  const blobService = BlobServiceClient.fromConnectionString(conn);
  const container = blobService.getContainerClient(
    `${containerName}-projectid`
  );

  // 1) Delete the requested blob
  const blobClient = container.getBlobClient(filePath);
  const result = await blobClient.deleteIfExists();
  if (!result.succeeded) {
    return NextResponse.json(
      { error: `Failed to delete file: ${filePath}` },
      { status: 500 }
    );
  }

  // 2) Check whether the folder is now empty
  let anyLeft = false;
  for await (const blob of container.listBlobsFlat({
    prefix: `${folderPrefix}/`,
  })) {
    // skip the “directory marker” itself
    if (blob.name !== `${folderPrefix}/`) {
      anyLeft = true;
      break;
    }
  }

  // 3) If empty, re-create the folder marker
  if (!anyLeft) {
    const marker = container.getBlockBlobClient(`${folderPrefix}`);
    await marker.uploadData(Buffer.alloc(0));
  }

  return NextResponse.json({ success: true });
}

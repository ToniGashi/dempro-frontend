// lib/blob-service-client.ts
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export function getContainerClient(
  connectionString: string,
  containerName: string
): ContainerClient {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  return blobServiceClient.getContainerClient(containerName);
}

export async function createProjectContainer(
  projectId: number
): Promise<ContainerClient> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
  }

  // container names must be lower-case and alphanumeric with hyphens
  const containerName = `${projectId}-projectid`;
  const blobService = BlobServiceClient.fromConnectionString(connectionString);

  // createContainer throws if it already exists; you can catch & ignore that if you prefer idempotency
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.create();

  // seed “folders” by uploading a zero-byte blob in each prefix
  const folders = ["photos", "videos", "files", "audios"];
  await Promise.all(
    folders.map(async (folder) => {
      const placeholder = containerClient.getBlockBlobClient(`${folder}`);
      await placeholder.upload("", 0);
    })
  );

  return containerClient;
}

// lib/blob-service-client.ts
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export function getContainerClient(connectionString: string): ContainerClient {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerName = process.env.AZURE_STORAGE_CONTAINER || "templatemedia";
  return blobServiceClient.getContainerClient(containerName);
}

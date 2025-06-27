import { getContainerClient } from "@/lib/blob-service-client";
import RenderFolderItems from "../../../../components/view-render-folder-items";
import { FolderType } from "@/lib/types";

type Params = Promise<{ templateId: string }>;
export default async function TemplatePage(props: { params: Params }) {
  const params = await props.params;
  const templateId = params.templateId;
  if (!templateId) {
    return console.log("no project id");
  }

  // ensure valid length ≥ 3:
  const containerName = `${templateId}-projectId`.toLowerCase();
  const folderMap: Record<string, FolderType> = {};
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("no connection string found");
  }
  const containerClient = getContainerClient(connectionString, containerName);

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
    if (rest.length > 0) {
      folderMap[folderName].children.push({
        id: blob.name,
        name: rest.join("/"),
        url: `${containerClient.url}/${blob.name}`,
        folder: false,
      });
    }
  }

  const folders = Object.values(folderMap);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Vienna Summer School
      </h1>
      <p className="text-gray-500 mb-6">Marketing campaigns with a purpose.</p>
      <RenderFolderItems items={folders} />
    </div>
  );
}

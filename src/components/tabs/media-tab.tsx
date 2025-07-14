import { Project } from "@/lib/types";
import FileUploadSection from "../file-upload-section";
import ViewRenderFolderItems from "../view-render-folder-items";
import { getCookie } from "@/lib/utils";

export default function MediaTab({ project }: { project: Project }) {
  const user = JSON.parse(getCookie("user")!);
  return (
    <>
      <ViewRenderFolderItems
        items={project.media}
        projectId={project.id.toString()}
        isFromProjectMedia={true}
        user={user}
      />
      <FileUploadSection projectId={project.id.toString()} />
    </>
  );
}

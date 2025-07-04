import { Project } from "@/lib/types";
import FileUploadSection from "../file-upload-section";
import ViewRenderFolderItems from "../view-render-folder-items";

export default function MediaTab({ project }: { project: Project }) {
  return (
    <>
      <ViewRenderFolderItems
        items={project.media}
        projectId={project.id.toString()}
        isFromProjectMedia={true}
      />
      <FileUploadSection projectId={project.id.toString()} />
    </>
  );
}

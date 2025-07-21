import { Project } from "@/lib/types";
import FileUploadSection from "../file-upload-section";
import ViewRenderFolderItems from "../view-render-folder-items";
import { useAuth } from "@/hooks/use-auth";

export default function MediaTab({ project }: { project: Project }) {
  const { user } = useAuth();

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

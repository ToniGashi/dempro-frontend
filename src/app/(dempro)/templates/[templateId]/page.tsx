import ViewRenderFolderItems from "@/components/view-render-folder-items";
import { getProject } from "@/lib/actions";

type Params = Promise<{ templateId: string }>;
export default async function TemplatePage(props: { params: Params }) {
  const params = await props.params;
  const templateId = params.templateId;
  if (!templateId) {
    return console.log("no project id");
  }

  const { result } = await getProject(templateId);

  if (!result) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{result?.title}</h1>
      <p className="text-gray-500 mb-6">Marketing campaigns with a purpose.</p>
      <ViewRenderFolderItems items={result.media} projectId={templateId} />
    </div>
  );
}

import Image from "next/image";
import ProjectTabsContainer from "@/components/tabs/project-tabs-container";
import { getProject, getProjectBrief } from "@/lib/actions";

type Params = Promise<{ projectId: string }>;

export default async function ProjectPage(props: { params: Params }) {
  const params = await props.params;
  const projectId = params.projectId;

  const [{ result: project }, { result: projectBrief }] = await Promise.all([
    getProject(projectId),
    getProjectBrief(projectId),
  ]);
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center text-white h-108">
        <Image
          src="/project-background.png"
          alt="Project"
          priority
          fill
          style={{
            position: "absolute",
            objectFit: "cover",
            filter: "brightness(30%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-2">{project?.title}</h1>
          <p className="text-4xl leading-[70px] font-bold">
            {project?.subtitle}
          </p>
        </div>
      </div>
      <ProjectTabsContainer project={project!} projectBrief={projectBrief!} />
    </div>
  );
}

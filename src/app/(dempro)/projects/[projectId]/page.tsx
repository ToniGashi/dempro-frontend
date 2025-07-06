import Image from "next/image";
import ProjectTabsContainer from "@/components/tabs/project-tabs-container";
import { getProject, getProjectBrief } from "@/lib/actions";

type Params = Promise<{ projectId: string }>;

export default async function ProjectPage(props: { params: Params }) {
  const { projectId } = await props.params;
  const [{ result: project }, { result: projectBrief }] = await Promise.all([
    getProject(projectId),
    getProjectBrief(projectId),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative flex items-center text-white h-64 sm:h-80 lg:h-[27rem]">
        {/* background image, full bleed */}
        <Image
          src="/project-background.png"
          alt="Project"
          priority
          fill
          className="absolute inset-0 object-cover filter brightness-30"
        />

        {/* overlay content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            {project?.title}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-4xl leading-snug sm:leading-tight lg:leading-[70px] font-bold">
            {project?.subtitle}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <ProjectTabsContainer project={project!} projectBrief={projectBrief!} />
      </div>
    </div>
  );
}

import Link from "next/link";

import { getProjectsByUser } from "@/lib/actions";
import { getServerUser } from "@/lib/api-helpers";
import { hasPermission } from "@/lib/role-utils";
import { MainCard } from "@/components/cards";
import NewProjectDialog from "@/components/create-new-project-dialog";
import { ServerRequirePermission } from "@/components/server-role-guard";

export default async function Projects() {
  const { user } = await getServerUser();
  const { result: projects } = await getProjectsByUser(user?.email);
  const canViewAll = hasPermission(user, "canViewAllProjects");
  const canCreate = hasPermission(user, "canCreateProjects");
  return (
    <main className="flex flex-col">
      {user && (
        <div className="h-140 justify-center md:flex-row flex-col flex lg:gap-30 gap-15 bg-dpro-accent p-16 w-full items-center">
          <ServerRequirePermission permission="canViewAllProjects">
            <Link href="/projects/all">
              <button className="lg:w-75 lg:h-75 md:w-45 md:h-45 w-40 h-40 hover:cursor-pointer hover:bg-dpro-primary/90 font-bold lg:text-3xl md:text-2xl text-xl disabled:pointer-events-none disabled:opacity-50  rounded-4xl bg-dpro-primary text-white max-w-none!">
                All Projects
              </button>
            </Link>
          </ServerRequirePermission>
          {canViewAll && canCreate && (
            <div className="sm:w-2 lg:h-50 md:h-30 hidden md:block bg-dpro-primary rounded-3xl" />
          )}
          <ServerRequirePermission permission="canCreateProjects">
            <NewProjectDialog />
          </ServerRequirePermission>
        </div>
      )}
      <div className="text-dpro-primary flex flex-col gap-12 p-16">
        <h3 className="text-3xl text-dpro-primary font-bold">My projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects?.map((project) => (
            <MainCard
              key={project.id}
              title={project.title}
              description={project.subtitle}
              buttonHref={`/projects/${project.id}`}
              buttonTitle="Open project"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

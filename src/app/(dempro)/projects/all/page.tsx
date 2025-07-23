import Link from "next/link";

import { MainCard } from "@/components/cards";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";

import { getProjects } from "@/lib/actions";
import { TemplatesFilters } from "../../templates/TemplateFilters";

interface TemplatesPageProps {
  searchParams: Promise<{
    tag?: string;
    topic?: string;
    q?: string;
  }>;
}

export default async function AllProjectsPage({
  searchParams,
}: TemplatesPageProps) {
  const { tag, topic, q } = await searchParams;
  const { result: allProjects } = await getProjects(tag, topic);

  let projects = allProjects ?? [];
  if (tag) projects = projects.filter((p) => p.tags?.includes(tag));
  if (topic) projects = projects.filter((p) => p.topic?.includes(topic));
  if (q) {
    const lower = q.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.subtitle.toLowerCase().includes(lower)
    );
  }

  return (
    <main className="flex flex-col">
      <HeroSection
        title_two="These are all the projects"
        imageSrc="/templates.png"
        imageAlt="Templates"
        subtitle="Scrolling and filtering through your needs was never easier!"
      />

      {/* Search + Filters */}
      <div className="px-4 py-8 sm:px-16 lg:px-24 flex justify-center">
        <form
          method="get"
          className="flex flex-col justify-center gap-4 sm:gap-6 flex-wrap items-center w-3xl"
        >
          <div className="flex gap-4 sm:gap-6">
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
              <div
                className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 bg-[#D9D9D9] rounded-full"
                aria-hidden
              />
              <input
                name="q"
                defaultValue={q ?? ""}
                type="text"
                placeholder="Search Templates by keywords"
                className="
                w-full
                py-2 pl-10 pr-4
                text-gray-700 bg-white
                border-2 border-dpro-primary rounded-full
                focus:outline-none focus:ring-2 focus:ring-dpro-primary
              "
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto rounded-full border-2 font-bold px-6 py-2"
            >
              Search
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <TemplatesFilters />
          </div>
        </form>
      </div>

      {/* Cards Grid */}
      <div className="px-4 pb-8 sm:px-16 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {projects.map((el) => (
            <Link key={el.id} href={`/projects/${el.id}`}>
              <MainCard title={el.title} description={el.subtitle} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button className="px-8 py-2">Expand</Button>
        </div>
      </div>
    </main>
  );
}

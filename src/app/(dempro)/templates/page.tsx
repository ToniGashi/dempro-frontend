// app/templates/page.tsx
import { MainCard } from "@/components/cards";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/actions";
import Link from "next/link";
import { TemplatesFilters } from "./TemplateFilters";

interface TemplatesPageProps {
  searchParams: Promise<{
    tag?: string;
    topic?: string;
    q?: string;
  }>;
}

export default async function Templates({ searchParams }: TemplatesPageProps) {
  // await the promise-wrapped searchParams
  const { tag, topic, q } = await searchParams;

  // (optionally) pass tag/topic into your fetch helper
  const { result: allProjects } = await getProjects(tag, topic);

  // apply any in-memory filters
  let projects = allProjects ?? [];
  if (tag) {
    projects = projects.filter((p) => p.tags?.includes(tag));
  }
  if (topic) {
    projects = projects.filter((p) => p.topic?.includes(topic));
  }
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
        title_two="Select your Templates"
        imageSrc="/templates.png"
        imageAlt="Templates"
        subtitle="Scrolling and filtering through your needs was never easier!"
      />

      <div className="p-16">
        <form
          method="get"
          className="flex w-full justify-center gap-5 flex-wrap"
        >
          <div className="relative w-full max-w-100">
            <div
              className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 bg-[#D9D9D9] rounded-full"
              aria-hidden
            />
            <input
              name="q"
              defaultValue={q ?? ""}
              type="text"
              placeholder="Search Templates by keywords"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1"
            />
          </div>
          <Button type="submit" className="rounded-full border-[2px] font-bold">
            Search
          </Button>
        </form>

        <TemplatesFilters />
      </div>

      <div className="p-16">
        <div className="grid grid-cols-3 gap-10">
          {projects.map((el) => (
            <Link key={el.id} href={`/templates/${el.id}`}>
              <MainCard title={el.title} description={el.subtitle} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center my-10">
          <Button>Expand</Button>
        </div>
      </div>
    </main>
  );
}

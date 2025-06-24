import { MainCard } from "@/components/cards";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getProjects } from "@/lib/actions";
import Link from "next/link";

export default async function Templates() {
  const { result: projects } = await getProjects();

  const contentTypes = ["All content types", "Videos", "Documents", "Images"];
  const topics = ["All topics", "Marketing", "Finance", "Design"];

  return (
    <main className="flex flex-col">
      <HeroSection
        title_two="Select your Templates"
        imageSrc="/templates.png"
        imageAlt="Templates"
        subtitle="Scrolling and filtering through your needs was never easier!"
      />
      <div className="p-16">
        <form className="flex w-full justify-center gap-5 flex-wrap">
          <div className="relative w-full max-w-100">
            <div
              className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 bg-[#D9D9D9] rounded-full"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search Templates by keywords"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1"
            />
          </div>
          <Button className="rounded-full border-[2px] font-bold">
            Search
          </Button>
        </form>

        <div className="flex justify-center mt-6 gap-4 flex-wrap">
          {/* Content Type Filter */}
          <Select defaultValue={contentTypes[0]}>
            <SelectTrigger className="rounded-full border border-teal-700 text-teal-700 text-sm min-w-[160px] justify-between">
              <SelectValue placeholder="All content types" />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Topic Filter */}
          <Select defaultValue={topics[0]}>
            <SelectTrigger className="rounded-full border border-teal-700 text-teal-700 text-sm min-w-[160px] justify-between">
              <SelectValue placeholder="All topics" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-16">
        <div className="grid grid-cols-3 gap-10">
          {projects?.map((el) => (
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

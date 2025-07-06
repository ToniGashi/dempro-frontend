import { MainCard, SecondaryCard } from "@/components/cards";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const { result: projects } = await getProjects();

  return (
    <main className="flex flex-col">
      <HeroSection
        title_one="Welcome to"
        title_two="Engage for Change Civic and Democracy Hub"
        buttonText="More about us"
        imageSrc="/social-dashboard.png"
        imageAlt="Social Dashboard"
      />
      <div className="text-dpro-primary flex flex-col gap-12 p-16">
        <h3 className="text-xl text-dpro-primary font-bold">
          Featured Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects?.slice(0, 3)?.map((el) => (
            <Link key={el.id} href={`/templates/${el.id}`}>
              <MainCard title={el.title} description={el.subtitle} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={`/templates`}>
            <Button className="max-w-min hover:cursor-pointer">
              Discover More
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-10 p-16 items-center">
        <div className="text-dpro-primary flex flex-col gap-6">
          <h3 className="font-bold text-5xl">Who are we?</h3>
          <p className="text-2xl">
            We are a dynamic civic and educational platform designed to empower
            individuals and communities to drive meaningful change.{" "}
          </p>
          <p className="text-2xl">
            Focused on youth, educators, and aspiring leaders, we provide tools,
            resources, and opportunities to foster civic engagement, democratic
            action, and impactful learning. Together, we inspire a culture of
            active participation and positive transformation.
          </p>
        </div>
        <Image
          src="/inovation.png"
          alt="Inovation image"
          className="hidden md:block"
          width={563}
          height={550}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-16">
        <SecondaryCard
          title="Search for your template of interest here!"
          buttonTitle="Search templates"
          buttonHref="/templates"
        />
        <SecondaryCard
          title="Create your community and share your experience!"
          buttonTitle="Create a community"
          buttonHref="/"
        />
      </div>
    </main>
  );
}

import { SecondaryCard } from "@/components/cards";
import FeaturedResources from "@/components/featured-resources";
import HeroSection from "@/components/hero-section";
import ImpactSection from "@/components/impact-section";
import InvolvementSection from "@/components/involvement-section";
import NewGenDemocracy from "@/components/new-gen-democracy";
import StoriesSection from "@/components/stories-section";
import Image from "next/image";

export default async function DashboardPage() {
  return (
    <main className="flex flex-col">
      <HeroSection
        title_one="Welcome to DemPro"
        title_two="A Civic and Educational Platform for Democratic Participation"
        buttonText="JOIN DEMPRO"
        imageSrc="/pana.svg"
        imageAlt="Social Dashboard"
      />
      {/*  */}
      <div className="flex xl:gap-16 2xl:gap-36 p-16 items-center">
        <div className="text-dpro-primary flex flex-col gap-6">
          <h3 className="font-bold text-5xl">What is DemPro?</h3>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            DemPro is a dynamic civic and educational platform designed to
            empower individuals and communities to drive meaningful change.{" "}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            When you join DemPro, you will find templates, tools, and learning
            materials to start or scale your project idea, but most importantly
            you will find a community of inquisitive minds eager to change the
            world for the better.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Serving together youth, educators and aspiring leaders, our goal is
            to inspire and equip a culture of active participation and positive
            transformation.
          </p>
        </div>
        <Image
          src="/social-dashboard/bro.svg"
          alt="Inovation image"
          className="hidden 2xl:block"
          width={563}
          height={550}
        />
      </div>
      <FeaturedResources />
      <NewGenDemocracy />
      <ImpactSection />
      <StoriesSection />
      <InvolvementSection />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-16">
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
      </div> */}
    </main>
  );
}

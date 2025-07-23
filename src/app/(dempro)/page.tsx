import DemProSection from "@/components/dempro-section";
import FeaturedResources from "@/components/featured-resources";
import HeroSection from "@/components/hero-section";
import ImpactSection from "@/components/impact-section";
import InvolvementSection from "@/components/involvement-section";
import NewGenDemocracy from "@/components/new-gen-democracy";
import StoriesSection from "@/components/stories-section";

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
      <DemProSection />
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

import TabsContainer from "@/components/tabs/tabs-container";
import NextImage from "next/image";

export default async function ProjectPage() {
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center text-white h-108">
        <NextImage
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
          <h1 className="text-5xl font-bold mb-2">
            Vienna Summer School 2024:
          </h1>
          <p className="text-4xl leading-[70px] font-bold">
            Empowering Refugee Businesses through Digital Marketing and Mobile
            Journalism in Vienna
          </p>
        </div>
      </div>
      <TabsContainer />
    </div>
  );
}

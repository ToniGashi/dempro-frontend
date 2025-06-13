import { MainCard } from "@/components/cards";

export default async function Profile() {
  return (
    <main className="flex flex-col">
      <div className="h-140 justify-center flex gap-30 bg-dpro-accent p-16 w-full items-center">
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl rounded-4xl bg-dpro-primary text-white disabled:pointer-events-none disabled:opacity-50 max-w-none!">
          Join a New Project
        </button>
        <div className="w-2 h-50 bg-dpro-primary rounded-3xl" />
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl disabled:pointer-events-none disabled:opacity-50  rounded-4xl bg-dpro-primary text-white max-w-none!">
          Create a New Project
        </button>
      </div>
      <div className="text-dpro-primary flex flex-col gap-12 p-16">
        <h3 className="text-3xl text-dpro-primary font-bold">My projects</h3>
        <div className="grid grid-cols-3 gap-10">
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
          <MainCard
            title="Vienna Summer School"
            description="A one month school practicing digital skills while contributing to the refugee community in Vienna"
            buttonHref="/project"
            buttonTitle="Open project"
          />
        </div>
      </div>
    </main>
  );
}

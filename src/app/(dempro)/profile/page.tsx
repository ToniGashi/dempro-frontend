import { MainCard } from "@/components/cards";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Profile() {
  return (
    <main className="flex flex-col">
      <div className="h-140 justify-center flex gap-30 bg-dpro-accent p-16 w-full items-center">
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl rounded-4xl bg-dpro-primary text-white disabled:pointer-events-none disabled:opacity-50 max-w-none!">
          Join a New Project
        </button>
        <div className="w-2 h-50 bg-dpro-primary rounded-3xl" />
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl disabled:pointer-events-none disabled:opacity-50  rounded-4xl bg-dpro-primary text-white max-w-none!">
              Create a New Project
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Create a new project
              </DialogTitle>
              <DialogDescription className="text-sm">
                Enter a title and a small description for your new project
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="title" className="font-medium">
                  Title
                </label>
                <RoundedPrimaryInput name="title" placeholder="Title" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <RoundedPrimaryInput
                  name="description"
                  placeholder="Description"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-dpro-primary text-white">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

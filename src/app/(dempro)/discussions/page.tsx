import { DiscussionCard } from "@/components/cards";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Thread } from "@/components/tabs/discussions-tab";
import FilteredDiscussionsTabContainer from "@/components/tabs/filtered-discussions-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//TODO:remove after endpoint integration
const threads: Thread[] = [
  {
    title: "How did you execute the formative study for this project?",
    content:
      "I'm curious about the methodology used for the formative research phase.",
    category: "Question",
  },
  {
    title: "Best practices for mobile journalism interviews",
    content:
      "What are the key considerations when conducting interviews for mobile journalism pieces?",
    category: "Advice",
  },
  {
    title: "Digital marketing strategies discussion",
    content:
      "Let's discuss the most effective digital marketing approaches for refugee businesses.",
    category: "Discussion",
  },
];

export default function DiscussionsPage() {
  return (
    <main className="flex flex-col">
      <div className="h-140 justify-center flex gap-30 bg-dpro-accent p-16 w-full items-center">
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl rounded-4xl bg-dpro-primary text-white disabled:pointer-events-none disabled:opacity-50 max-w-none!">
          Start a new discussion
        </button>
        <div className="w-2 h-50 bg-dpro-primary rounded-3xl" />
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl rounded-4xl bg-dpro-primary text-white disabled:pointer-events-none disabled:opacity-50 max-w-none!">
          Ask a question
        </button>
      </div>
      <div className="p-16 flex flex-col gap-4 items-center">
        <p className="text-6xl font-bold text-dpro-primary">Discussions</p>
        <p className="text-3xl font-bold text-dpro-primary">
          All topics related to democracy and civic engagement
        </p>
        <RoundedPrimaryInput
          name="discussion"
          placeholder="Search discussions"
          className="rounded-xl flex py-7 items-center border-dpro-primary/60 max-w-177 h-12 placeholder:text-xl placeholder:text-dpro-dark-blue"
        />
        <div className="px-16 rounded-3xl py-8 bg-dpro-secondary text-3xl mt-10 font-normal">
          <span className="font-bold">Question of the week:</span> "What are the
          most effective ways for young Bulgarians to influence political change
          at a local level?
        </div>
      </div>
      <div className="p-16 items-center flex flex-col gap-16">
        <p className="text-2xl text-dpro-primary font-bold">
          This week in discussions
        </p>
        <div className="grid grid-cols-4 gap-8">
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
          <DiscussionCard
            lastPosted={9}
            nrOfComments={111}
            title="How Can We Strengthen Local Democracy in Bulgaria?"
            content="Discuss ways to increase citizen participation at the local government level, particularly in small towns and rural areas. What are the barriers, and how can they be overcome?"
          />
        </div>
        <Button className="bg-dpro-accent text-black">View more</Button>
      </div>
      <div className="p-16 flex flex-col gap-6">
        <p className="text-2xl text-dpro-primary font-bold">
          Recent Discussions
        </p>
        <FilteredDiscussionsTabContainer
          endpoint="teste"
          threads={threads}
          className={"border-dpro-secondary"}
        />
        <div className="flex justify-center">
          <Button className="bg-dpro-accent text-black">View more</Button>
        </div>
      </div>
      <div className="p-16">
        <div className="grid grid-cols-3 gap-10">
          <div className="p-6 flex flex-col gap-2 max-h-min text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
            <p className="font-bold text-xl">Important Links</p>
            <Link href="/">Community Guidelines</Link>
            <Link href="/">Community Code of Conduct</Link>
          </div>
          <div className="p-6 flex max-h-min flex-col gap-2 text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
            <p className="font-bold text-xl">Most Popular Topic Categories</p>
            <div className="font-bold items-center flex gap-2">
              <span>#1</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Elections
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#2</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Democracy in Bulgaria
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#3</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Balkan Region Politics
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#4</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Education on Civic Engagement
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#5</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Community Building
            </div>
          </div>
          <div className="p-6 flex max-h-min flex-col gap-2 text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
            <p className="font-bold text-xl">Top Contributors</p>
            <div className="font-bold items-center flex gap-2">
              <span>#1</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              JuliaW
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#2</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              JacobJ
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#3</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              KleaM
            </div>
            <div className="font-bold items-center flex gap-2">
              <span>#4</span>
              <div
                className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                aria-hidden="true"
              />
              Beni
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

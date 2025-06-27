import Link from "next/link";

import { getThreads } from "@/lib/actions";

import { ThreadCard } from "@/components/cards";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Button } from "@/components/ui/button";
import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
import NewThreadDialog from "@/components/create-new-thread-dialog";
import { Suspense } from "react";
import SummarySection from "./SummarySection";

export default async function ThreadsPage() {
  const { result: threads } = await getThreads();

  return (
    <main className="flex flex-col">
      <div className="h-140 justify-center flex gap-30 bg-dpro-accent p-16 w-full items-center">
        <NewThreadDialog />
      </div>
      <div className="p-16 flex flex-col gap-4 items-center">
        <p className="text-6xl font-bold text-dpro-primary">Threads</p>
        <p className="text-3xl font-bold text-dpro-primary">
          All topics related to democracy and civic engagement
        </p>
        <RoundedPrimaryInput
          name="thread"
          placeholder="Search threads"
          className="rounded-xl flex py-7 items-center border-dpro-primary/60 h-12 placeholder:text-xl placeholder:text-dpro-dark-blue"
        />
        <div className="px-16 rounded-3xl py-8 bg-dpro-secondary text-3xl mt-10 font-normal">
          <span className="font-bold">Question of the week:</span>{" "}
          {`"What are the
          most effective ways for young Bulgarians to influence political change
          at a local level?`}
        </div>
      </div>
      <div className="p-16 items-center flex flex-col gap-16">
        <p className="text-2xl text-dpro-primary font-bold">
          This week in threads
        </p>
        <div className="grid grid-cols-4 gap-8 w-full">
          {threads?.slice(0, 8).map((thread) => (
            <ThreadCard
              key={thread.id}
              id={thread.id}
              lastPosted={thread.threadTime}
              nrOfComments={thread.numberOfComments}
              title={thread.title}
              content={thread.description}
            />
          ))}
        </div>
        {threads && threads.length > 8 && (
          <Link href={"/threads/list"} className="bg-dpro-accent text-black">
            <Button className=" hover:cursor-pointer">View more</Button>
          </Link>
        )}
      </div>
      <div className="p-16 flex flex-col gap-6">
        <FilteredThreadsTabContainer
          threadCount={5}
          className="border-dpro-secondary"
        />
        <div className="flex justify-center">
          <Link
            href={"/threads/list"}
            className="bg-dpro-accent text-black hover:cursor-pointer"
          >
            <Button className=" hover:cursor-pointer">View more</Button>
          </Link>
        </div>
      </div>
      <div className="p-16">
        <Suspense fallback={<div>Loading...</div>}>
          <SummarySection />
        </Suspense>
      </div>
    </main>
  );
}

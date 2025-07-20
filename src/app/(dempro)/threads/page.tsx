import Link from "next/link";
import { cookies } from "next/headers";

import {
  getThreadsByCategory,
  getThreads,
  getThreadSummary,
} from "@/lib/actions";

import { ThreadCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
import NewThreadDialog from "@/components/create-new-thread-dialog";
import SearchThreadsInput from "@/components/search-thread-input";
import SummarySection from "./SummarySection";

export default async function ThreadsPage() {
  const cookieStore = await cookies();
  const initialCategory =
    cookieStore.get(`selected-thread-category`)?.value || "Recent";

  const [
    { result: threads },
    { result: threadsByCategory },
    { result: threadsSummary },
  ] = await Promise.all([
    getThreads(),
    getThreadsByCategory({ category: initialCategory, threadCount: 5 }),
    getThreadSummary(),
  ]);

  return (
    <main className="flex flex-col">
      {/* New Thread Banner */}
      <div className="bg-dpro-accent flex justify-center items-center py-8 sm:py-16 px-4 sm:px-16 gap-4 sm:gap-8">
        <NewThreadDialog />
      </div>

      {/* Header & Search */}
      <div className="flex flex-col items-center gap-4 px-4 sm:px-16 py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dpro-primary">
          Threads
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-center max-w-2xl font-bold text-dpro-primary">
          All topics related to democracy and civic engagement
        </p>
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <SearchThreadsInput />
        </div>
        <div className="mt-8 bg-dpro-secondary text-dpro-primary px-4 sm:px-8 py-4 sm:py-6 rounded-3xl max-w-3xl text-base sm:text-lg">
          <span className="font-bold">Question of the week:&nbsp;</span>
          What are the most effective ways for young Bulgarians to influence
          political change at a local level?
        </div>
      </div>

      {/* This Week In Threads */}
      <div className="flex flex-col items-center gap-8 px-4 sm:px-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-dpro-primary">
          This week in threads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
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
          <Link href="/threads/list" className="w-full sm:w-auto mt-4">
            <Button className="w-full sm:w-auto">View more</Button>
          </Link>
        )}
      </div>

      {/* Filtered Tabs */}
      <div className="flex flex-col w-full gap-6 px-4 sm:px-16 py-8">
        <FilteredThreadsTabContainer
          threadCount={5}
          initialThreads={threadsByCategory}
          initialCategory={initialCategory}
        />
        <div className="w-full sm:w-auto mt-4">
          <Link href="/threads/list">
            <Button className="w-full sm:w-auto">View more</Button>
          </Link>
        </div>
      </div>

      {/* Summary Section */}
      <div className="px-4 sm:px-16 py-8">
        <SummarySection summary={threadsSummary} />
      </div>
    </main>
  );
}

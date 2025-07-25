import NewThreadDialog from "@/components/create-new-thread-dialog";
import SearchThreadsInput from "@/components/search-thread-input";
import SummarySection from "./SummarySection";
import WeeklyThreads from "./WeeklyThreads";
import { Suspense } from "react";
import FilteredTabs from "./FilteredTabs";

export default async function ThreadsPage() {
  return (
    <main className="flex flex-col">
      {/* New Thread Banner */}
      <div className="h-140 bg-dpro-accent flex justify-center items-center py-8 sm:py-16 px-4 sm:px-16 gap-4 sm:gap-8">
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
        <Suspense fallback={"Loading..."}>
          <WeeklyThreads />
        </Suspense>
      </div>

      {/* Filtered Tabs */}
      <Suspense fallback={"Loading..."}>
        <FilteredTabs />
      </Suspense>

      {/* Summary Section */}
      <Suspense fallback={"Loading..."}>
        <div className="px-4 sm:px-16 py-8">
          <SummarySection />
        </div>
      </Suspense>
    </main>
  );
}

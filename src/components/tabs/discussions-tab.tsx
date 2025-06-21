"use client";

import { useCustomSWR } from "@/hooks/use-custom-swr";

import { Thread } from "@/lib/types";

import FilteredDiscussionsTabContainer from "./filtered-discussions-container";
import ThreadForm from "../thread-form";

export default function DiscussionsTab({ projectId }: { projectId: number }) {
  const {
    data: projectThreads,
    isLoading,
    mutate,
  } = useCustomSWR<Thread[]>(`threads?projectId=${projectId}`);

  return (
    <div className="space-y-8 max-w-200 mt-16">
      <div>
        <p className="text-4xl font-bold text-dpro-dark-blue mb-6">
          Thread Board
        </p>
        <div className="mb-8">
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Create a new thread
          </p>
          <ThreadForm projectId={projectId} mutate={mutate} />
        </div>
        <div>
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Recent Threads in this project
          </p>
          <FilteredDiscussionsTabContainer threads={projectThreads} />
        </div>
      </div>
    </div>
  );
}

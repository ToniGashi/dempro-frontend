"use client";

import { useState } from "react";
import Link from "next/link";

import { Thread } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCustomSWR } from "@/hooks/use-custom-swr";
import { ThreadsSkeleton } from "../ui/skeleton";

export default function FilteredThreadsTabContainer({
  projectId,
  threadCount = 5,
  className,
}: {
  projectId?: number;
  threadCount?: number;
  className?: string;
}) {
  const [threadFilter, setThreadFilter] = useState("Recent");

  const { data, isLoading } = useCustomSWR<Thread[]>(
    ["threads", `${projectId}`, threadFilter],
    `threads?status=${threadFilter}&pageSize=${threadCount}&page=1${
      projectId ? `&projectId=${projectId}` : ""
    }`
  )!;

  if (isLoading) return <ThreadsSkeleton threadCount={threadCount} />;
  if (!data) return <div>No data available</div>;

  return (
    <section className={cn("py-8", className)}>
      <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-dpro-primary mb-4">
        Recent Threads
      </h2>

      {/* scrollable filters */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-flex space-x-4 sm:space-x-6 text-base sm:text-lg">
          {["All", "Recent", "Unanswered", "Unresolved", "Solved"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setThreadFilter(filter)}
                className={cn(
                  "pb-2 whitespace-nowrap font-medium",
                  threadFilter === filter
                    ? "border-b-2 border-dpro-primary text-dpro-primary"
                    : "border-b-2 border-transparent text-gray-600 hover:text-dpro-primary hover:border-gray-300"
                )}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* threads grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {data.map((thread) => (
          <Link
            key={thread.id}
            href={`/threads/${thread.id}`}
            className={cn(
              "block border-2 rounded-3xl p-4 hover:shadow-md transition-shadow cursor-pointer",
              "border-dpro-primary",
              "bg-white",
              className
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <span className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                  {thread.title}
                </span>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-2 break-words">
                  {thread.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

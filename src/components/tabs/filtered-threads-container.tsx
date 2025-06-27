"use client";

import { useState } from "react";

import { Thread } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCustomSWR } from "@/hooks/use-custom-swr";
import { ThreadsSkeleton } from "../ui/skeleton";
import Link from "next/link";

export default function FilteredThreadsTabContainer({
  threadCount,
  className,
  projectId,
}: {
  projectId?: number;
  threadCount?: number;
  className?: string;
}) {
  const [threadFilter, setThreadFilter] = useState("Recent");

  const { data, isLoading } = useCustomSWR<Thread[]>(
    ["threads", `${projectId}`, threadFilter],
    `threads?status=${threadFilter}&pageSize=${threadCount}&page=1${
      !!projectId ? `&projectId=${projectId}` : ""
    }`
  )!;

  if (isLoading) return <ThreadsSkeleton threadCount={threadCount || 5} />;

  if (!data) return <div>No data available</div>;

  return (
    <>
      <p className="text-2xl text-dpro-primary font-bold">Recent Threads</p>
      <div className="flex gap-6 mb-6">
        {["All", "Recent", "Unanswered", "Unresolved", "Solved"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setThreadFilter(filter)}
              className={`pt-4 border-b font-medium text-dpro-primary text-xl ${
                threadFilter === filter
                  ? "border-dpro-primary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>
      <div className="space-y-4">
        {data.map((thread, index) => (
          <div
            key={index}
            className={cn(
              "border-2 border-dpro-primary rounded-3xl p-4 hover:shadow-sm transition-shadow cursor-pointer",
              className
            )}
          >
            <Link href={`/threads/${thread.id}`}>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                  aria-hidden="true"
                />
                <div className="flex flex-col  gap-2">
                  <span className="font-semibold text-gray-900">
                    {thread.title}
                  </span>
                  <p className="text-gray-600 text-sm">{thread.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

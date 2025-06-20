"use client";

import { useState } from "react";
import { Thread } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FilteredDiscussionsTabContainer({
  //   endpoint,
  threads,
  className,
}: {
  //   endpoint: string;
  threads?: Thread[];
  className?: string;
}) {
  const [threadFilter, setThreadFilter] = useState("Recent");

  //   const { data, isLoading } = useCustomSWR<any>(`${endpoint}/${threadFilter}`);

  return (
    <>
      <div className="flex gap-6 mb-6">
        {["Recent", "Unanswered", "Unresolved", "Solved"].map((filter) => (
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
        ))}
      </div>
      <div className="space-y-4">
        {threads?.map((thread, index) => (
          <div
            key={index}
            className={cn(
              "border-2 border-dpro-primary rounded-3xl p-4 hover:shadow-sm transition-shadow cursor-pointer",
              className
            )}
          >
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
          </div>
        ))}
      </div>
    </>
  );
}

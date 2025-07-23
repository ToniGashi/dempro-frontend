import { ThreadCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { getThreads } from "@/lib/actions";
import Link from "next/link";
import React from "react";

export const revalidate = 60;

export default async function WeeklyThreads() {
  const data = await getThreads();

  if (!data.success || !data.result) {
    return <p className="text-center py-8">No threads available this week.</p>;
  }

  const threads = data.result;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
        {threads.slice(0, 8).map((thread) => (
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

      {threads.length > 8 && (
        <div className="flex justify-center mt-6">
          <Link href="/threads/list">
            <Button className="w-full sm:w-auto">View more</Button>
          </Link>
        </div>
      )}
    </>
  );
}

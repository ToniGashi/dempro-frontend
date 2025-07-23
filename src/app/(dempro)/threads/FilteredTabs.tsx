import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
import { Button } from "@/components/ui/button";
import { getThreadsByCategory } from "@/lib/actions";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function FilteredTabs() {
  const cookieStore = await cookies();
  const initialCategory =
    cookieStore.get(`selected-thread-category`)?.value || "Recent";
  const { result: threadsByCategory } = await getThreadsByCategory({
    category: initialCategory,
    threadCount: 5,
  });
  return (
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
  );
}

export default FilteredTabs;

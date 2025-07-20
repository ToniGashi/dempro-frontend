import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
import { getThreadsByCategory } from "@/lib/actions";
import { cookies } from "next/headers";

export default async function ThreadList() {
  const cookieStore = await cookies();
  const initialCategory =
    cookieStore.get(`selected-thread-category`)?.value || "Recent";
  const threadCount = 10;
  const { result: threadsByCategory } = await getThreadsByCategory({
    category: initialCategory,
    threadCount,
  });

  return (
    <div className="mx-10">
      <FilteredThreadsTabContainer
        initialThreads={threadsByCategory}
        initialCategory={initialCategory}
        threadCount={threadCount}
        className="border-dpro-secondary"
      />
    </div>
  );
}

import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
import { getThreads } from "@/lib/actions";

export default async function ThreadList() {
  const { result: threads } = await getThreads();
  return (
    <div className="mx-10">
      <FilteredThreadsTabContainer
        threads={threads}
        className="border-dpro-secondary"
      />
    </div>
  );
}

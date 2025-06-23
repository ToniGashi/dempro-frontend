import FilteredThreadsTabContainer from "@/components/tabs/filtered-threads-container";
export default async function ThreadList() {
  return (
    <div className="mx-10">
      <FilteredThreadsTabContainer
        threadCount={10}
        className="border-dpro-secondary"
      />
    </div>
  );
}

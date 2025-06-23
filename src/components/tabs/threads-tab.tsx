import FilteredThreadsTabContainer from "./filtered-threads-container";
import ThreadForm from "../thread-form";

export default function ThreadsTab({ projectId }: { projectId: number }) {
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
          <ThreadForm projectId={projectId} />
        </div>
        <div>
          <FilteredThreadsTabContainer threadCount={3} projectId={projectId} />
        </div>
      </div>
    </div>
  );
}

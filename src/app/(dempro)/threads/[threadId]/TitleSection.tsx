import FlagButton from "@/components/flag-button";
import ResolvedButton from "@/components/resolved-button";
import { Thread } from "@/lib/types";

function TitleSection({ thread }: { thread: Thread }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {thread.title}
      </h1>
      <div className="flex space-x-2">
        <FlagButton
          isFlagged={thread.isFlaggedByCurrentUser}
          threadId={thread.id}
        />
        <ResolvedButton isResolved={thread.isResolved} threadId={thread.id} />
      </div>
    </div>
  );
}

export default TitleSection;

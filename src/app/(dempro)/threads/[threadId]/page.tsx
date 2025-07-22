import Link from "next/link";
import { ArrowLeft, MessageSquare, Clock } from "lucide-react";

import { getCommentsFromThreadId, getThread } from "@/lib/actions";
import CommentsSection from "./CommentsSection";
import { TitleSection } from "./TitleSection";

type Params = Promise<{ threadId: string }>;

export default async function ThreadByIdPage(props: { params: Params }) {
  const { threadId } = await props.params;

  const [{ result: thread }, { result: comments }] = await Promise.all([
    getThread(threadId),
    getCommentsFromThreadId(threadId),
  ]);

  if (!thread) return <div>This thread has been deleted</div>;

  return (
    <main className="w-full mx-auto px-5 sm:px-7 lg:px-12 py-8">
      {/* Back link */}
      <Link
        href="/threads"
        className="inline-flex items-center space-x-2 text-base sm:text-lg font-medium text-dpro-primary bg-dpro-accent hover:bg-dpro-accent/55 border border-dpro-accent/85 rounded-full px-4 py-2 sm:px-5 sm:py-3 mb-8 sm:mb-16 transition-colors duration-150"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Back to Discussions</span>
      </Link>

      {/* Thread header */}
      <article className="mb-10">
        <TitleSection thread={thread} />
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          {thread.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-teal-700 text-sm sm:text-base mb-6">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{thread.numberOfComments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{thread.threadTime}</span>
          </div>
        </div>
      </article>

      {/* Comments */}
      <section>
        <CommentsSection comments={comments ?? []} threadId={thread.id} />
      </section>
    </main>
  );
}

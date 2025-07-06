import { getThread } from "@/lib/actions";
import { ArrowLeft, MessageSquare, Clock } from "lucide-react";
import CommentsSection from "./CommentsSection";
import Link from "next/link";

type Params = Promise<{ threadId: string }>;

export default async function TemplatePage(props: { params: Params }) {
  const { threadId } = await props.params;
  if (!threadId) return console.error("no thread id");

  const { result: thread } = await getThread(threadId);
  if (!thread) return console.error("thread not found");

  return (
    <main className="w-full mx-auto px-5 sm:px-7 lg:px-12 py-8">
      {/* Back link */}
      <Link
        href="/threads"
        className="
          inline-flex items-center space-x-2
          text-base sm:text-lg font-medium
          text-green-700 bg-green-50 hover:bg-green-100
          border border-green-200 rounded-full
          px-4 py-2 sm:px-5 sm:py-3
          mb-8 sm:mb-16
          transition-colors duration-150
        "
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Back to Discussions</span>
      </Link>

      {/* Thread header */}
      <article className="mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {thread.title}
        </h1>
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
      <section className="">
        <CommentsSection threadId={threadId} />
      </section>
    </main>
  );
}

import { getThread } from "@/lib/actions";
import { ArrowLeft, MessageSquare, Clock } from "lucide-react";
import CommentsSection from "./CommentsSection";
import Link from "next/link";

type Params = Promise<{ threadId: string }>;
export default async function TemplatePage(props: { params: Params }) {
  const params = await props.params;
  const threadId = params.threadId;
  if (!threadId) {
    return console.log("no thread id");
  }

  const { result: thread } = await getThread(threadId);
  if (!thread) {
    return console.log("no thread found with that id");
  }

  return (
    <div className="w-4/5 mx-auto px-4 py-8">
      <Link
        href="/threads"
        className="inline-flex items-center space-x-2 text-xl font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-full p-5 mb-16 transition-colors duration-150"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Discussions</span>
      </Link>

      <div>
        <h1 className="text-3xl font-bold mb-7">{thread.title}</h1>
        <p className="text-gray-700 mb-10">{thread.description}</p>
        <div className="flex items-center text-teal-700 mb-6 space-x-6 text-xl">
          {/* comments count */}
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-6 h-6" />
            <span>{thread.numberOfComments}</span>
          </div>

          {/* time ago */}
          <div className="flex items-center space-x-1">
            <Clock className="w-6 h-6" />
            <span>{thread.threadTime}</span>
          </div>
        </div>
      </div>
      <CommentsSection threadId={threadId} />
    </div>
  );
}

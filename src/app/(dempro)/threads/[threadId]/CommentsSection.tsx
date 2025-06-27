// no "use client" here – we fetch on the server
import React from "react";
import { getCommentsFromThreadId } from "@/lib/actions";
import CommentItem from "./CommentItem";
import { Comment } from "@/lib/types";
import AddCommentSection from "./AddCommentSection";

type CommentsSectionProps = { threadId: string };

export default async function CommentsSection({
  threadId,
}: CommentsSectionProps) {
  const { result: comments } = await getCommentsFromThreadId(threadId);

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500">No comments yet.</div>;
  }
  return (
    <div>
      <div className="space-y-8">
        {comments.map((c: Comment) => (
          <CommentItem key={c.id} comment={c} threadId={threadId} />
        ))}
      </div>
      <AddCommentSection threadId={threadId} />
    </div>
  );
}

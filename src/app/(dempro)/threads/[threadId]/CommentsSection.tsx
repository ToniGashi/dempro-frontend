import { Comment } from "@/lib/types";
import CommentItem from "./CommentItem";
import AddCommentSection from "./AddCommentSection";

export default async function CommentsSection({
  comments,
  threadId,
}: {
  comments: Comment[];
  threadId: number;
}) {
  return (
    <div>
      <div className="space-y-8">
        {comments.length === 0 ? (
          <div className="text-gray-500">No comments yet.</div>
        ) : (
          comments.map((c: Comment) => (
            <CommentItem key={c.id} comment={c} threadId={threadId} />
          ))
        )}
      </div>
      <AddCommentSection threadId={threadId} />
    </div>
  );
}

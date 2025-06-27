// components/CommentItem.tsx
"use client";

import { useState } from "react";
import { Comment } from "@/lib/types";
import { ThumbsUp, MessageSquare } from "lucide-react";
import ReplyForm from "./ReplyForm";
import { likeComment, dislikeComment } from "@/lib/actions";

export default function CommentItem({
  comment,
  threadId,
}: {
  comment: Comment;
  threadId: string;
}) {
  const [likesCount, setLikesCount] = useState<number>(comment.likes);
  const [hasLiked, setHasLiked] = useState<boolean>(
    comment.currentUserAlreadyLiked
  );
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>(comment.replies);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  async function handleLike() {
    if (isLiking) return;
    const prevLiked = hasLiked;
    const prevCount = likesCount;
    setIsLiking(true);

    try {
      if (prevLiked) {
        await dislikeComment(comment.id.toString());
        setHasLiked(false);
        setLikesCount(prevCount - 1);
      } else {
        await likeComment(comment.id.toString());
        setHasLiked(true);
        setLikesCount(prevCount + 1);
      }
    } catch (error) {
      // rollback on error
      setHasLiked(prevLiked);
      setLikesCount(prevCount);
      console.error("Toggling like failed:", error);
    } finally {
      setIsLiking(false);
    }
  }

  function handleNewReply(newReply: Comment) {
    setReplies((prev) => [...prev, newReply]);
    setShowReplyForm(false);
  }

  // Styles for the like button
  const likeBtnClasses = [
    "flex items-center space-x-1 px-2 py-1 rounded-full border",
    hasLiked
      ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
    isLiking ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer",
  ].join(" ");

  const replyBtnClasses =
    "flex items-center space-x-1 px-2 py-1 rounded-full border border-teal-200 text-teal-700 hover:bg-teal-50 hover:cursor-pointer";

  return (
    <div className="border border-dpro-primary/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              comment.createdById
            )}&background=DDD&color=555&size=128`}
            alt={comment.createdById}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-900 font-medium">{comment.postedByName}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Replies {comment.numberOfReplies}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{comment.content}</p>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={likeBtnClasses}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likesCount}</span>
        </button>
        <button
          onClick={() => setShowReplyForm((v) => !v)}
          className={replyBtnClasses}
        >
          <span>Reply</span>
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      {showReplyForm && (
        <ReplyForm
          threadId={threadId}
          parentId={comment.id}
          onSuccess={handleNewReply}
        />
      )}

      {replies.length > 0 && (
        <div className="mt-6 pl-8 border-l border-gray-200 space-y-6">
          {replies.map((r) => (
            <CommentItem key={r.id} comment={r} threadId={threadId} />
          ))}
        </div>
      )}
    </div>
  );
}

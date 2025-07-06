"use client";

import { useState } from "react";
import { Comment } from "@/lib/types";
import { ThumbsUp, MessageSquare } from "lucide-react";
import ReplyForm from "./ReplyForm";
import { likeComment, dislikeComment } from "@/lib/actions";
import { cn } from "@/lib/utils";

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
    } catch {
      setHasLiked(prevLiked);
      setLikesCount(prevCount);
      alert("Failed to perform action. Please try again.");
    } finally {
      setIsLiking(false);
    }
  }

  function handleNewReply(newReply: Comment) {
    setReplies((prev) => [...prev, newReply]);
    setShowReplyForm(false);
  }

  const likeBtnClasses = cn(
    "flex items-center space-x-1 px-2 py-1 rounded-full border transition-opacity",
    hasLiked
      ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
    isLiking ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
  );

  const replyBtnClasses =
    "flex items-center space-x-1 px-2 py-1 rounded-full border border-teal-200 text-teal-700 hover:bg-teal-50";

  return (
    <div className="border border-dpro-primary/30 rounded-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              comment.createdById
            )}&background=DDD&color=555&size=128`}
            alt={comment.createdById}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="text-gray-900 font-medium text-base sm:text-lg">
              {comment.postedByName}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Replies {comment.numberOfReplies}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex gap-3 sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={likeBtnClasses}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">{likesCount}</span>
        </button>
        <button
          onClick={() => setShowReplyForm((v) => !v)}
          className={replyBtnClasses}
        >
          <span className="text-sm">Reply</span>
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mb-4">
          <ReplyForm
            threadId={threadId}
            parentId={comment.id}
            onSuccess={handleNewReply}
          />
        </div>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4 pl-4 sm:pl-8 border-l border-gray-200 space-y-4">
          {replies.map((r) => (
            <CommentItem key={r.id} comment={r} threadId={threadId} />
          ))}
        </div>
      )}
    </div>
  );
}

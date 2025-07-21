"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Comment } from "@/lib/types";

import { likeComment, dislikeComment } from "@/lib/actions";
import { cn } from "@/lib/utils";

import ReplyForm from "./ReplyForm";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function CommentItem({
  comment,
  threadId,
}: {
  comment: Comment;
  threadId: number;
}) {
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  async function handleLike() {
    setIsLiking(true);
    try {
      comment.currentUserAlreadyLiked
        ? await dislikeComment(comment.id.toString())
        : await likeComment(comment.id.toString());
    } catch {
      toast.error("Failed to perform action. Please try again later");
    } finally {
      setIsLiking(false);
    }
  }

  const likeBtnClasses = cn(
    "flex items-center space-x-1 px-2 py-1 rounded-full border transition-opacity",
    comment.currentUserAlreadyLiked
      ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
    isLiking ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
  );

  return (
    <div className="border border-dpro-primary/30 rounded-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ">
            <AvatarFallback className="text-dpro-primary text-base">
              {comment.postedByName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
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
          <span className="text-sm">{comment.likes}</span>
        </button>

        <button
          className="flex items-center space-x-1 px-2 py-1 rounded-full border border-teal-200 text-teal-700 hover:bg-teal-50"
          onClick={() => setShowReplyForm(true)}
        >
          <span className="text-sm">Reply</span>
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>
      <ReplyForm
        threadId={threadId}
        parentId={comment.id}
        showForm={showReplyForm}
        setShowForm={setShowReplyForm}
      />

      {comment.replies.length > 0 && (
        <div className="mt-4 pl-4 sm:pl-8 border-l border-gray-200 space-y-4">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} threadId={threadId} />
          ))}
        </div>
      )}
    </div>
  );
}

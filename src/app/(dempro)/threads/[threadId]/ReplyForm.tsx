"use client";

import { useState } from "react";
import { postReplyToThread } from "@/lib/actions"; // you’ll need to implement this
import { Comment } from "@/lib/types";

type ReplyFormProps = {
  threadId: string;
  parentId: number | null;
  onSuccess: (newReply: Comment) => void;
};

export default function ReplyForm({
  threadId,
  parentId,
  onSuccess,
}: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const newReply = await postReplyToThread({
        threadId: threadId,
        replyToId: parentId,
        content,
      });
      if (newReply.success) {
        if (newReply.result) {
          onSuccess(newReply.result);
        }
        setContent("");
      } else {
        console.error("Failed to post reply:", newReply.error);
        alert("Failed to post reply. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        className="w-full border border-gray-300 rounded p-2"
        rows={3}
        placeholder="Write your reply…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2  text-white rounded bg-dpro-primary hover:bg-dpro-dark hover:cursor-pointer disabled:opacity-50"
      >
        {submitting ? "Posting…" : "Post Reply"}
      </button>
    </form>
  );
}

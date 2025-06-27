"use client";

import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import { postReplyToThread } from "@/lib/actions";

type AddCommentSectionProps = {
  threadId: string;
};

export default function AddCommentSection({
  threadId,
}: AddCommentSectionProps) {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
    window.location.reload();
  };

  if (showForm) {
    return (
      <div className="mt-12 w-full ">
        <ReplyForm
          threadId={threadId}
          parentId={null}
          onSuccess={handleSuccess}
        />
      </div>
    );
  }

  return (
    <div className="mt-12 text-center">
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 text-white rounded-lg bg-dpro-primary hover:bg-dpro-dark hover:cursor-pointer"
      >
        Add a new comment on the main thread
      </button>
    </div>
  );
}

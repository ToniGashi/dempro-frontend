"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReplyForm from "./ReplyForm";

type AddCommentSectionProps = {
  threadId: number;
};

export default function AddCommentSection({
  threadId,
}: AddCommentSectionProps) {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  return (
    <div className="mt-12 text-center">
      {!showReplyForm ? (
        <Button
          onClick={() => setShowReplyForm(true)}
          className="px-6 py-3 text-white rounded-lg bg-dpro-primary hover:bg-dpro-dark"
        >
          Add a new comment on the main thread
        </Button>
      ) : (
        <ReplyForm
          threadId={threadId}
          parentId={null}
          showForm={showReplyForm}
          setShowForm={setShowReplyForm}
        />
      )}
    </div>
  );
}

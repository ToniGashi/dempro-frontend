"use client";

import React, { useCallback, useState } from "react";
import { postReplyToThread } from "@/lib/actions"; // you’ll need to implement this

import { Form } from "@/components/ui/form";
import { FormFieldTextArea } from "@/components/custom-form-fields";
import { toast } from "sonner";

import { AddCommentForm, addCommentSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
type ReplyFormProps = {
  threadId: number;
  parentId: number | null;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReplyForm({
  threadId,
  parentId,
  showForm,
  setShowForm,
}: ReplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddCommentForm>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
    },
  });
  const handleSubmit = useCallback(
    async (values: AddCommentForm) => {
      setIsSubmitting(true);
      try {
        toast.promise(
          (async () => {
            const newReply = await postReplyToThread({
              threadId,
              replyToId: parentId,
              content: values.content,
            });
            if (!newReply.success) {
              throw new Error(newReply.error || "Failed to post reply");
            }
            form.reset();
            setShowForm(false);
          })(),
          {
            loading: "Posting reply...",
            success: "Reply posted!",
            error: (err) => `Failed to post reply: ${err.message}`,
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [threadId, parentId, form, setShowForm]
  );

  return (
    <>
      {showForm && (
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-4 space-y-2"
            >
              <FormFieldTextArea
                name="content"
                form={form}
                placeholder="Write your reply…"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-dpro-primary text-white"
                >
                  {isSubmitting ? "Posting…" : "Post Reply"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

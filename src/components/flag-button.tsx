"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Flag } from "lucide-react";

import { flagThread } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  FormFieldSelect,
  FormFieldTextArea,
} from "@/components/custom-form-fields";
import { FlagThreadForm, flagThreadSchema } from "@/lib/schema";

const REASON_OPTIONS = [
  { value: "Spam or advertising", label: "Spam or advertising" },
  { value: "Harassment or hate speech", label: "Harassment or hate speech" },
  { value: "Inappropriate content", label: "Inappropriate content" },
  { value: "Other", label: "Other" },
];

interface FlagButtonProps {
  threadId: number;
  isFlagged: boolean;
}

export default function FlagButton({ threadId, isFlagged }: FlagButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setDialogOpen] = useState(false);

  const form = useForm<FlagThreadForm>({
    resolver: zodResolver(flagThreadSchema),
    defaultValues: {
      reason: REASON_OPTIONS[0].value,
      note: "",
    },
  });

  const onSubmit = useCallback(
    async (values: FlagThreadForm) => {
      setIsSubmitting(true);
      setDialogOpen(false);
      try {
        toast.promise(
          (async () => {
            const { success } = await flagThread({
              contentId: threadId,
              contentType: "thread",
              reason: values.reason,
              note: values.note,
            });
            if (!success) {
              throw new Error("Failed to flag thread");
            }
            return;
          })(),
          {
            loading: "Flagging thread...",
            success: () => {
              return "Thread flagged successfully";
            },
            error: (err) => `Something went wrong: ${err.message}`,
          }
        );
      } catch (error) {
        console.error("Error flagging thread:", error);
        toast.error("Failed to flag thread. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [threadId]
  );

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center space-x-2 border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600"
          disabled={isFlagged}
        >
          <Flag className="w-4 h-4" />
          <span className="font-medium">
            {isFlagged ? "Flagged" : "Flag Thread"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Report Thread</DialogTitle>
          <DialogDescription className="text-sm">
            Please select a reason and optionally add a note.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormFieldSelect
              options={REASON_OPTIONS}
              name="reason"
              label="Reason"
              form={form}
              onValueChange={(selected) => {
                form.setValue("reason", selected);
              }}
            />
            <FormFieldTextArea
              name="note"
              placeholder="Any additional details..."
              label="Note (optional)"
              form={form}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                disabled={isSubmitting}
                variant="destructive"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

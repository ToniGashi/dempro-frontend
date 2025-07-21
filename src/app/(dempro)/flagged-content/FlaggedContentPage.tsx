"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { dismissFlag, removeContent } from "@/lib/actions";
import { FlaggedItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

export default function FlaggedContentClient({
  items,
}: {
  items: FlaggedItem[];
}) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (item: FlaggedItem) => {
    if (!item) return;
    setIsRemoving(true);
    try {
      toast.promise(
        removeContent({
          contentId: item.contentId,
          contentType: item.contentType,
        }),
        {
          loading: "Removing content...",
          success: "Content removed.",
          error: "Failed to remove content.",
        }
      );
      setRemoveDialogOpen(false);
    } catch (error) {
      console.error("Error removing content:", error);
      toast.error("Failed to remove content. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDismiss = async (
    contentId: number,
    contentType: "thread" | "comment"
  ) => {
    try {
      toast.promise(dismissFlag({ contentId, contentType }), {
        loading: "Dismissing flag...",
        success: "Flag dismissed.",
        error: "Failed to dismiss flag.",
      });
    } catch (error) {
      console.error("Error dismissing flag:", error);
      toast.error("Failed to dismiss flag. Please try again.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-6 py-10">
      {items.map((item) => (
        <div
          key={item.contentId}
          className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          {/* Header */}
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="uppercase text-sm font-semibold text-gray-800">
                {item.contentType}
              </span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                {item.numberOfFlags} flag
                {item.numberOfFlags > 1 ? "s" : ""}
              </span>
            </div>
            <span className="text-sm text-gray-500">ID: {item.contentId}</span>
          </header>

          {/* Reasons & Notes */}
          <div className="mb-4 space-y-1">
            <p className="text-sm">
              <strong>Reasons:</strong> {item.reasons.join(", ")}
            </p>
            {item.notes.length > 0 && (
              <p className="text-sm">
                <strong>Notes:</strong> {item.notes.join("; ")}
              </p>
            )}
          </div>

          {/* Content Preview */}
          {item.contentType === "comment" ? (
            <div className="pl-4 border-l-4 border-sky-200 mb-4">
              <p className="text-sm mb-1">
                <strong>By:</strong> {item.content.createdById}
              </p>
              <p className="text-sm mb-1">{item.content.content}</p>
              <p className="text-xs text-gray-500">
                Replies: {item.content.numberOfReplies} • Likes:{" "}
                {item.content.likes}
              </p>
            </div>
          ) : (
            <div className="pl-4 border-l-4 border-green-200 mb-4">
              <p className="text-sm mb-1">
                <strong>Title:</strong> {item.content.title}
              </p>
              <p className="text-sm mb-1">{item.content.description}</p>
              <p className="text-xs text-gray-500">
                Comments: {item.content.numberOfComments} • Participants:{" "}
                {item.content.numberOfParticipants}
              </p>
            </div>
          )}

          <div className="mt-2 flex space-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setRemoveDialogOpen(true)}
              className="px-1! py-1! text-xs!"
            >
              Remove Content
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleDismiss(item.contentId, item.contentType)}
              className="px-1! py-1! text-xs!"
            >
              Dismiss Flag
            </Button>
          </div>

          <footer className="mt-4 text-xs text-gray-400">
            Created: {new Date(item.content.createdAt).toLocaleString()}
          </footer>

          <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove Content</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to remove the content of{" "}
                <b>{item.content.title}</b>?
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isRemoving}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemove(item)}
                  disabled={isRemoving}
                >
                  {isRemoving ? "Removing…" : "Remove"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}

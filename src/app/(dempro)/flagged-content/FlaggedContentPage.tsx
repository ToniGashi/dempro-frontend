"use client";

import React, { useState } from "react";
import { flagThread } from "@/lib/actions";
import type { FlaggedItem } from "@/lib/types";

export default function FlaggedContentClient({
  items: initialItems,
}: {
  items: FlaggedItem[];
}) {
  const [items, setItems] = useState<FlaggedItem[]>(initialItems);

  const handleRemove = async (id: number) => {
    try {
      // await removeContent(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handleDismiss = async (id: number) => {
    try {
      // await flagThread(id, { status: "Dismissed" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Dismiss failed", err);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-6 py-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <header className="flex justify-between items-center mb-2">
            <span className="font-semibold uppercase text-gray-800">
              {item.contentType}
            </span>
            <span className="text-sm text-gray-500">{item.status}</span>
          </header>

          <div className="mb-2">
            <p className="text-sm">
              <strong>Reason:</strong> {item.reason}
            </p>
            {item.note && (
              <p className="text-sm">
                <strong>Note:</strong> {item.note}
              </p>
            )}
          </div>

          {item.contentType === "comment" ? (
            <div className="pl-4 border-l-4 border-sky-200 mb-4">
              <p className="text-sm mb-1">
                <strong>Commented by:</strong> {item.content.createdById}
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
                <strong>Thread Title:</strong> {item.content.title}
              </p>
              <p className="text-sm mb-1">{item.content.description}</p>
              <p className="text-xs text-gray-500">
                Comments: {item.content.numberOfComments} • Participants:{" "}
                {item.content.numberOfParticipants}
              </p>
            </div>
          )}

          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleRemove(item.id)}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 hover:cursor-pointer"
            >
              Remove Content
            </button>
            <button
              onClick={() => handleDismiss(item.id)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 hover:cursor-pointer"
            >
              Dismiss Flag
            </button>
          </div>

          <footer className="mt-4 text-xs text-gray-400">
            Flagged on {new Date(item.createdAt).toLocaleString()}
            {item.reviewedByEmail && (
              <span> • Reviewed by {item.reviewedByEmail}</span>
            )}
          </footer>
        </div>
      ))}
    </div>
  );
}

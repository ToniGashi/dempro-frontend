"use client";

import { dismissFlag, removeContent } from "@/lib/actions";
import { FlaggedItem } from "@/lib/types";
import React, { useState } from "react";

export default function FlaggedContentClient({
  items: initialItems,
}: {
  items: FlaggedItem[];
}) {
  const [items, setItems] = useState<FlaggedItem[]>(initialItems);

  const handleRemove = async (
    contentId: number,
    contentType: "thread" | "comment"
  ) => {
    await removeContent({ contentId: contentId, contentType: contentType });
    // TODO: call your removeContent API here
    setItems((prev) => prev.filter((item) => item.contentId !== contentId));
  };

  const handleDismiss = async (
    contentId: number,
    contentType: "thread" | "comment"
  ) => {
    await dismissFlag({ contentId: contentId, contentType: contentType });
    // TODO: call your dismissFlag API here
    setItems((prev) => prev.filter((item) => item.contentId !== contentId));
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

          {/* Actions */}
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleRemove(item.contentId, item.contentType)}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 hover:cursor-pointer"
            >
              Remove Content
            </button>
            <button
              onClick={() => handleDismiss(item.contentId, item.contentType)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 hover:cursor-pointer"
            >
              Dismiss Flag
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-4 text-xs text-gray-400">
            {/* using content.createdAt since flaggedAt isn’t provided */}
            Created: {new Date(item.content.createdAt).toLocaleString()}
          </footer>
        </div>
      ))}
    </div>
  );
}

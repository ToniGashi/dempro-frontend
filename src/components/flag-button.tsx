"use client";

import { flagThread } from "@/lib/actions";
import { Flag } from "lucide-react";
import React, { useState } from "react";

interface FlagButtonProps {
  threadId: string;
  isFlagged: boolean;
  setIsFlagged: (flagged: boolean) => void;
}

const REASON_OPTIONS = [
  { value: "Spam or advertising", label: "Spam or advertising" },
  { value: "Harassment or hate speech", label: "Harassment or hate speech" },
  { value: "Inappropriate content", label: "Inappropriate content" },
  { value: "Other", label: "Other" },
];

const FlagButton: React.FC<FlagButtonProps> = ({
  threadId,
  isFlagged,
  setIsFlagged,
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState(REASON_OPTIONS[0].value);
  const [note, setNote] = useState("");

  // Open the modal
  const openModal = () => {
    if (isFlagged || loading) return;
    setShowModal(true);
  };

  // Submit flag
  const submitFlag = async () => {
    setLoading(true);
    try {
      console.log({
        contentId: threadId,
        contentType: "thread",
        reason,
        note,
      });
      const { success } = await flagThread({
        contentId: threadId,
        contentType: "thread",
        reason,
        note,
      });
      if (success) {
        setIsFlagged(true);
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error flagging thread:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={isFlagged || loading}
        className={`
          inline-flex items-center space-x-2
          px-4 py-2
          border border-red-500 text-red-500
          rounded-lg shadow-sm
          transition
          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400
          ${
            !isFlagged && !loading
              ? "hover:bg-red-50 hover:border-red-600 hover:text-red-600 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }
        `}
      >
        <Flag className="w-4 h-4" />
        <span className="font-medium">
          {loading ? "Flagging…" : isFlagged ? "Flagged" : "Flag Thread"}
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Report Thread
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-5">
              {/* Reason */}
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                >
                  {REASON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Note <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Any additional details…"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitFlag}
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50"
                >
                  {loading ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FlagButton;

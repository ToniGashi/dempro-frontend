"use client";

import React, { useCallback, useState } from "react";
import { Check } from "lucide-react";
import { resolveThread } from "@/lib/actions";
import { toast } from "sonner";

interface ResolvedButtonProps {
  threadId: number;
  isResolved: boolean;
}

const ResolvedButton: React.FC<ResolvedButtonProps> = ({
  threadId,
  isResolved,
}) => {
  const [loading, setLoading] = useState(false);

  const handleResolveThread = useCallback(async (id: number) => {
    setLoading(true);
    try {
      toast.promise(
        (async () => {
          const { success } = await resolveThread(id);
          if (!success) {
            throw new Error("Failed to resolve thread");
          }
          return;
        })(),
        {
          loading: "Resolving thread...",
          success: () => {
            return "Thread resolved successfully";
          },
          error: (err) => `Something went wrong: ${err.message}`,
        }
      );
    } catch (error) {
      console.error("Error flagging thread:", error);
      toast.error("Failed to resolve thread. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <button
      onClick={() => handleResolveThread(threadId)}
      disabled={isResolved || loading}
      className={`
        inline-flex items-center space-x-2
        px-4 py-2
        border border-green-500 text-green-500
        rounded-lg shadow-sm
        transition
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400
        ${
          !isResolved && !loading
            ? "hover:bg-green-50 hover:border-green-600 hover:text-green-600 cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }
      `}
    >
      <Check className="w-4 h-4" />
      <span className="font-medium">
        {loading ? "Resolving…" : isResolved ? "Resolved" : "Mark as Resolved"}
      </span>
    </button>
  );
};

export default ResolvedButton;

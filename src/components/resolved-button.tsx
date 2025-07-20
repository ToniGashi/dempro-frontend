import React, { useState } from "react";
import { Check } from "lucide-react";
import { resolveThread } from "@/lib/actions";

interface ResolvedButtonProps {
  threadId: string;
  isResolved: boolean;
  setIsResolved: (resolved: boolean) => void;
}

const ResolvedButton: React.FC<ResolvedButtonProps> = ({
  threadId,
  isResolved,
  setIsResolved,
}) => {
  const [loading, setLoading] = useState(false);

  const handleResolveThread = async (id: string) => {
    if (isResolved || loading) return;

    setLoading(true);
    try {
      await resolveThread(id);
      setIsResolved(true);
      // Optionally show a success toast here
    } catch (err) {
      console.error("Error resolving thread:", err);
      // Optionally show an error toast here
    } finally {
      setLoading(false);
    }
  };

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

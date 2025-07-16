import { flagThread } from "@/lib/actions";
import { Flag } from "lucide-react";
import React, { useState } from "react";

interface FlagButtonProps {
  threadId: string;
  isFlagged: "true" | "false";
  setIsFlagged: (flagged: "true" | "false") => void;
}

const FlagButton: React.FC<FlagButtonProps> = ({
  threadId,
  isFlagged,
  setIsFlagged,
}) => {
  const [loading, setLoading] = useState(false);

  const handleFlagThread = async () => {
    if (isFlagged === "true" || !!loading) return;

    setLoading(true);
    try {
      const { success } = await flagThread({
        contentId: threadId,
        contentType: "post",
        reason: "Problematic content",
        note: "",
      });
      if (success) setIsFlagged("true");
      // Optionally show a toast or other UI feedback here
    } catch (error) {
      console.error("Error flagging thread:", error);
      // Optionally show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleFlagThread()}
      disabled={isFlagged === "true" || loading}
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
  );
};

export default FlagButton;

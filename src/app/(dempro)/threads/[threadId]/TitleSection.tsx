"use client";

import { useState } from "react";
import FlagButton from "@/components/flag-button";
import ResolvedButton from "@/components/resolved-button";

function TitleSection({
  threadId,
  title,
  hasBeenResolved,
  hasBeenFlagged,
}: {
  threadId: string;
  title: string;
  hasBeenResolved: boolean;
  hasBeenFlagged: boolean;
}) {
  const [isResolved, setIsResolved] = useState(hasBeenResolved ?? false);
  const [isFlagged, setIsFlagged] = useState(hasBeenFlagged ?? "false");
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h1>
      <div className="flex space-x-2">
        <FlagButton
          isFlagged={isFlagged}
          setIsFlagged={setIsFlagged}
          threadId={threadId}
        />
        <ResolvedButton
          isResolved={isResolved}
          setIsResolved={setIsResolved}
          threadId={threadId}
        />
      </div>
    </div>
  );
}

export default TitleSection;

"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCustomSWR } from "@/hooks/use-custom-swr";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Thread } from "@/lib/types";

interface SearchThreadsInputProps {
  placeholder?: string;
  className?: string;
}

export default function SearchThreadsInput({
  placeholder = "Search threads",
  className,
}: SearchThreadsInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const swrKey =
    debouncedSearchTerm.trim().length > 0
      ? `threads?keyword=${debouncedSearchTerm.trim()}`
      : null;
  console.log(swrKey, "ss");
  const { data: threads, isLoading, error } = useCustomSWR<Thread[]>(swrKey);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchTerm.trim().length === 0) {
      setDebouncedSearchTerm("");
      return;
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleThreadSelect = (threadId: number) => {
    setIsFocused(false);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    router.push(`/threads/${threadId}`);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const shouldShowDropdown = isFocused && debouncedSearchTerm.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-177">
      <div className="relative">
        <RoundedPrimaryInput
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={className}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dpro-primary/60 pointer-events-none" />
      </div>

      {shouldShowDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-dpro-primary/20 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-dpro-primary/60">
              Searching...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error searching threads
            </div>
          ) : threads && threads.length > 0 ? (
            <div className="divide-y divide-dpro-primary/10">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  className="p-4 hover:bg-dpro-secondary/10 cursor-pointer transition-colors"
                  onClick={() => handleThreadSelect(thread.id)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-dpro-primary line-clamp-1">
                        {thread.title}
                      </h4>
                      <span className="text-xs text-dpro-primary/60 ml-2 whitespace-nowrap">
                        {thread.threadTime}
                      </span>
                    </div>
                    <p className="text-sm text-dpro-primary/70 line-clamp-2">
                      {thread.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-dpro-primary/60">
                      <span className="bg-dpro-secondary/20 px-2 py-1 rounded">
                        {thread.category}
                      </span>
                      <span>
                        {thread.numberOfComments}{" "}
                        {thread.numberOfComments === 1 ? "comment" : "comments"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-dpro-primary/60">
              {`No threads found for "${debouncedSearchTerm}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

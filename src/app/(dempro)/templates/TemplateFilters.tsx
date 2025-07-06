// app/(templates)/TemplatesFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { tags, topics } from "@/components/tagsAndTopics";

export function TemplatesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "all";
  const currentTopic = searchParams.get("topic") ?? "all";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/templates?${params.toString()}`);
  }

  return (
    <div className="flex justify-left gap-4 flex-wrap items-center">
      {/* Tag Filter */}
      <Select
        value={currentTag}
        onValueChange={(val) => updateParam("tag", val)}
        defaultValue="all"
      >
        <SelectTrigger className="rounded-full border border-teal-700 text-teal-700 text-sm min-w-[160px] justify-between">
          <SelectValue placeholder="All content types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All content types</SelectItem>
          {tags.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Topic Filter */}
      <Select
        value={currentTopic}
        onValueChange={(val) => updateParam("topic", val)}
        defaultValue="all"
      >
        <SelectTrigger className="rounded-full border border-teal-700 text-teal-700 text-sm min-w-[160px] justify-between">
          <SelectValue placeholder="All topics" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All topics</SelectItem>
          {topics.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

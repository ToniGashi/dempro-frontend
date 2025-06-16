"use client";

import { useState } from "react";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Button } from "../ui/button";

interface Thread {
  title: string;
  content: string;
  category: string;
}
export default function DiscussionsTab() {
  const [threadFilter, setThreadFilter] = useState("Recent");
  const [newThread, setNewThread] = useState({
    category: "Question",
    title: "",
    content: "",
  });
  const [threads, setThreads] = useState<Thread[]>([
    {
      title: "How did you execute the formative study for this project?",
      content:
        "I'm curious about the methodology used for the formative research phase.",
      category: "Question",
    },
    {
      title: "Best practices for mobile journalism interviews",
      content:
        "What are the key considerations when conducting interviews for mobile journalism pieces?",
      category: "Advice",
    },
    {
      title: "Digital marketing strategies discussion",
      content:
        "Let's discuss the most effective digital marketing approaches for refugee businesses.",
      category: "Discussion",
    },
  ]);
  const handlePostThread = () => {
    if (newThread.title.trim() && newThread.content.trim()) {
      const thread: Thread = {
        title: newThread.title,
        content: newThread.content,
        category: newThread.category,
      };
      setThreads([thread, ...threads]);
      setNewThread({ category: "Question", title: "", content: "" });
    }
  };

  return (
    <div className="space-y-8 max-w-200 mt-16">
      <div>
        <p className="text-4xl font-bold text-dpro-dark-blue mb-6">
          Discussion Board
        </p>
        <div className="mb-8">
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Create a new thread
          </p>
          <div className="mb-4 flex items-center gap-10">
            <label className="text-sm text-dpro-dark-blue font-bold">
              Select Thread Category
            </label>
            <div className="flex gap-4">
              {["Question", "Advice", "Discussion"].map((category) => (
                <Button
                  key={category}
                  onClick={() => setNewThread({ ...newThread, category })}
                  className={`rounded-full py-2! ${
                    newThread.category === category
                      ? "bg-dpro-primary text-white"
                      : "bg-white border-dpro-secondary font-normal text-dpro-primary hover:bg-dpro-primary/80"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <RoundedPrimaryInput
              placeholder="Thread Title"
              name="title"
              value={newThread.title}
              onChange={(e) =>
                setNewThread({ ...newThread, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <RoundedPrimaryInput
              placeholder="What is on your mind?"
              name="content"
              value={newThread.content}
              onChange={(e) =>
                setNewThread({ ...newThread, content: e.target.value })
              }
            />
          </div>
          <Button onClick={handlePostThread} className="rounded-full">
            Post Thread
          </Button>
        </div>
        <div>
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Recent Threads in this project
          </p>

          <div className="flex gap-6 mb-6">
            {["Recent", "Unanswered", "Unresolved", "Solved"].map((filter) => (
              <button
                key={filter}
                onClick={() => setThreadFilter(filter)}
                className={`pt-4 border-b font-medium text-dpro-primary text-xl ${
                  threadFilter === filter
                    ? "border-dpro-primary"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {threads.map((thread, index) => (
              <div
                key={index}
                className="border-2 border-dpro-primary rounded-3xl p-4 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col  gap-2">
                    <span className="font-semibold text-gray-900">
                      {thread.title}
                    </span>
                    <p className="text-gray-600 text-sm">{thread.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { RoundedPrimaryInput } from "@/components/custom-inputs";
import { Button } from "../ui/button";
import FilteredDiscussionsTabContainer from "./filtered-discussions-container";

export interface Thread {
  title: string;
  content: string;
  category: string;
}

//TODO:remove after endpoint integration
const threads: Thread[] = [
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
];

export default function DiscussionsTab() {
  const [newThread, setNewThread] = useState({
    category: "Question",
    title: "",
    content: "",
  });

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
          <Button
            // onClick={handlePostThread}
            className="rounded-full"
          >
            Post Thread
          </Button>
        </div>
        <div>
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Recent Threads in this project
          </p>
          {/* //TODO:remove after endpoint integration */}
          <FilteredDiscussionsTabContainer endpoint="test" threads={threads} />
        </div>
      </div>
    </div>
  );
}

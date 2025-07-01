"use client";

import { useState } from "react";

import ThreadsTab from "@/components/tabs/threads-tab";
import BriefTab from "@/components/tabs/brief-tab";
import { Project } from "@/lib/types";
import MediaTab from "./media-tab";
import TeamTab from "./team-tab";

const tabs = ["Brief", "Threads", "Media", "Team", "Other"];

export default function ProjectTabsContainer({
  project,
  projectBrief,
}: {
  project: Project;
  projectBrief: string;
}) {
  const [activeTab, setActiveTab] = useState("Brief");
  return (
    <div>
      <div className="px-16 pt-16">
        <nav className="flex max-w-min space-x-8 border-t-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pt-4 pb-2 border-b-4 font-bold text-3xl ${
                activeTab === tab
                  ? "border-[#74C7FE]"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="px-16 mt-16">
        {activeTab === "Brief" && (
          <BriefTab
            projectBrief={projectBrief}
            projectId={project.id.toString()}
          />
        )}
        {activeTab === "Threads" && <ThreadsTab projectId={project.id} />}
        {activeTab === "Media" && <MediaTab project={project} />}
        {activeTab === "Team" && <TeamTab team={project.team} />}
        {activeTab === "Other" && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Other</h2>
            <p className="text-gray-600">Other content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

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
      {/* Tab nav */}
      <div className="overflow-x-auto px-4 sm:px-16 pt-6 sm:pt-12">
        <nav className="grid grid-cols-5 border-t-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap
                pb-2 sm:pb-4
                font-bold
                text-base sm:text-2xl
                ${
                  activeTab === tab
                    ? "border-[#74C7FE] text-dpro-primary"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
                }
                border-b-4
                transition-colors
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="px-4 sm:px-16 mt-6 sm:mt-12">
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
          <div className="mb-8 sm:mb-16">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
              Other
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Other content coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

import DiscussionsTab from "@/components/tabs/discussions-tab";
import BriefTab from "@/components/tabs/brief-tab";

const tabs = ["Brief", "Discussions", "Media", "Timeline", "Other"];

export default function TabsContainer() {
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
      <div className="px-16">
        <div>
          {activeTab === "Brief" && <BriefTab />}
          {activeTab === "Discussions" && <DiscussionsTab />}
          {activeTab === "Media" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Media</h2>
              <p className="text-gray-600">Media content coming soon...</p>
            </div>
          )}
          {activeTab === "Timeline" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Timeline
              </h2>
              <p className="text-gray-600">Timeline content coming soon...</p>
            </div>
          )}
          {activeTab === "Other" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Other</h2>
              <p className="text-gray-600">Other content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

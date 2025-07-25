// components/ImpactNumbers.tsx
import React from "react";
import { Users, Globe, CheckCircle2, FileText } from "lucide-react";

const topStats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Members",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    textColor: "text-teal-600",
  },
  {
    icon: Globe,
    value: "85",
    label: "Cities Worldwide",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    textColor: "text-purple-500",
  },
  {
    icon: CheckCircle2,
    value: "200+",
    label: "Policy Changes",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    textColor: "text-green-500",
  },
  {
    icon: FileText,
    value: "1.2M",
    label: "Young Voters Registered",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-800",
    textColor: "text-gray-800",
  },
];

const bottomStats = [
  {
    title: "Youth Engagement",
    value: "400%",
    description:
      "Average 400% increase in civic participation among our program participants",
    badge: "+15% this year",
  },
  {
    title: "Policy Impact",
    value: "200+",
    description:
      "Local policies influenced by DemPro community campaigns and advocacy",
    badge: "+45 this quarter",
  },
  {
    title: "Global Reach",
    value: "23",
    description:
      "Countries where DemPro tools are actively used by young civic leaders",
    badge: "+8 new countries",
  },
];

export default function ImpactNumbers() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Our Impact in Numbers
        </h2>
        <p className="my-6 text-sm sm:text-base text-gray-600">
          The change we’ve created together
        </p>
      </div>

      {/* Top stats */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {topStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center">
              <div
                className={`
                  ${stat.iconBg} ${stat.iconColor} 
                  p-3 rounded-full
                `}
              >
                <Icon className="w-6 h-6 font-bold" />
              </div>
              <span
                className={`${stat.textColor} mt-4 text-2xl sm:text-3xl font-bold`}
              >
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-gray-600">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom stats */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {bottomStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h4 className="text-sm font-medium text-gray-700">{stat.title}</h4>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-bold text-teal-800">
                {stat.value}
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                {stat.badge}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

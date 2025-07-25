// components/TrustedBySection.tsx
import React from "react";
import { Award, Globe } from "lucide-react";

export default function TrustedBySection() {
  const awards = [
    {
      title: "UNESCO Youth Innovation Award",
      description: "For outstanding contribution to civic education · 2024",
    },
    {
      title: "MIT Solve Challenge Winner",
      description: "Democracy & governance category · 2023",
    },
    {
      title: "Ashoka U Changemaker Award",
      description: "Student-led social innovation · 2023",
    },
    {
      title: "Harvard Kennedy School Recognition",
      description: "Excellence in youth engagement · 2022",
    },
  ];

  const partners = [
    "United Nations",
    "UNESCO",
    "Harvard Kennedy School",
    "MIT Media Lab",
    "Ashoka University",
    "European Youth Forum",
    "Democracy Fund",
    "Knight Foundation",
  ];

  return (
    <section className="bg-teal-50 p-16">
      <div className="mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Trusted by Organizations Worldwide
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Partners who share our vision for youth‑powered democracy
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center items-center">
          {/* Recognition & Awards */}
          <div className="flex-1 space-y-6">
            <h3 className="text-lg font-medium text-gray-700">
              Recognition & Awards
            </h3>
            <div className="space-y-4">
              {awards.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-lg shadow p-4 flex items-start"
                >
                  <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-4" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {a.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Partners */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Key Partners
            </h3>
            <div className="grid  grid-cols-2 gap-4">
              {partners.map((p) => (
                <div
                  key={p}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                >
                  <div className="bg-gray-100 rounded-full h-10 w-10 mb-2 flex justify-center items-center">
                    <Globe className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 text-center">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

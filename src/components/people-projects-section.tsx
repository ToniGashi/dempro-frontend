// components/PeopleProjectsSection.tsx
import Image from "next/image";
import React from "react";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
}

const projects: Project[] = [
  {
    title: "Plast — Scouts of Resilience",
    description:
      "A Ukrainian scouting organization in Austria. Plast needed more than likes—they needed recognition. Students created ads and banded stories that highlighted the power of cultural preservation and youth support in diaspora communities.",
    imageSrc: "/people1.png",
  },
  {
    title: "Henna by Sumaya — Art Beyond Borders",
    description:
      "Sumaya, a Somali henna artist, offered beauty inks—her faded language and cultural barriers. Her student team translated her story across four languages and platforms.",
    imageSrc: "/people2.png",
  },
  {
    title: "Diversoviel — Belonging in Action",
    description:
      "Founded by two women, this nonprofit built a space for refugees to learn, cook, sew, and share life. Students led a rebranding, website strategy around consent and privacy.",
    imageSrc: "/people3.png",
  },
  {
    title: "Carl Ludwig Café — Coffee, Culture, Community",
    description:
      "A cozy café with roots in academia and migration. The challenge? Create digital assets that respected a tight schedule and a bustling business. Students delivered a fresh brand voice—without disrupting the flow.",
    imageSrc: "/people4.png",
  },
];

export default function PeopleProjectsSection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-dpro-primary mb-12">
          The People, The Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="bg-white text-center rounded-xl text-dpro-primary shadow-md overflow-hidden flex flex-col"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={proj.imageSrc}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-4">{proj.title}</h3>
                <p className="text-sm flex-1">{proj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

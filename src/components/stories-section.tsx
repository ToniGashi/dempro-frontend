// components/StoriesSection.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Story = {
  id: number;
  title: string;
  description: string;
  category: string;
  badge?: { label: string; color: string };
  author: string;
  readTime: number;
  imageSrc: string;
  href: string;
};

const stories: Story[] = [
  {
    id: 1,
    title: "How 16‑Year‑Old Maya Changed School Lunch Policy",
    description:
      "From food allergies to food justice – one student’s journey to transform cafeteria meals.",
    category: "Youth Leadership",
    badge: { label: "Trending", color: "bg-red-500" },
    author: "Maya Patel",
    readTime: 5,
    imageSrc: "/girl.jpg",
    href: "/stories/maya-school-lunch",
  },
  {
    id: 2,
    title: "The TikTok Generation's Guide to Policy Making",
    description:
      "Viral videos meet legislative process in this guide to modern civic engagement.",
    category: "Digital Democracy",
    badge: { label: "Featured", color: "bg-blue-500" },
    author: "Alex Chen",
    readTime: 7,
    imageSrc: "/team.jpg",
    href: "/stories/tiktok-policy-making",
  },
  {
    id: 3,
    title: "Building Bridges: A Small Town’s Big Victory",
    description:
      "How rural youth organized to bring broadband internet to their community.",
    category: "Community Organizing",
    author: "Jordan Smith",
    readTime: 6,
    imageSrc: "/team2.jpg",
    href: "/stories/small-town-victory",
  },
];

export default function StoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Stories That Inspire Action
        </h2>
        <p className="mt-2 text-gray-600">
          Real stories from real changemakers doing extraordinary things
        </p>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={story.imageSrc}
                alt={story.title}
                layout="fill"
                objectFit="cover"
              />
              {story.badge && (
                <span
                  className={`
                    absolute top-3 left-3 text-xs font-semibold text-white 
                    ${story.badge.color} px-2 py-1 rounded
                  `}
                >
                  {story.badge.label}
                </span>
              )}
            </div>

            <div className="p-6">
              <span className="inline-block text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {story.category}
              </span>

              <h3 className="mt-3 text-lg font-semibold text-gray-900 hover:text-dpro-primary transition">
                <button disabled>{story.title}</button>
              </h3>

              <p className="mt-2 text-gray-600 text-sm">{story.description}</p>

              <div className="mt-4 flex items-center justify-between text-gray-500 text-xs">
                <span>by {story.author}</span>
                <span>{story.readTime} min read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

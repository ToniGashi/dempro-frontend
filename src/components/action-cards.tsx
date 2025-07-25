// components/ActionCards.tsx
import React from "react";

const cards = [
  {
    title: "DIALOGUE",
    description:
      "Join discussions on civic issues and share your voice through Threads.",
  },
  {
    title: "KNOWLEDGE",
    description:
      "Access and contribute open‑source templates for real civic action.",
  },
  {
    title: "COLLABORATE",
    description:
      "Create communities and collaborate on initiatives that matter.",
  },
  {
    title: "IMPACT",
    description: "Explore real‑world projects and learn what drives change.",
  },
];

export default function ActionCards() {
  return (
    <section className="bg-dpro-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="
                bg-white rounded-xl p-6 sm:p-8 
                flex flex-col justify-center text-center
                shadow-[4px_12px_12px_rgba(0,0,0,0.8)]
                hover:shadow-[4px_12px_12px_rgba(0,0,0,0.4)]
                transition-shadow
              "
            >
              <h3 className="text-lg sm:text-3xl font-bold text-dpro-primary mb-2">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-dpro-primary">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import React from "react";

type Card = {
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  illustrationSrc: string;
};

const cards: Card[] = [
  {
    title: "Students and Changemakers in Training",
    subtitle: "The Democracy Awakening Generation",
    quote:
      "“Being able to create something that improves the lives of a community you care about and find a way to support it was something I had not fully understood until I was put in the position to have to develop such projects at my school. Now our platform brings opportunities to those that have no access to.”",
    author: "-Maria Nikolaeva, High School Student, Blagoevgrad",
    illustrationSrc: "/pizza-sharing/cuate.svg",
  },
  {
    title: "Young Activists and Volunteers",
    subtitle: "The Catalyst of Change Collective",
    quote:
      "“I joined the digital storytelling project thinking I’d just learn a few new tools. Instead, our campaign ended up being featured by a local news outlet and actually helped a migrant-owned café triple their foot traffic that month. It made me realize the work we do here doesn’t stay in the ‘student’ bubble - it echoes out.”",
    author: "-Lizz Menishvilli, AUBG Student and Social Activist",
    illustrationSrc: "/visionary-technology/rafiki-1.svg",
  },
  {
    title: "Mentors and Educators",
    subtitle: "The Professional Democratic Architects",
    quote:
      "“We shared our civic education toolkit on the platform expecting a few downloads — instead, we got thoughtful feedback from students, teachers, and designers across three countries. It challenged how we approach accessibility and sparked two new collaborations we wouldn’t have found otherwise.”",
    author: "— Dr. Marin Petrov, Civic Educator & NGO Advisor",
    illustrationSrc: "/social-strategy/pana.svg",
  },
];

function NewGenDemocracy() {
  return (
    <section className="py-16 bg-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dpro-primary">
          The new generation of democracy
        </h2>
        <p className="mt-3 text-base text-gray-600">
          From first‑time voters and young citizens, to seasoned advocates, we
          are building a movement that spans generations, backgrounds, and
          borders.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 space-y-20 w-full">
        {cards.map((c, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={c.title}
              className={`flex flex-col-reverse md:flex-row items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}
            >
              {/* Text */}
              <div className="md:w-1/2 mt-8 md:mt-0 text-center">
                <h3 className="text-2xl font-bold text-dpro-primary">
                  {c.title}
                </h3>
                <h4 className="mt-1 text-lg font-medium text-dpro-primary">
                  {c.subtitle}
                </h4>
                <blockquote className="mt-4 text-md text-dpro-primary leading-relaxed">
                  {c.quote}
                </blockquote>
                <p className="mt-4 text-sm italic text-dpro-primary">
                  {c.author}
                </p>
              </div>

              {/* Illustration */}
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src={c.illustrationSrc}
                  alt={c.title}
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NewGenDemocracy;

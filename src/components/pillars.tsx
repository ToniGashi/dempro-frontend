// components/Pillars.tsx
import Image from "next/image";
import React from "react";

type Pillar = {
  title: string;
  subtitle: string;
  description: string;
  illustrationSrc: string;
};

const pillars: Pillar[] = [
  {
    title: "EDUCATION",
    subtitle: "Democracy cannot thrive without an informed public.",
    description:
      "DemPro offers youth-oriented, non-partisan learning resources that make civic concepts accessible and relevant. Whether through digital content, interactive modules, or community sessions, we aim to equip young people not just with knowledge, but with confidence to use it.",
    illustrationSrc: "/social-biography/bro.svg",
  },
  {
    title: "ACTION",
    subtitle: "Learning must lead to action.",
    description:
      "DemPro provides tools for civic participation: organizing events, starting conversations, joining initiatives, or simply contributing ideas. It is a space where students and young citizens can take part — meaningfully — in shaping their communities.",
    illustrationSrc: "/shared-goals/bro.svg",
  },
  {
    title: "EMPOWERMENT",
    subtitle: "Democracy cannot thrive without an informed public.",
    description:
      "In a region where opportunity is often uneven, access matters. DemPro’s platform is designed to be intuitive, inclusive, and scalable. By combining user-friendly design with civic infrastructure, we offer young people across Eastern Europe a space to connect, collaborate, and lead — no matter where they start.",
    illustrationSrc: "/community/amico.svg",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-16 bg-white">
      {/* Intro */}
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-16">
        <p className="text-lg sm:text-3xl text-dpro-primary font-bold">
          At its foundation, DemPro is guided by three pillars:
        </p>
      </div>

      {/* Pillar rows */}
      <div className="mt-24 space-y-16">
        {pillars.map((p, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={p.title}
              className={`
                flex flex-col items-center 
                ${isEven ? "md:flex-row" : "md:flex-row-reverse"} 
                max-w-7xl mx-auto px-4 sm:px-6 lg:px-16
                gap-8 sm:gap-12 md:gap-16
              `}
            >
              {/* Text */}
              <div
                className={`w-full md:w-1/2 space-y-4 text-center md:text-left ${
                  isEven ? "text-right" : "text-left"
                }`}
              >
                <h3
                  className={`${
                    isEven ? "text-right" : "text-left"
                  } text-2xl sm:text-3xl font-bold text-dpro-primary`}
                >
                  {p.title}
                </h3>
                <h4
                  className={`mt-1 text-lg font-medium text-dpro-primary ${
                    isEven ? "text-right" : "text-left"
                  }`}
                >
                  {p.subtitle}
                </h4>
                <p
                  className={`text-sm sm:text-base text-gray-600 leading-relaxed ${
                    isEven ? "text-right" : "text-left"
                  }`}
                >
                  {p.description}
                </p>
              </div>

              {/* Illustration */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <Image
                    src={p.illustrationSrc}
                    alt={p.title}
                    width={600}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// components/CommitmentSection.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CommitmentSection() {
  return (
    <section className="relative bg-dpro-primary text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col-reverse xl:flex-row items-center gap-8 sm:gap-12 xl:gap-16">
        {/* Text block */}
        <div className="w-full xl:w-1/2 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl lg:text-[42px] font-medium leading-snug">
            Two Women. One Meeting Point.
            <br />A Shared Commitment to Democracy.
          </h2>

          <p className="tracking-wide text-sm sm:text-base xl:text-2xl font-extralight max-w-prose text-white/60 leading-relaxed">
            One brought decades of leadership, the other a fresh perspective and
            a builder’s mindset. What connected them was a simple yet urgent
            question:
          </p>

          <blockquote className="border-l-4 border-white pl-4 italic text-sm sm:text-base xl:text-2xl max-w-prose">
            “How do we stop letting knowledge, effort, and civic responsibility
            be discarded?”
          </blockquote>

          <p className="tracking-wide text-sm sm:text-base xl:text-2xl font-extralight max-w-prose text-white/60 leading-relaxed">
            DemPro began as a humble idea — a space to share what’s often left
            behind — and grew into a platform for collective action, built for a
            time when democracy needs new tools, and people need new ways to
            connect.
          </p>
        </div>

        {/* Single large image */}
        <div className="w-full xl:w-1/2 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm xl:max-w-md overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/two-women.jpg"
              alt="Portrait of two women together"
              width={600}
              height={800}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Down arrow */}
      <Link
        href="#purpose"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>
    </section>
  );
}

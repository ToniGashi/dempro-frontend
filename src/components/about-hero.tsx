import Link from "next/link";
import React from "react";

function AboutHero() {
  return (
    <div className="h-140 flex gap-10 bg-dpro-accent p-16 w-full items-center">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-white sm:text-5xl font-medium">
          We believe democracy is <span className="font-bold">not</span> a
          destination.
        </h2>
        <h2 className="text-3xl sm:text-5xl font-medium underline mt-2 text-white">
          It’s a practice
        </h2>

        <p className="mt-9 text-base sm:text-xl leading-relaxed text-white">
          Born from the belief that every young voice can shape the future,
          DemPro has grown from a simple idea into a global movement
          transforming how the next generation engages with democracy.
        </p>

        <Link
          href="/our-story"
          className="inline-block mt-8 border bg-dpro-primary text-white border-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-white hover:text-blue-700 transition hover:cursor-pointer"
        >
          OUR STORY
        </Link>
      </div>
    </div>
  );
}

export default AboutHero;

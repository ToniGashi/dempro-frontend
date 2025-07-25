// components/SuccessStorySection.tsx
import Image from "next/image";
import React from "react";

export default function SuccessStorySection() {
  return (
    <section className="relative bg-dpro-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + avatar */}
        <div className="relative text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Success Stories – What Happens When the Assignment Is:
            <span className="block font-bold mt-2">
              Help a Stranger Be Understood?
            </span>
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-xl text-white/80">
          {/* Left: text */}
          <div className="space-y-6">
            <p className="italic">
              &ldquo;Some projects change your portfolio. Others change your
              perspective.&rdquo;
            </p>
            <p>
              This wasn’t your average classroom. In summer 2025, twenty
              students from the American University in Bulgaria stepped out of
              theory and into the real world&nbsp;— Vienna’s dynamic culture.
              Tasked with improving the digital presence of five refugee‑ and
              immigrant‑led businesses, these students didn’t just meet clients.
            </p>
            <p className="font-semibold">
              They met communities. Real people. Raw stories.
            </p>
            <p>
              Under the guidance of AUBG Professors{" "}
              <span className="font-bold text-white">Kiril Kirkov</span> and{" "}
              <span className="font-bold text-white">Rossen Petkov</span>,
              hosted by{" "}
              <span className="font-bold text-white">
                EGA Frauen im Zentrum
              </span>
              , the{" "}
              <span className="font-bold text-white">Vienna Summer School</span>{" "}
              was born.
            </p>
            <p>
              A one‑week civic storytelling experiment that turned into
              something much bigger: empathy‑driven marketing,
              community‑centered branding, and digital strategy that felt human.
            </p>
          </div>

          {/* Right: image */}
          <div className="w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/group.jpg"
              alt="Group shot from Vienna Summer School"
              width={700}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

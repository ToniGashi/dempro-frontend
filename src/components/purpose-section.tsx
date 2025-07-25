// components/PurposeSection.tsx
import Image from "next/image";
import React from "react";

export default function PurposeSection() {
  return (
    <section className="py-22 bg-white scroll-mt-[40px]" id="purpose">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-dpro-primary">
          A Platform With Purpose
        </h2>
      </div>

      {/* Main content */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/Group 107.svg"
              alt="Group conversation illustration"
              width={600}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-dpro-primary font-normal ">
          <p className="text-base sm:text-lg leading-relaxed">
            What began as a single conversation quickly revealed a shared
            realization:
          </p>

          <p className="text-base sm:text-lg leading-relaxed">
            In Bulgaria, and across much of the region, the space between people
            and democratic institutions has been growing.
          </p>

          <p className="text-base sm:text-lg leading-relaxed mt-5">
            Trust in governments, NGOs, and civic structures has eroded. Many
            young people feel disconnected from decisions that shape their
            lives. Participation often feels symbolic, not impactful.
          </p>

          <p className="text-base sm:text-lg font-bold my-5 leading-relaxed">
            That realization gave shape to DemPro.
          </p>

          <p className="text-base sm:text-lg leading-relaxed">
            Built at the intersection of education, civic life, and digital
            innovation, DemPro was created to rebuild connection where trust has
            frayed — and to give young people clear, practical ways to
            participate in public life.
          </p>
        </div>
      </div>
    </section>
  );
}

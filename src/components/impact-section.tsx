// components/ImpactSection.tsx
import Image from "next/image";
import React from "react";

export default function ImpactSection() {
  return (
    <section
      className="
       relative 
        bg-[url('/aubg.png')]
        bg-cover
        bg-center
        bg-dpro-primary/60
        text-dpro-gray
        py-16
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Text Content */}
        <div
          className="
          absolute inset-0     /* fill the section */
          bg-dpro-dark-blue/60          /* 50% opacity black */
          z-0                  /* behind the content */
        "
          aria-hidden="true"
        />
        <div className="space-y-6 z-20 leading-loose">
          <h2 className="text-4xl leading-tight font-light text-dpro-light-gray">
            Rooted in <span className="font-bold text-white">Purpose.</span>{" "}
            Built for <span className="font-bold text-white">Impact.</span>
          </h2>
          <p className="text-xl">
            DemPro is more than a platform — it’s the natural evolution of a
            shared mission championed by{" "}
            <strong className="font-bold text-white">
              the American University in Bulgaria (AUBG)
            </strong>{" "}
            and its{" "}
            <strong className="font-bold text-white">
              Center for Information, Democracy, and Citizenship (CIDC)
            </strong>
            .
          </p>
          <p className="text-xl leading-relaxed">
            AUBG has long been a beacon of academic excellence and civic-minded
            leadership in the region. Within it, the CIDC emerged as a vital
            force focused on empowering youth, countering misinformation, and
            fostering democratic values across Bulgaria and Eastern Europe.
            Recognizing the critical role that informed citizens and active
            communities play in sustaining democracy, the CIDC committed to a
            bold vision: to transform civic engagement through technology,
            education, and youth-driven innovation.
          </p>
          <p className="text-xl leading-relaxed">
            This vision gave rise to DemPro – The Democracy Platform. Designed
            to support and scale faculty and student-led initiatives, DemPro was
            born from the very heart of AUBG’s mission — to foster innovation,
            knowledge-sharing, and social responsibility. With support from
            CIDC, the platform aims to close the gap between knowledge and
            action, turning awareness into meaningful participation.
          </p>
        </div>

        {/* Right: Logos */}
        <div className="flex flex-col items-center justify-center space-y-8 z-20">
          <div className="w-96">
            <Image
              src="/AUBG logo long white 1.svg"
              alt="American University in Bulgaria"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <Image
              src="/Asset 4CIDC 1.svg"
              alt="CIDC Logo"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

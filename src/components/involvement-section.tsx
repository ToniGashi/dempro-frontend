// components/GetInvolved.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function InvolvementSection() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account to start your journey.",
    },
    {
      title: "Upload your project",
      description:
        "Add your project to the library and search in between many projects and ideas.",
    },
    {
      title: "Create or join your community",
      description:
        "Create a community to share your work and learn from others in the theme of your interest.",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden py-16 h-full md:h-180 flex justify-center content-center">
      {/* Decorative SVGs (always visible, but smaller on mobile) */}
      <div className="pointer-events-none select-none">
        <Image
          src="/BLOBS/Vector 1.svg"
          alt=""
          aria-hidden="true"
          width={700}
          height={500}
          className="absolute -top-16 -left-16 opacity-30"
        />
        <Image
          src="/BLOBS/Vector 2.svg"
          alt=""
          aria-hidden="true"
          width={700}
          height={200}
          className="absolute top-0 right-0 opacity-30"
        />
        <Image
          src="/BLOBS/Vector 3.svg"
          alt=""
          aria-hidden="true"
          width={700}
          height={300}
          className="absolute bottom-0 left-1/4 opacity-30"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-start md:items-center gap-12 md:gap-24">
        {/* Left column */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dpro-primary">
            Ready to make Democracy work for you?
          </h2>
          <p className="text-base sm:text-lg text-dpro-accent">
            Join <span className="font-medium text-dpro-primary">xxxxxx</span>{" "}
            young changemakers who are already building the future. It takes
            less than 2 minutes to start your democratic journey.
          </p>
          <p className="text-base sm:text-lg font-medium text-dpro-primary">
            Get Involved in 3 easy steps.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
            <Link
              href="/signup"
              className="w-full sm:w-auto text-center bg-dpro-primary text-white px-6 py-3 rounded-lg hover:bg-dpro-primary/90 transition"
            >
              JOIN DEMPRO
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center border-2 border-dpro-primary text-dpro-primary px-6 py-3 rounded-lg hover:bg-dpro-primary/10 transition"
            >
              HAVE ANY QUESTIONS?
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-1/2 space-y-8 flex flex-col gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-dpro-primary text-white rounded-xl flex items-center justify-center font-semibold">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-dpro-primary">
                  {step.title}
                </h3>
                <p className="text-dpro-accent text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

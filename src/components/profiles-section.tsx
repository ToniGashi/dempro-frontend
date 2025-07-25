// components/ProfilesSection.tsx
import Image from "next/image";
import React from "react";

type Profile = {
  name: string;
  role: string;
  imageSrc: string;
  description: string;
};

const profiles: Profile[] = [
  {
    name: "Klea Muka",
    role: "Product Manager & UX/UI Lead",
    imageSrc: "/profiles/klea-muka.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci odio sit amet turpis bibendum. Eget tortor blandit et sagittis, ullamcorper purus.",
  },
  {
    name: "Dr. Narasimha Rao Vajjhalla",
    role: "Principal Investigator",
    imageSrc: "/profiles/narasimha-rao.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci odio sit amet turpis bibendum. Eget tortor blandit et sagittis, ullamcorper purus.",
  },
  {
    name: "Jane Doe",
    role: "etcetc",
    imageSrc: "/profiles/jane-doe.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci odio sit amet turpis bibendum. Eget tortor blandit et sagittis, ullamcorper purus.",
  },
];

export default function ProfilesSection() {
  return (
    <section className="relative bg-white overflow-hidden lg:h-[100vh] flex justify-center items-center">
      {/* Background blobs */}
      <div className="pointer-events-none select-none">
        <Image
          src="/blobs/Vector-2.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute scale-150 top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 opacity-30"
        />
        <Image
          src="/blobs/Vector-2.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute scale-300 rotate-[100deg] -top-40 right-0 w-48 h-48 sm:w-72 sm:h-72 opacity-30"
        />
        <Image
          src="/blobs/Vector-1.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute bottom-0 left-0 w-56 h-56 sm:w-96 sm:h-96 opacity-30"
        />
        <Image
          src="/blobs/Vector.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute scale-y-[-1] flip -bottom-10 -right-20 w-56 h-56 sm:w-96 sm:h-96 opacity-30"
        />
        <Image
          src="/blobs/Vector-4.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute scale-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 opacity-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 m-6">
          {profiles.map((p) => (
            <div
              key={p.name}
              className="relative flex flex-col items-center bg-white/10 bg-opacity-80 xl:h-[80vh] backdrop-blur-sm rounded-2xl pt-4 xl:pt-16 pb-8 px-6 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.1)]"
            >
              {/* Avatar */}
              <div className="transform w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-100">
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>

              {/* Name & role */}
              <h3 className="mt-2 xl:mt-4 text-lg font-semibold text-dpro-primary">
                {p.name}
              </h3>
              <p className="mt-12 xl:mt-24 text-sm text-dpro-primary font-medium">
                {p.role}
              </p>

              {/* Description */}
              <p className="mt-2 xl:mt-4 text-sm text-dpro-primary leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

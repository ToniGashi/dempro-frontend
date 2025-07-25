import Image from "next/image";
import Link from "next/link";
import React from "react";
type Resource = {
  title: string;
  description: string;
  iconSrc: string;
  href?: string;
  buttonText: string;
};

const resources: Resource[] = [
  {
    title: "Open Source Library",
    description:
      "Explore our open‑source templates library, from project proposals and budgets to blog posts and documentation — all ready to fork. Start here to get your next idea to market.",
    iconSrc: "/Illustration - Asset 35.svg", // place your SVGs under public/icons
    href: "/templates",
    buttonText: "Go to Library",
  },
  {
    title: "Project Case Studies",
    description:
      "A transparent archive of initiatives our users have launched: budgets and planning docs, before‑and‑after results, lessons learned, code samples, and more. Read through the success stories.",
    iconSrc: "/Asset 6.svg",
    buttonText: "View Projects",
  },
  {
    title: "Community Hub",
    description:
      "Join a growing network of creators, strategists, and problem‑solvers. Share ideas, get feedback, and collaborate on open‑source projects and solutions. Whether you’re a beginner or a pro, the Hub is your place to connect.",
    iconSrc: "/Illustration - Asset 7.svg",
    buttonText: "Go to Community",
  },
];
function FeaturedResources() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-dpro-primary text-center mb-12">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((res) => (
            <div
              key={res.title}
              className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden text-white"
            >
              {/* Header */}
              <div className="flex h-48 items-center justify-center space-x-4 bg-dpro-secondary px-6 py-5">
                <div className="h-32">
                  <Image
                    src={res.iconSrc}
                    alt={`${res.title} icon`}
                    width={200}
                    height={200}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between h-full bg-dpro-primary">
                {/* Body */}
                <div className="flex flex-col  items-center gap-3 px-6 py-8">
                  <h1 className="text-xl font-medium">{res.title}</h1>
                  <p className="text-base leading-relaxed">{res.description}</p>
                </div>

                {/* Footer / Button */}
                <div className="px-6 pb-6">
                  {res.href ? (
                    <Link
                      href={res.href}
                      className="inline-block w-full text-center py-2 px-4 border border-white transition"
                    >
                      {res.buttonText}
                    </Link>
                  ) : (
                    <button className="inline-block w-full text-center py-2 px-4 border border-white transition">
                      {res.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    // <div className="text-dpro-primary flex flex-col gap-12 p-16">
    //   <h3 className="text-xl text-dpro-primary font-bold">
    //     Featured Resources
    //   </h3>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    //     {projects?.slice(0, 3)?.map((el) => (
    //       <Link key={el.id} href={`/templates/${el.id}`}>
    //         <MainCard title={el.title} description={el.subtitle} />
    //       </Link>
    //     ))}
    //   </div>
    //   <div className="flex justify-center">
    //     <Link href={`/templates`}>
    //       <Button className="max-w-min hover:cursor-pointer">
    //         Discover More
    //       </Button>
    //     </Link>
    //   </div>
    // </div>
  );
}

export default FeaturedResources;

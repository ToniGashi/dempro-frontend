import { getThreadSummary } from "@/lib/actions";
import Link from "next/link";
import React from "react";

async function SummarySection() {
  const { result: summary } = await getThreadSummary();
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="p-6 flex flex-col gap-2 max-h-min text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
        <p className="font-bold text-xl">Important Links</p>
        <Link href="/">Community Guidelines</Link>
        <Link href="/">Community Code of Conduct</Link>
      </div>
      <div className="p-6 flex max-h-min flex-col gap-2 text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
        <p className="font-bold text-xl">Most Popular Topic Categories</p>
        {summary?.mostPopularCategories.map((category, i) => (
          <div key={i} className="font-bold items-center flex gap-2">
            <span>#{i + 1}</span>
            <div
              className="w-12 h-12 bg-[#D9D9D9] rounded-full"
              aria-hidden="true"
            />
            {category}
          </div>
        ))}
      </div>
      <div className="p-6 flex max-h-min flex-col gap-2 text-dpro-primary text-lg border-4 border-dpro-dark-green rounded-2xl">
        <p className="font-bold text-xl">Top Contributors</p>
        {summary?.topContributors.map((contributor, i) => (
          <div key={i} className="font-bold items-center flex gap-2">
            <span>#{i + 1}</span>
            <div
              className="w-12 h-12 bg-[#D9D9D9] rounded-full"
              aria-hidden="true"
            />
            {contributor}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummarySection;

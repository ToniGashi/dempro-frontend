import Link from "next/link";
import { ThreadSummary } from "@/lib/types";

async function SummarySection({ summary }: { summary?: ThreadSummary }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Important Links */}
        <div className="p-4 sm:p-6 flex flex-col gap-2 text-dpro-primary text-base sm:text-lg border-2 sm:border-4 border-dpro-dark-green rounded-2xl">
          <p className="font-bold text-lg sm:text-xl">Important Links</p>
          <Link href="/" className="hover:underline">
            Community Guidelines
          </Link>
          <Link href="/" className="hover:underline">
            Community Code of Conduct
          </Link>
        </div>

        {/* Most Popular Categories */}
        <div className="p-4 sm:p-6 flex flex-col gap-2 text-dpro-primary text-base sm:text-lg border-2 sm:border-4 border-dpro-dark-green rounded-2xl">
          <p className="font-bold text-lg sm:text-xl">
            Most Popular Topic Categories
          </p>
          {summary?.mostPopularCategories.map((category, i) => (
            <div key={i} className="flex items-center gap-2 font-semibold">
              <span className="text-sm sm:text-base">#{i + 1}</span>
              <div
                className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{category}</span>
            </div>
          ))}
        </div>

        {/* Top Contributors */}
        <div className="p-4 sm:p-6 flex flex-col gap-2 text-dpro-primary text-base sm:text-lg border-2 sm:border-4 border-dpro-dark-green rounded-2xl">
          <p className="font-bold text-lg sm:text-xl">Top Contributors</p>
          {summary?.topContributors.map((contributor, i) => (
            <div key={i} className="flex items-center gap-2 font-semibold">
              <span className="text-sm sm:text-base">#{i + 1}</span>
              <div
                className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{contributor}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SummarySection;

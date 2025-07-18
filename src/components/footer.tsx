// components/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { title: "FAQ", href: "/faq" },
  { title: "Learn More", href: "/learn-more" },
  { title: "Our Blog", href: "/blog" },
  { title: "Privacy", href: "/privacy" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
  { title: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-dpro-primary z-30 text-white px-6 py-8 md:px-12 md:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-end gap-8">
        {/* Contact Info */}
        <div className="space-y-4 text-sm">
          <p>Georgi Izmiriliev Square, CIDC</p>
          <p>Blagoevgrad, Bulgaria, 2700</p>
          <div className="border-t border-dpro-light-gray mt-2" />
          <div className="space-y-2 text-dpro-accent">
            <p>
              <span className="font-semibold">Email:</span> aubg@cidc.com
            </p>
            <p>
              <span className="font-semibold">Instagram:</span>{" "}
              @Engage4change_bg
            </p>
            <p>
              <span className="font-semibold">X:</span> @CIDC
            </p>
            <p>
              <span className="font-semibold">Facebook:</span> Engage 4 CIDC
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4 text-sm">
          <p className="font-semibold">Subscribe for email updates</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email here..."
              className="flex-1 bg-transparent border border-dpro-light-gray rounded-l px-3 py-2 placeholder-dpro-gray focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold rounded-r px-4 py-2 hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-dpro-light-gray mt-8 pt-4">
        <p className="text-center text-dpro-accent text-sm">
          &copy; All rights reserved, CIDC,{year ?? ""}
        </p>
      </div>
    </footer>
  );
}

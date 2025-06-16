import Link from "next/link";

const links = [
  { title: "FAQ", href: "/faq" },
  { title: "LEARN MORE", href: "/learn-more" },
  { title: "OUR BLOG", href: "/blog" },
  { title: "PRIVACY", href: "/privacy" },
  { title: "TERMS AND CONDITIONS", href: "/terms-and-conditions" },
  { title: "CONTACT US", href: "/contact-us" },
];
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dpro-dark flex font-roboto text-white items-center px-10 py-12 z-10 flex-col gap-4 mt-16">
      <div className="grid grid-cols-3">
        <div className="flex">
          <div className="flex flex-col gap-4 text-2xl">
            <div>
              <p>Georgi Izmiriliev Square, CIDC</p>
              <p>Blagoevgrad, Bulgaria, 2700</p>
            </div>
            <span className="w-25 h-0.5 bg-[#E0E0E0]" />
            <div className="flex flex-col text-dpro-gray">
              <div>
                <span>Email</span>something@gmail.com
              </div>
              <div>
                <span>Instagram</span>@Engage4change_bg
              </div>
              <div>
                <span>X</span>Engage4Change
              </div>
              <div>
                <span>Facebook</span>Engage 4 Change
              </div>
            </div>
          </div>
          <div className="h-38 w-0.5 bg-dpro-light-gray ml-auto" />
        </div>
        <div className="flex flex-col ml-20 text-white text-[26px] font-medium">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <p className="font-bold text-4xl">
            Subscribe below for e-mail updates:
          </p>
          <form className="flex items-center rounded-md">
            <input
              type="email"
              placeholder="Your email here..."
              className="w-64 border border-white text-white placeholder-white placeholder:text-2xl rounded-l-md py-2 h-12 px-4 leading-tight focus:outline-none focus:ring-1 transition"
            />
            <button
              type="submit"
              className="bg-white text-black font-bold rounded-r-md py-2 px-4 hover:bg-gray-100 text-2xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="w-11 h-[3px] bg-dpro-light-gray" />
      <p className="text-dpro-gray font-medium text-xl">
        &copy; All rights reserved, CIDC, {year}
      </p>
    </footer>
  );
}

import Image from "next/image";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full sm:h-screen sm:items-center sm:justify-center xl:items-start">
      {/* Left side with form */}
      <div className="flex w-full justify-center p-5 sm:px-6 sm:py-10 lg:w-1/2 lg:px-8 lg:py-20">
        <div className="flex w-full max-w-[510px] justify-center">
          {children}
        </div>
      </div>

      {/* Right side image */}
      <div className="relative hidden h-full lg:w-1/2 xl:block">
        <Image
          alt="Login Image"
          src={"/inovation.png"}
          fill
          priority
          quality={90}
          className="object-cover"
        />
      </div>
    </div>
  );
}

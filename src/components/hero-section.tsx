import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function HeroSection({
  title_one,
  title_two,
  buttonText,
  imageSrc,
  imageAlt,
  subtitle,
}: {
  title_one?: string;
  title_two?: string;
  buttonText?: string;
  imageSrc: string;
  imageAlt: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="h-140 flex gap-10 bg-dpro-accent p-16 w-full items-center">
        <div className="flex flex-col gap-6 items-center text-center sm:items-center sm:text-left">
          <div className="space-y-4">
            {title_one && (
              <h1
                className="
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-bold
        text-dpro-primary
        max-w-full
        sm:max-w-[400px]
        md:max-w-[600px]
        lg:max-w-[800px]
        mx-auto sm:mx-0
      "
              >
                {title_one}
              </h1>
            )}
            {title_two && (
              <h1
                className="
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-bold
        text-dpro-primary
        max-w-full
        sm:max-w-[400px]
        md:max-w-[600px]
        lg:max-w-[800px]
        mx-auto sm:mx-0
      "
              >
                {title_two}
              </h1>
            )}
            {subtitle && (
              <p
                className="
        mt-2
        text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-medium
        text-dpro-primary
        max-w-full
        sm:max-w-[350px]
        md:max-w-[550px]
        lg:max-w-[750px]
        mx-auto sm:mx-0
      "
              >
                {subtitle}
              </p>
            )}
          </div>

          {buttonText && (
            <Link href="/about-us" className="w-full sm:w-auto">
              <Button
                className="
        w-full sm:w-auto
        max-w-xs
      "
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </div>

        <Image
          src={imageSrc}
          alt={imageAlt}
          className="hidden md:block"
          width={476}
          height={476}
          priority
        />
      </div>
    </div>
  );
}

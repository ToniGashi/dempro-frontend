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
        <div className="flex flex-col gap-6">
          <div>
            {title_one && (
              <h1 className="text-dpro-primary text-6xl font-bold max-w-140">
                {title_one}
              </h1>
            )}
            {title_two && (
              <h1 className="text-dpro-primary text-6xl font-bold max-w-170">
                {title_two}
              </h1>
            )}
            {subtitle && (
              <h1 className="text-dpro-primary mt-5 text-3xl font-medium max-w-160">
                {subtitle}
              </h1>
            )}
          </div>
          {buttonText && (
            <Link href="/about-us">
              <Button className="max-w-min">{buttonText}</Button>
            </Link>
          )}
        </div>
        <Image src={imageSrc} alt={imageAlt} width={476} height={476} />
      </div>
    </div>
  );
}

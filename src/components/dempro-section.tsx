import Image from "next/image";
import Link from "next/link";

function DemProSection() {
  return (
    <div className="flex xl:gap-16 2xl:gap-36 p-16 items-center">
      <div className="text-dpro-primary flex flex-col gap-6">
        <h3 className="font-bold text-5xl">What is DemPro?</h3>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          DemPro is a dynamic civic and educational platform designed to empower
          individuals and communities to drive meaningful change.{" "}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          When you join DemPro, you will find templates, tools, and learning
          materials to start or scale your project idea, but most importantly
          you will find a community of inquisitive minds eager to change the
          world for the better.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Serving together youth, educators and aspiring leaders, our goal is to
          inspire and equip a culture of active participation and positive
          transformation.
        </p>
        <Link
          className="w-fit text-white border-white bg-dpro-primary font-bold !px-8 !py-4 !rounded-lg cursor-pointer"
          href="#involvement"
        >
          {"How it works"}
        </Link>
      </div>
      <Image
        src="/social-dashboard/bro.svg"
        alt="Inovation image"
        className="hidden 2xl:block"
        width={563}
        height={550}
      />
    </div>
  );
}

export default DemProSection;

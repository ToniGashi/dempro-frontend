import Link from "next/link";
import { ButtonLink } from "./links";

export const MainCard = ({
  title,
  description,
  buttonHref,
  buttonTitle,
}: {
  title: string;
  description: string;
  buttonTitle?: string;
  buttonHref?: string;
}) => {
  return (
    <div className="rounded-2xl flex flex-col text-dpro-primary h-64 border-[2px] border-dpro-primary">
      <div className="h-35 bg-dpro-primary rounded-t-xl" />
      <div className="p-4">
        <p className="font-bold">{title}</p>
        <p className="text-xs line-clamp-3">{description}</p>
        {buttonHref && buttonTitle && (
          <div className="flex justify-center mt-4">
            <Link
              href={buttonHref}
              className="flex text-sm font-bold justify-center bg-dpro-secondary items-center rounded-full py-1 px-3"
            >
              {buttonTitle}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export const SecondaryCard = ({
  title,
  buttonTitle,
  buttonHref,
}: {
  title: string;
  buttonTitle: string;
  buttonHref: string;
}) => {
  return (
    <div className="rounded-xl flex flex-col justify-center h-75 bg-dpro-primary">
      <div className="p-19 flex flex-col gap-10">
        <p className="font-bold text-white text-3xl">{title}</p>
        <ButtonLink title={buttonTitle} variant="secondary" href={buttonHref} />
      </div>
    </div>
  );
};

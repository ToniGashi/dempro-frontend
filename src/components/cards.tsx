import Link from "next/link";
import { ButtonLink } from "./links";
import { Clock, MessageSquare } from "lucide-react";

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
    <div
      className="
        rounded-xl
        bg-dpro-primary
        flex items-center justify-center
        min-h-[200px] sm:min-h-[300px] lg:min-h-[350px]
      "
    >
      <div
        className="
          p-6 sm:p-10
          flex flex-col items-center sm:items-start
          gap-4 sm:gap-6
          text-center sm:text-left
          max-w-md
        "
      >
        <p className="font-bold text-white text-xl sm:text-3xl">{title}</p>
        <ButtonLink title={buttonTitle} variant="secondary" href={buttonHref} />
      </div>
    </div>
  );
};
export const ThreadCard = ({
  title,
  id,
  content,
  nrOfComments,
  lastPosted,
}: {
  title: string;
  id: number;
  content: string;
  nrOfComments: number;
  lastPosted: string;
}) => {
  return (
    <Link
      key={id}
      href={`threads/${id}`}
      className="flex flex-col gap-4 border-2 border-[#050316] rounded-xl p-6"
    >
      <MessageSquare size={28} />
      <div className="text-sm font-bold">{title}</div>
      <div className="text-xs">{content}</div>
      <div className="flex justify-between text-dpro-primary text-xs">
        <div className="flex gap-2 items-center">
          <MessageSquare /> <span>{nrOfComments}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Clock />
          {lastPosted}
        </div>
      </div>
    </Link>
  );
};

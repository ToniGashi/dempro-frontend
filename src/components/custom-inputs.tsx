import { cn } from "@/lib/utils";

export function RoundedPrimaryInput({
  name,
  placeholder,
  disabled,
  value,
  onChange,
  className,
}: {
  name: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
}) {
  return (
    <input
      id={name}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1",
        className
      )}
    />
  );
}

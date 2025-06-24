"use client";

import { useCustomSWR } from "@/hooks/use-custom-swr";
import { Thread } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThreadOptions } from "./ui/skeleton";
import { useRouter } from "next/navigation";

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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  const [internalValue, setInternalValue] = useState(value || "");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { data, isLoading } = useCustomSWR<Thread[]>(
    ["threads", internalValue],
    `threads?keyword=${internalValue}`
  );
  const router = useRouter();
  useEffect(() => {
    setIsDropdownVisible(internalValue.trim().length > 0);
  }, [internalValue]);

  return (
    <div className="relative w-full flex justify-center">
      <div className="flex flex-col w-1/2">
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.(e);
          }}
          className={cn(
            "w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1",
            className
          )}
        />

        {isDropdownVisible && (
          <ul className="w-full z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto flex flex-col gap-2">
            {isLoading ? (
              <ThreadOptions threadCount={5} />
            ) : data?.length === 0 ? (
              <li className="p-3 text-sm text-gray-500">No results found</li>
            ) : (
              data?.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/threads/${item.id}`)}
                  className={cn(
                    "border-2 border-dpro-primary rounded-3xl p-4 hover:shadow-sm transition-shadow cursor-pointer",
                    className
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 bg-[#D9D9D9] rounded-full"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col  gap-2">
                      <span className="font-semibold text-gray-900">
                        {item.title}
                      </span>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

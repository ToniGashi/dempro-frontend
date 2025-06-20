import { Path, UseFormReturn, FieldValues } from "react-hook-form";
import { MultiSelect, OptionType } from "./ui/multi-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface StandardFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T, any, T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  required?: boolean;
}

type FormFieldInputProps<T extends FieldValues> = StandardFormFieldProps<T> & {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export function FormFieldInput<T extends FieldValues>({
  form,
  name,
  label,
  type,
  disabled,
  className,
  onBlur,
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              type={type}
              className={cn(
                "w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1",
                className
              )}
              {...field}
              disabled={disabled}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur();
                if (onBlur) {
                  onBlur(e);
                }
              }}
            />
          </FormControl>
          <FormMessage className="text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
}

type FormFieldMultiSelectProps<T extends FieldValues> =
  StandardFormFieldProps<T> & {
    options: OptionType[];
    onValueChange?: (selected: string[]) => void;
    placeholder?: string;
  };

export function FormFieldMultiSelect<T extends FieldValues>({
  name,
  label,
  form,
  options,
  disabled,
  placeholder,
  onValueChange,
}: FormFieldMultiSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // field.value is an array of OptionType objects
        const selectedOptions = Array.isArray(field.value)
          ? field.value.map((value: any, index: number) => {
              if (
                value &&
                typeof value === "object" &&
                "value" in value &&
                "label" in value
              ) {
                return value;
              }
              // Otherwise, find the matching option
              const option = options.find((opt) => opt.value === String(value));
              return option?.value;
            })
          : [];

        return (
          <FormItem>
            <FormLabel className="text-base">{label}</FormLabel>
            <FormControl>
              <MultiSelect
                options={options}
                defaultValue={selectedOptions}
                placeholder={placeholder}
                maxCount={2}
                disabled={disabled}
                variant="inverted"
                onValueChange={(selected) => {
                  field.onChange(selected);
                  if (onValueChange) {
                    onValueChange(selected);
                  }
                }}
              />
            </FormControl>
            <FormMessage className="text-xs font-semibold" />
          </FormItem>
        );
      }}
    />
  );
}

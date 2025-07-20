import { Path, UseFormReturn, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";
import { MultiSelect, OptionType } from "./ui/multi-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export interface FormFieldSelectProps<T extends FieldValues> {
  form: any; // your React Hook Form instance
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

interface StandardFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T, any, T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

type FormFieldInputProps<T extends FieldValues> = StandardFormFieldProps<T> & {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export function FormFieldInput<T extends FieldValues>({
  form,
  name,
  label,
  type,
  disabled,
  className,
  placeholder,
  onBlur,
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-base">{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={label ?? placeholder}
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
          ? field.value.map((value: any) => {
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
                maxCount={1}
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

export function FormFieldSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  disabled,
  className,
  placeholder,
  onValueChange,
}: FormFieldSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-base w-full">{label}</FormLabel>}
          <FormControl>
            <Select
              disabled={disabled}
              value={field.value}
              onValueChange={(value: string) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
            >
              <SelectTrigger className="w-full text-md py-5 pl-8 pr-7 text-gray-700 bg-white border-dpro-primary border-[2px] rounded-full focus:outline-none focus:ring-1">
                <SelectValue placeholder={placeholder ?? label} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
}

type FormFieldTextAreaProps<T extends FieldValues> =
  StandardFormFieldProps<T> & {
    placeholder: string;
  };

export function FormFieldTextArea<T extends FieldValues>({
  name,
  label,
  form,
  placeholder,
}: FormFieldTextAreaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-2">
          {label && <FormLabel className="text-base w-full">{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="w-full h-25 py-2 pl-8 pr-4 text-gray-700 bg-white border border-dpro-primary border-[2px] focus:outline-none focus:ring-1"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
}

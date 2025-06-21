import { useCallback, useState } from "react";
import { KeyedMutator } from "swr";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThreadCategory, CreateThread, Thread } from "@/lib/types";
import { createProjectThreadSchema } from "@/lib/schema";
import { createProjectThread } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { FormFieldInput } from "./custom-form-fields";
import { DialogClose } from "./ui/dialog";

export default function ThreadForm({
  projectId,
  mutate,
  setOpenDialog,
}: {
  projectId?: number;
  //if we have mutate it means that is used for project thread, else for all threads
  // and is being used inside a modal
  mutate?: KeyedMutator<Thread[]>;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateThread>({
    resolver: zodResolver(createProjectThreadSchema),
    defaultValues: {
      title: "",
      description: "",
      projectId: projectId || null,
      category: "Question",
    },
  });

  const onSubmit = useCallback(async (values: CreateThread) => {
    setIsSubmitting(true);
    setOpenDialog && setOpenDialog(false);
    try {
      toast.promise(
        (async () => {
          const result = await createProjectThread(values);
          if (!result.success) {
            throw new Error(result.error || "Failed to create work order");
          }
          return result;
        })(),
        {
          loading: "Creating thread...",
          success: () => {
            mutate && mutate();
            form.reset();
            return "Thread created successfully";
          },
          error: (err) => `Something went wrong: ${err.message}`,
        }
      );
    } catch (error) {
      console.error("Error creating thread:", error);
      toast.error("Failed to create thread. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 space-y-6"
      >
        <div
          className={cn(
            mutate
              ? "mb-4 flex items-center gap-10"
              : "mb-4 flex flex-col gap-2"
          )}
        >
          <label className="text-sm text-dpro-dark-blue font-bold">
            Select Thread Category
          </label>
          <div className="flex gap-4">
            {(["Question", "Advice", "Discussion"] as ThreadCategory[]).map(
              (category) => (
                <Button
                  key={category}
                  type="button"
                  onClick={() => form.setValue("category", category)}
                  className={`rounded-full py-2! ${
                    form.watch("category") === category
                      ? "bg-dpro-primary text-white"
                      : "bg-white border-dpro-secondary font-normal text-dpro-primary hover:bg-dpro-primary/80"
                  }`}
                >
                  {category}
                </Button>
              )
            )}
          </div>
        </div>
        <div className="mb-4">
          <FormFieldInput name="title" placeholder="Thread Title" form={form} />
        </div>
        <div className="mb-4">
          <FormFieldInput
            name="description"
            placeholder="What is on your mind?"
            form={form}
          />
        </div>
        <div className={cn("flex gap-4", mutate ? "" : "flex justify-end")}>
          {!mutate && (
            <DialogClose asChild>
              <Button variant="ghost" className="rounded-full text-red-600">
                Cancel
              </Button>
            </DialogClose>
          )}
          <Button
            type="submit"
            onClick={(e) => e.stopPropagation()}
            disabled={isSubmitting}
            className="rounded-full"
          >
            Post Thread
          </Button>
        </div>
      </form>
    </Form>
  );
}

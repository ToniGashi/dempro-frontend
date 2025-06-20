"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCustomSWR } from "@/hooks/use-custom-swr";

import { Thread, CreateThread } from "@/lib/types";
import { createProjectThreadSchema } from "@/lib/schema";
import { createProjectThread } from "@/lib/actions";

import FilteredDiscussionsTabContainer from "./filtered-discussions-container";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { ThreadCategory } from "../../lib/types";
import { FormFieldInput } from "../custom-form-fields";

export default function DiscussionsTab({ projectId }: { projectId: number }) {
  const {
    data: projectThreads,
    isLoading,
    mutate,
  } = useCustomSWR<Thread[]>(`threads?projectId=${projectId}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateThread>({
    resolver: zodResolver(createProjectThreadSchema),
    defaultValues: {
      title: "",
      description: "",
      projectId: projectId,
      category: "Question",
    },
  });

  const onSubmit = useCallback(async (values: CreateThread) => {
    setIsSubmitting(true);
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
            mutate();
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
    <div className="space-y-8 max-w-200 mt-16">
      <div>
        <p className="text-4xl font-bold text-dpro-dark-blue mb-6">
          Thread Board
        </p>
        <div className="mb-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6"
            >
              <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
                Create a new thread
              </p>
              <div className="mb-4 flex items-center gap-10">
                <label className="text-sm text-dpro-dark-blue font-bold">
                  Select Thread Category
                </label>
                <div className="flex gap-4">
                  {(
                    ["Question", "Advice", "Discussion"] as ThreadCategory[]
                  ).map((category) => (
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
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <FormFieldInput
                  name="title"
                  placeholder="Thread Title"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <FormFieldInput
                  name="description"
                  placeholder="What is on your mind?"
                  form={form}
                />
              </div>
              <Button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                disabled={isSubmitting}
                className="rounded-full"
              >
                Post Thread
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-[28px] text-dpro-dark-blue font-medium mb-4">
            Recent Threads in this project
          </p>
          <FilteredDiscussionsTabContainer threads={projectThreads} />
        </div>
      </div>
    </div>
  );
}

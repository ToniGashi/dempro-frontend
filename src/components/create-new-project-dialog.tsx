"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createProjectSchema } from "@/lib/schema";
import { createProject } from "@/lib/actions";
import { Project } from "@/lib/types";

import {
  FormFieldInput,
  FormFieldMultiSelect,
} from "@/components/custom-form-fields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

export default function NewProjectDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<Omit<Project, "id">>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      topic: "",
      tags: [],
    },
  });

  const onSubmit = useCallback(
    async (values: Omit<Project, "id">) => {
      setIsSubmitting(true);
      try {
        toast.promise(
          (async () => {
            const result = await createProject(values);
            if (!result.success) {
              throw new Error(result.error || "Failed to create work order");
            }
            return result;
          })(),
          {
            loading: "Creating project...",
            success: (res) => {
              router.push(`/projects/${res.result?.id}`);
              return "Project created successfully";
            },
            error: (err) => `Something went wrong: ${err.message}`,
          }
        );
      } catch (error) {
        console.error("Error creating project:", error);
        toast.error("Failed to create project. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl disabled:pointer-events-none disabled:opacity-50  rounded-4xl bg-dpro-primary text-white max-w-none!">
          Create a New Project
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a new project</DialogTitle>
          <DialogDescription className="text-sm">
            Enter a title and a small description for your new project
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormFieldInput name="title" label="Title" form={form} />
            <FormFieldInput name="subtitle" label="Subtitle" form={form} />
            <FormFieldMultiSelect
              options={[
                { value: "1", label: "test" },
                { value: "2", label: "test2" },
              ]}
              name="tags"
              label="Tags"
              placeholder="Select tags"
              form={form}
              onValueChange={(selected) => {
                form.setValue("tags", selected);
              }}
            />
            <FormFieldInput name="topic" label="Topic" form={form} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                disabled={isSubmitting}
                className="bg-dpro-primary text-white"
              >
                Create project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createProjectSchema } from "@/lib/schema";
import { createProject } from "@/lib/actions";

import {
  FormFieldInput,
  FormFieldMultiSelect,
  FormFieldSelect,
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
import { tags, topics } from "./tagsAndTopics";
import { CreateProject } from "@/lib/types";

export default function NewProjectDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();

  const form = useForm<CreateProject>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      topic: "",
      tags: [],
    },
  });

  const onSubmit = useCallback(
    async (values: CreateProject) => {
      setIsSubmitting(true);
      setOpenDialog(false);
      try {
        toast.promise(
          (async () => {
            const result = await createProject({ ...values });
            if (!result || !("success" in result) || !result.success) {
              throw new Error(
                (result as any)?.error || "Failed to create project"
              );
            }
            return result;
          })(),
          {
            loading: "Creating project...",
            success: async (res) => {
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="lg:w-75 lg:px-10 lg:h-75 md:w-45 md:h-45 w-40 h-40 hover:cursor-pointer hover:bg-dpro-primary/90 font-bold lg:text-3xl md:text-2xl text-xl disabled:pointer-events-none disabled:opacity-50  rounded-4xl bg-dpro-primary text-white max-w-none!">
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
              options={tags}
              name="tags"
              label="Tags"
              placeholder="Select tags"
              form={form}
              onValueChange={(selected) => {
                form.setValue("tags", selected);
              }}
            />
            <FormFieldSelect
              options={topics}
              name="topic"
              label="Topic"
              onValueChange={(selected) => {
                form.setValue("topic", selected);
              }}
              form={form}
            />
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

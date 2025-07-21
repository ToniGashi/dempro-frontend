"use client";

import { useRef, useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import { LICENSE_OPTIONS } from "@/app/common-data";
import { postMediaToProject } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/custom-form-fields";
import { FileUploadForm, fileUploadSchema } from "@/lib/schema";

export default function FileUploadSection({
  projectId,
}: {
  projectId: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FileUploadForm>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: { uploads: [] },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "uploads",
  });

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const newUploads = Array.from(files).map((file) => ({
      file,
      license: "",
    }));
    newUploads.forEach((upload) => append(upload));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeUpload = (id: number) => {
    remove(id);
  };

  const updateLicense = (id: number, license: string) => {
    update(id, { ...fields[id], license });
  };

  const onSubmit = useCallback(
    async (values: FileUploadForm) => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("projectId", projectId);

      values.uploads.forEach(({ file, license }) => {
        formData.append("files", file, file.name);
        formData.append("licenseTypes", license);
      });

      try {
        toast.promise(
          (async () => {
            const newReply = await postMediaToProject(formData);
            if (!newReply.success) {
              throw new Error(newReply.error || "Failed to upload fi;es");
            }
            form.reset();
          })(),
          {
            loading: "Uploading files...",
            success: "Files uploaded successfully!",
            error: (err) => `Failed to upload file: ${err.message}`,
          }
        );
      } finally {
        setIsUploading(false);
      }
    },
    [projectId, form]
  );

  const allHaveLicenses = fields.length > 0 && fields.every((u) => u.license);

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-md bg-white">
      <h3 className="text-md font-medium mb-2">Upload Files</h3>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="default"
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </Button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {fields.length > 0 && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <h4 className="text-sm font-medium mb-2">Ready to upload:</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ul className="space-y-4">
                {fields.map((field, idx) => (
                  <li
                    key={field.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <span className="flex-1 text-sm text-gray-700">
                      {field.file.name}
                    </span>
                    <FormFieldSelect
                      name={`uploads.${idx}.license`}
                      options={LICENSE_OPTIONS.map((opt) => ({
                        value: opt.value,
                        label: opt.value,
                      }))}
                      placeholder="Choose license..."
                      form={form}
                      onValueChange={(val) => updateLicense(idx, val)}
                    />

                    {/* Link to license text */}
                    {field.license && (
                      <a
                        href={`https://creativecommons.org/licenses/${
                          LICENSE_OPTIONS.find(
                            (o) => o.value === field.license
                          )!.urlSuffix
                        }/4.0/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline text-sm"
                      >
                        View License
                      </a>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeUpload(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button
                type="submit"
                disabled={isUploading || !allHaveLicenses}
                className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                  isUploading || !allHaveLicenses
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-dpro-primary text-white hover:opacity-90"
                }`}
              >
                {isUploading ? "Uploading…" : "Upload Selected Files"}
              </Button>
              {!allHaveLicenses && (
                <p className="mt-2 text-xs text-red-500">
                  Please select a license for each file.
                </p>
              )}
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

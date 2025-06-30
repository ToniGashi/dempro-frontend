"use client";

import { Trash2Icon } from "lucide-react";
import React, { useRef, useState } from "react";

interface FileUploadSectionProps {
  projectId: string;
}

export default function FileUploadSection({
  projectId,
}: FileUploadSectionProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    setPendingUploads((prev) => [...prev, ...Array.from(files)]);
    // reset the input so you can re-select the same file if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadFiles = async () => {
    if (pendingUploads.length === 0) return;
    setIsUploading(true);

    const form = new FormData();
    pendingUploads.forEach((file) => form.append("files", file, file.name));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Projects/${projectId}/media`,
        {
          method: "POST",
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imp1YW5kYm1AZ21haWwuY29tIiwibmJmIjoxNzUxMzI1MTE3LCJleHAiOjE3NTE0MTE1MTcsImlhdCI6MTc1MTMyNTExNywiaXNzIjoiRGVtUHJvIn0.mLFUvinOVwrOTc-Ast_fH3jGyRxPRKHH7BuadlRJ0Zo`,
          },
          body: form,
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setPendingUploads([]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-md bg-white">
      <h3 className="text-md font-medium mb-2">Upload Files</h3>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-sky-50 text-sky-700 rounded-md text-sm font-medium hover:bg-sky-100"
        >
          Select Files
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {pendingUploads.length > 0 && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <h4 className="text-sm font-medium mb-2">Ready to upload:</h4>
          <ul className="space-y-1">
            {pendingUploads.map((file, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setPendingUploads((prev) =>
                      prev.filter((_, i) => i !== idx)
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={uploadFiles}
            disabled={isUploading}
            className={`mt-3 px-4 py-2 rounded-md text-sm font-medium ${
              isUploading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-dpro-primary text-white hover:opacity-90"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Selected Files"}
          </button>
        </div>
      )}
    </div>
  );
}

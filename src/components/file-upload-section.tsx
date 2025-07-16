"use client";

import { postMediaToProject } from "@/lib/actions";
import { Trash2Icon } from "lucide-react";
import React, { useRef, useState } from "react";

interface PendingUpload {
  file: File;
  license: string;
}

interface FileUploadSectionProps {
  projectId: string;
}

const LICENSE_OPTIONS: { value: string; label: string; urlSuffix: string }[] = [
  {
    value: "CC BY",
    label:
      "CC BY — Others can distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you.",
    urlSuffix: "by",
  },
  {
    value: "CC BY-SA",
    label:
      "CC BY‑SA — Same as CC BY, but new creations must be licensed under identical terms.",
    urlSuffix: "by-sa",
  },
  {
    value: "CC BY-ND",
    label:
      "CC BY‑ND — Redistribution allowed (commercial and non-commercial), but no modifications; credit required.",
    urlSuffix: "by-nd",
  },
  {
    value: "CC BY-NC",
    label:
      "CC BY‑NC — Others can remix and build upon your work non-commercially; credit required.",
    urlSuffix: "by-nc",
  },
  {
    value: "CC BY-NC-SA",
    label:
      "CC BY‑NC‑SA — Non-commercial; share‑alike (derivatives must use same license); credit required.",
    urlSuffix: "by-nc-sa",
  },
  {
    value: "CC BY-NC-ND",
    label:
      "CC BY‑NC‑ND — Most restrictive: only download & share with attribution; no modifications or commercial use.",
    urlSuffix: "by-nc-nd",
  },
];

export default function FileUploadSection({
  projectId,
}: FileUploadSectionProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const newUploads = Array.from(files).map((file) => ({
      file,
      license: "", // start blank so user must choose
    }));
    setPendingUploads((prev) => [...prev, ...newUploads]);

    // clear the input so same files can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeUpload = (idx: number) => {
    setPendingUploads((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateLicense = (idx: number, license: string) => {
    setPendingUploads((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, license } : item))
    );
  };

  const uploadFiles = async () => {
    if (pendingUploads.length === 0 || pendingUploads.some((u) => !u.license))
      return;

    setIsUploading(true);
    const form = new FormData();
    form.append("projectId", projectId);

    pendingUploads.forEach(({ file, license }, idx) => {
      // append file
      form.append("files", file, file.name);

      // append license metadata in parallel arrays
      form.append("licenseTypes[]", license);
      const urlSuffix = LICENSE_OPTIONS.find(
        (opt) => opt.value === license
      )!.urlSuffix;
      form.append(
        "licenseUrls[]",
        `https://creativecommons.org/licenses/${urlSuffix}/4.0/`
      );
    });

    try {
      await postMediaToProject(form);
      setPendingUploads([]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const allHaveLicenses = pendingUploads.every((u) => u.license);

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
          <ul className="space-y-4">
            {pendingUploads.map(({ file, license }, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between space-x-4"
              >
                <span className="flex-1 text-sm text-gray-700">
                  {file.name}
                </span>

                {/* License dropdown */}
                <select
                  value={license}
                  onChange={(e) => updateLicense(idx, e.target.value)}
                  className="flex-1 border border-gray-300 rounded p-1 text-sm"
                >
                  <option value="" disabled>
                    Choose license…
                  </option>
                  {LICENSE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.value}
                    </option>
                  ))}
                </select>

                {/* Link to license text */}
                {license && (
                  <a
                    href={`https://creativecommons.org/licenses/${
                      LICENSE_OPTIONS.find((o) => o.value === license)!
                        .urlSuffix
                    }/4.0/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline text-sm"
                  >
                    View License
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => removeUpload(idx)}
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
            disabled={isUploading || !allHaveLicenses}
            className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
              isUploading || !allHaveLicenses
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-dpro-primary text-white hover:opacity-90"
            }`}
          >
            {isUploading ? "Uploading…" : "Upload Selected Files"}
          </button>

          {!allHaveLicenses && (
            <p className="mt-2 text-xs text-red-500">
              Please select a license for each file.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

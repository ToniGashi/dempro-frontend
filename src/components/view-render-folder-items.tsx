"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  ChevronDownIcon,
  FolderIcon,
  PlayIcon,
  XIcon,
  Trash2Icon,
} from "lucide-react";

import { FileNode, DeleteMediaInput, UserProfile } from "@/lib/types";
import { deleteMediaFromProject } from "@/lib/actions";
import { cn } from "@/lib/utils";
import LicenseChips from "./license-type-chip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ViewRenderFolderItemsProps {
  projectId: string;
  items: FileNode[];
  isFromProjectMedia?: boolean;
  user: UserProfile | null;
}

export default function ViewRenderFolderItems({
  projectId,
  items,
  isFromProjectMedia = false,
  user = null,
}: ViewRenderFolderItemsProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [fileToRemove, setFileToRemove] = useState<FileNode | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Fetch and parse CSV when selected
  useEffect(() => {
    if (!selectedFile?.url?.match(/\.csv$/i)) {
      setCsvData(null);
      setCsvError(null);
      return;
    }

    let cancelled = false;
    async function loadCsv() {
      setCsvData(null);
      setCsvError(null);
      try {
        if (!selectedFile?.url) throw new Error("No file URL provided");
        const res = await fetch(selectedFile.url);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const text = await res.text();
        if (cancelled) return;
        const rows = text
          .trim()
          .split("\n")
          .map((line) => line.split(","));
        setCsvData(rows);
      } catch (err: any) {
        console.error("Failed to load CSV:", err);
        if (!cancelled) setCsvError(err.message || "Unknown error");
      }
    }

    loadCsv();
    return () => {
      cancelled = true;
    };
  }, [selectedFile]);

  const toggleFolder = (id: string) =>
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));

  const closeModal = () => {
    setSelectedFile(null);
    setCsvData(null);
    setCsvError(null);
  };

  const hasPermissionToRemove = isFromProjectMedia;

  const openRemoveDialog = (file: FileNode) => {
    setFileToRemove(file);
    setRemoveDialogOpen(true);
  };

  const handleFileRemove = useCallback(async () => {
    if (!fileToRemove) return;
    setIsRemoving(true);
    try {
      toast.promise(
        (async () => {
          const input: DeleteMediaInput = {
            projectId,
            mediaId: fileToRemove.id,
          };
          const { success } = await deleteMediaFromProject(input);
          if (!success) throw new Error("Failed to delete media");
        })(),
        {
          loading: "Removing file...",
          success: "File removed.",
          error: "Failed to remove file.",
        }
      );
      setRemoveDialogOpen(false);
      setFileToRemove(null);
    } finally {
      setIsRemoving(false);
    }
  }, [fileToRemove, projectId]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4">
        {items.map((item) => {
          const isFolder = item.folder;
          const isOpen = !!openFolders[item.id];

          return (
            <li
              key={item.id}
              className="border border-dpro-primary rounded-md overflow-hidden bg-white"
            >
              <div
                onClick={() => isFolder && toggleFolder(item.id)}
                className="
                  flex items-center justify-between
                  px-4 sm:px-6 py-3 sm:py-4
                  cursor-pointer hover:bg-sky-50
                "
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <FolderIcon className="text-dpro-primary text-lg sm:text-xl" />
                  <span className="text-base sm:text-lg font-medium text-gray-800 truncate">
                    {item.name[0].toUpperCase() + item.name.slice(1)}
                  </span>
                </div>
                {isFolder && (
                  <ChevronDownIcon
                    className={`text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                )}
              </div>

              {isFolder && isOpen && (
                <div className="bg-gray-50 px-4 sm:px-12 py-2">
                  {item.children.length > 0 ? (
                    <ul className="space-y-2">
                      {item.children.map((child, index) => (
                        <li
                          key={`${item.id}-${child.id}`}
                          className={cn(
                            "flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 sm:py-3 px-2 sm:px-4",
                            index + 1 < item.children.length &&
                              "border-b border-gray-200"
                          )}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                            <PlayIcon className="text-gray-500 w-5 h-5" />
                            <span className="text-sm sm:text-base text-gray-700 truncate">
                              {child.name}{" "}
                              <LicenseChips license={child.licenseType} />
                            </span>
                          </div>
                          {user && (
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
                              <button
                                onClick={() => setSelectedFile(child)}
                                className="text-dpro-primary hover:underline px-1"
                              >
                                Preview
                              </button>
                              <a
                                href={child.url ?? ""}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dpro-primary hover:underline px-1"
                              >
                                Download
                              </a>
                              {hasPermissionToRemove && (
                                <button
                                  type="button"
                                  onClick={() => openRemoveDialog(child)}
                                  className="flex items-center gap-1 text-red-500 hover:text-red-700 px-1 hover:cursor-pointer"
                                >
                                  <Trash2Icon className="w-4 h-4" />
                                  Remove
                                </button>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No files available</p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Remove Confirmation Dialog */}
      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove file</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to remove{" "}
            <span className="font-semibold">{fileToRemove?.name}</span> from
            this project?
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button" disabled={isRemoving}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleFileRemove}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing…" : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-lg overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 truncate">
              {selectedFile.name}
            </h2>
            {selectedFile.url?.match(/\.(mp4|webm)$/i) ? (
              <video controls className="w-full rounded max-h-[60vh]">
                <source src={selectedFile.url} />
                Your browser does not support the video tag.
              </video>
            ) : selectedFile.url?.match(/\.(mp3|wav|ogg|aac)$/i) ? (
              <audio controls className="w-full rounded max-h-[60vh]">
                <source src={selectedFile.url} />
                Your browser does not support the audio element.
              </audio>
            ) : selectedFile.url?.match(/\.(png|jpe?g|webp|gif)$/i) ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-full object-contain rounded max-h-[60vh]"
              />
            ) : selectedFile.url?.match(/\.(docx?|xlsx?|pptx?)$/i) ? (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  selectedFile.url
                )}`}
                className="w-full h-[60vh] rounded"
                frameBorder="0"
              />
            ) : selectedFile.url?.match(/\.pdf$/i) ? (
              <iframe
                src={selectedFile.url}
                className="w-full h-[60vh] rounded"
                frameBorder="0"
              />
            ) : selectedFile.url?.match(/\.csv$/i) ? (
              csvError ? (
                <div className="text-red-600">
                  Failed to load CSV: {csvError}
                  <div>
                    <a
                      href={selectedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline mt-2 block"
                    >
                      Download CSV
                    </a>
                  </div>
                </div>
              ) : csvData ? (
                <table className="w-full table-auto border-collapse">
                  <tbody>
                    {csvData.map((row, i) => (
                      <tr key={i} className="even:bg-gray-100">
                        {row.map((cell, j) => (
                          <td key={j} className="border px-2 py-1 text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Loading CSV...</p>
              )
            ) : (
              <iframe
                src={selectedFile.url ?? ""}
                className="w-full h-[60vh] rounded"
                frameBorder="0"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

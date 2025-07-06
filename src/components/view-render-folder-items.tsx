"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronDownIcon,
  FolderIcon,
  PlayIcon,
  XIcon,
  Trash2Icon,
} from "lucide-react";
import { FileNode, DeleteMediaInput } from "@/lib/types";
import { deleteMediaFromProject } from "@/lib/actions";

interface ViewRenderFolderItemsProps {
  projectId: string;
  items: FileNode[];
  isFromProjectMedia?: boolean;
}

export default function ViewRenderFolderItems({
  projectId,
  items,
  isFromProjectMedia = false,
}: ViewRenderFolderItemsProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [folderItems, setFolderItems] = useState<FileNode[]>(items || []);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  useEffect(() => {
    setFolderItems(items);
  }, [items]);

  const toggleFolder = (id: string) =>
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));

  const closeModal = () => setSelectedFile(null);

  const hasPermissionToRemove = isFromProjectMedia;

  const handleRemove = useCallback(
    async (file: FileNode) => {
      if (!confirm(`Remove “${file.name}” from this project?`)) return;
      try {
        const input: DeleteMediaInput = { projectId, mediaId: file.id };
        const { success } = await deleteMediaFromProject(input);
        if (success) {
          setFolderItems((folders) =>
            folders.map((f) =>
              f.folder
                ? {
                    ...f,
                    children: f.children.filter((c) => c.id !== file.id),
                  }
                : f
            )
          );
        }
      } catch (err) {
        console.error("Failed to delete media:", err);
      }
    },
    [projectId]
  );

  return (
    <>
      <ul className="grid grid-cols-1 gap-4">
        {folderItems.map((item) => {
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
                    className={`
                      text-gray-500 transition-transform
                      ${isOpen ? "rotate-180" : ""}
                    `}
                    size={20}
                  />
                )}
              </div>

              {isFolder && isOpen && (
                <div className="bg-gray-50 px-4 sm:px-12 py-2">
                  {item.children.length > 0 ? (
                    <ul className="space-y-2">
                      {item.children.map((child) => (
                        <li
                          key={`${item.id}-${child.id}`}
                          className="
                            flex flex-col sm:flex-row sm:justify-between
                            items-start sm:items-center
                            py-2 sm:py-3 px-2 sm:px-4
                            border-b border-gray-200
                          "
                        >
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                            <PlayIcon className="text-gray-500 w-5 h-5" />
                            <span className="text-sm sm:text-base text-gray-700 truncate">
                              {child.name}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base">
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
                                onClick={() => handleRemove(child)}
                                className="flex items-center gap-1 text-red-500 hover:text-red-700 px-1 hover:cursor-pointer"
                              >
                                <Trash2Icon className="w-4 h-4" />
                                Remove
                              </button>
                            )}
                          </div>
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

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 truncate">
              {selectedFile.name}
            </h2>
            {selectedFile.url?.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls className="w-full rounded max-h-[60vh]">
                <source src={selectedFile.url} />
                Your browser does not support the video tag.
              </video>
            ) : selectedFile.url?.match(/\.(png|jpe?g|webp|gif)$/i) ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-full object-contain rounded max-h-[60vh]"
              />
            ) : (
              <iframe
                src={selectedFile.url ?? ""}
                className="w-full h-[60vh] rounded"
                allow="autoplay"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

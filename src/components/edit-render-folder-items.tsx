"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDownIcon,
  FolderIcon,
  PlayIcon,
  XIcon,
  Trash2Icon,
} from "lucide-react";

interface Child {
  id: string;
  url: string;
  name: string;
}

interface ItemType {
  id: string;
  folder: boolean;
  name: string;
  children: Child[];
}

export default function RenderFolderItems({
  items,
  projectId,
}: {
  items: ItemType[];
  projectId: number;
}) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<Child | null>(null);
  const [folderItems, setFolderItems] = useState<ItemType[]>(items);
  const [pendingUploads, setPendingUploads] = useState<Record<string, File[]>>(
    {}
  );

  useEffect(() => {
    setFolderItems(items);
  }, [items]);

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeModal = () => setSelectedFile(null);

  const deleteHandler = useCallback(
    async (folderId: string, childId: string) => {
      try {
        const res = await fetch(
          `/api/media?file=${encodeURIComponent(childId)}&id=${projectId}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Delete failed");
        setFolderItems((prev) =>
          prev.map((f) =>
            f.id === folderId
              ? { ...f, children: f.children.filter((c) => c.id !== childId) }
              : f
          )
        );
      } catch (err) {
        console.error(err);
      }
    },
    [projectId]
  );

  const uploadFiles = async (folderId: string, files: File[]) => {
    if (files.length === 0) return;
    const form = new FormData();
    files.forEach((file) => form.append("files", file, file.name));

    try {
      const res = await fetch(
        `/api/media/upload?id=${projectId}&folder=${encodeURIComponent(
          folderId
        )}`,
        { method: "POST", body: form }
      );
      if (!res.ok) throw new Error(await res.text());
      // Map returned name/url to include folder in ID
      const uploadedRaw = (await res.json()) as { name: string; url: string }[];
      const newChildren: Child[] = uploadedRaw.map((u) => ({
        id: `${folderId}/${u.name}`,
        name: u.name,
        url: u.url,
      }));
      setFolderItems((prev) =>
        prev.map((it) =>
          it.id === folderId
            ? { ...it, children: [...it.children, ...newChildren] }
            : it
        )
      );
      setPendingUploads((prev) => ({ ...prev, [folderId]: [] }));
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <>
      <ul className="space-y-2">
        {folderItems.map((item) => {
          const isOpen = openFolders[item.id];
          const fileInputRef = useRef<HTMLInputElement>(null);
          const queue = pendingUploads[item.id] || [];

          return (
            <li
              key={item.id}
              className="border border-dpro-primary rounded-md overflow-hidden"
            >
              <div
                onClick={() => toggleFolder(item.id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50"
              >
                <div className="flex items-center gap-3">
                  <FolderIcon className="text-dpro-primary text-lg" />
                  <span className="text-md font-medium text-gray-800">
                    {item.name[0].toUpperCase() + item.name.substring(1)}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  } text-gray-500`}
                />
              </div>

              {isOpen && (
                <div className="bg-white px-12 py-2">
                  <div className="mb-4 flex items-center gap-3">
                    <button
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
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const arr = Array.from(files);
                        setPendingUploads((prev) => ({
                          ...prev,
                          [item.id]: [...(prev[item.id] || []), ...arr],
                        }));
                        e.target.value = "";
                      }}
                    />
                  </div>

                  {queue.length > 0 && (
                    <div className="mb-4 p-4 border border-gray-200 rounded">
                      <h3 className="text-sm font-medium mb-2">
                        Ready to upload:
                      </h3>
                      <ul className="space-y-1">
                        {queue.map((file, idx) => (
                          <li
                            key={`${item.id}-${file.name}-${idx}`}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-700">
                              {file.name}
                            </span>
                            <button
                              onClick={() =>
                                setPendingUploads((prev) => ({
                                  ...prev,
                                  [item.id]: prev[item.id].filter(
                                    (_, i) => i !== idx
                                  ),
                                }))
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => uploadFiles(item.id, queue)}
                        className="mt-3 px-4 py-2 bg-dpro-primary text-white rounded-md text-sm font-medium hover:opacity-90"
                      >
                        Upload Selected Files
                      </button>
                    </div>
                  )}

                  {item.children.length > 0 ? (
                    <ul className="space-y-2">
                      {item.children.map((child) => (
                        <li
                          key={`${item.id}-${child.id}`}
                          className="flex items-center justify-between py-3 border-b border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <PlayIcon className="text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {child.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setSelectedFile(child)}
                              className="text-sm text-dpro-primary hover:underline hover:cursor-pointer"
                            >
                              Preview
                            </button>
                            <a
                              href={child.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-dpro-primary hover:underline"
                            >
                              Download
                            </a>
                            <button
                              onClick={() => deleteHandler(item.id, child.id)}
                              className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:cursor-pointer"
                            >
                              <Trash2Icon className="w-4 h-4" /> Remove
                            </button>
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

      {selectedFile && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold mb-4">{selectedFile.name}</h2>
            {selectedFile.url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls className="w-full rounded max-h-[70vh]">
                <source src={selectedFile.url} />
                Your browser does not support the video tag.
              </video>
            ) : selectedFile.url.match(/\.(png|jpe?g|webp|gif)$/i) ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-auto max-w-full max-h-[70vh] mx-auto rounded object-contain"
              />
            ) : (
              <iframe
                src={selectedFile.url}
                className="w-full h-[70vh] rounded"
                allow="autoplay"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

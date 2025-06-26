"use client";

import {
  ChevronDownIcon,
  FolderIcon,
  PlayIcon,
  ThumbsUpIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  depth = 0,
}: {
  items: ItemType[];
  depth?: number;
}) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<Child | null>(null);

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeModal = () => setSelectedFile(null);

  return (
    <>
      <ul className="space-y-2">
        {items.map((item) => {
          const isFolder = item.folder;

          return (
            <li
              key={item.id}
              className="border border-dpro-primary rounded-md overflow-hidden"
            >
              <div
                onClick={() => isFolder && toggleFolder(item.id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50"
              >
                <div className="flex items-center gap-3">
                  <FolderIcon className="text-dpro-primary text-lg" />
                  <span className="text-md font-medium text-gray-800">
                    {item.name[0].toUpperCase() + item.name.substring(1)}
                  </span>
                </div>
                {isFolder && (
                  <ChevronDownIcon
                    className={`transition-transform ${
                      openFolders[item.id] ? "rotate-180" : ""
                    } text-gray-500`}
                  />
                )}
              </div>

              {isFolder && openFolders[item.id] && (
                <div className="bg-white px-12 py-2">
                  {item.children.length > 0 ? (
                    <ul className="space-y-2">
                      {item.children.map((child: Child) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between py-3 border-b border-gray-200"
                        >
                          {/* Left: Icon + Name */}
                          <div className="flex items-center gap-3">
                            <PlayIcon className="text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {child.name}
                            </span>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-6">
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
                          </div>
                        </div>
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

      {/* 🪟 Preview Modal */}
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

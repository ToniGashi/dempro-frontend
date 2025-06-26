"use client";

import React, { useEffect, useState } from "react";
import { FolderType } from "@/lib/types";
import MediaTabWithUpload from "../edit-render-folder-items";
import RenderFolderItems from "../edit-render-folder-items";

export default function MediaTab({
  projectId,
  projectTitle,
}: {
  projectId: number;
  projectTitle: string;
}) {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: { folders: FolderType[] }) => {
        setFolders(data.folders);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load media.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-8 text-gray-500">Loading media…</p>;
  }
  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

  return <RenderFolderItems items={folders} />;
}

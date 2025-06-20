"use server";

import { revalidateTag } from "next/cache";
import { createApiOperation, createReadOperation } from "./api-helpers";
import { Project } from "./types";

// =============================================
// Project Operations
// =============================================

export const getProjects = createReadOperation<string, Project[]>({
  url: (id) => `projects?Page=1&PageSize=6`,
  tags: ["projects"],
});

export const getProject = createReadOperation<string, Project>({
  url: (id) => `projects/${id}`,
  tags: ["project"],
});

export const getProjectBrief = createReadOperation<string, string>({
  url: (id) => `projects/${id}/brief`,
  tags: ["project"],
  expectHtml: true,
});

export const createProject = createApiOperation<Omit<Project, "id">, Project>({
  url: "projects",
  method: "POST",
  tags: ["projects"],
});

export const createProjectBrief = createApiOperation<
  { id: string; content: string },
  string
>({
  url: ({ id }) => `projects/${id}/brief`,
  method: "PUT",
  tags: ["project"],
  transform: ({ content }) => content,
  sendRawContent: true, // Add this flag
});

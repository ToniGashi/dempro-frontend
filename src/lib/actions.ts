"use server";

import { createApiOperation, createReadOperation } from "./api-helpers";
import { CreateThread, Project, Thread, ThreadSummary } from "./types";

// =============================================
// Project Operations
// =============================================

export const getProjects = createReadOperation<string, Project[]>({
  url: () => `projects?Page=1&PageSize=6`,
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

// =============================================
// Thread Operations
// =============================================

export const createProjectThread = createApiOperation<CreateThread, Thread>({
  url: "threads",
  method: "POST",
  tags: ["threads"],
});

export const getThreads = createReadOperation<string, Thread[]>({
  url: () => `threads`,
  tags: ["threads"],
});

export const getThreadSummary = createReadOperation<string, ThreadSummary>({
  url: () => `threads/summary`,
  tags: ["threadSummary"],
});

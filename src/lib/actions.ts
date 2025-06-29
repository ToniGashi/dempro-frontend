"use server";

import { createApiOperation, createReadOperation } from "./api-helpers";
import {
  Comment,
  CreateThread,
  LikeComment,
  PostComment,
  Project,
  Thread,
  ThreadSummary,
} from "./types";

// =============================================
// Project Operations
// =============================================

export const getProjects = createReadOperation<string, Project[]>({
  url: (tag = "", topic = "") =>
    `projects?Page=1&PageSize=6&topic=${topic}&tag=${tag}`,
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

export const getThread = createReadOperation<string, Thread>({
  url: (id) => `threads/${id}`,
  tags: ["thread"],
});

export const getCommentsFromThreadId = createReadOperation<string, Comment[]>({
  url: (id) => `comments/thread?threadId=${id}&page=1&pageSize=10`,
  cache: "no-store",
  tags: ["commentsFromThread"],
});

export const getCommentById = createReadOperation<string, Comment>({
  url: (id) => `comments/${id}`,
  cache: "no-store",
  tags: ["commentById"],
});

export const likeComment = createApiOperation<string, LikeComment>({
  url: (id) => `comments/${id}/like`,
  method: "PATCH",
  tags: ["comLike"],
});
export const dislikeComment = createApiOperation<string, LikeComment>({
  url: (id) => `comments/${id}/unlike`,
  method: "PATCH",
  tags: ["unLike"],
});

export const postReplyToThread = createApiOperation<PostComment, Comment>({
  url: () => `/comments`,
  method: "POST",
  tags: ["comments"],
});

"use server";

import { createApiOperation, createReadOperation } from "./api-helpers";
import {
  Comment,
  CreateProject,
  CreateThread,
  DeleteMediaInput,
  FileNode,
  InviteUser,
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
export const createProjectBrief = createApiOperation<
  { id: string; content: string },
  string
>({
  url: ({ id }) => `projects/${id}/brief`,
  method: "PUT",
  tags: ["project"],
  transform: ({ content }) => content,
  sendRawContent: true,
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
});
export const dislikeComment = createApiOperation<string, LikeComment>({
  url: (id) => `comments/${id}/unlike`,
  method: "PATCH",
});

export const postReplyToThread = createApiOperation<PostComment, Comment>({
  url: () => `comments`,
  method: "POST",
});

export const createProject = createApiOperation<CreateProject, Project>({
  url: () => `projects`,
  method: "POST",
});

export const postMediaToProject = createApiOperation<FormData, FileNode>({
  url: (form) => {
    const projectId = form.get("projectId");
    if (typeof projectId !== "string") {
      throw new Error("projectId must be appended to the FormData");
    }
    return `projects/${projectId}/media`;
  },
  method: "POST",
});

export const deleteMediaFromProject = createApiOperation<
  DeleteMediaInput,
  Project
>({
  url: ({ projectId, mediaId }) => {
    return `projects/${projectId}/media/${mediaId}`;
  },
  method: "DELETE",
});

export const updateRole = createApiOperation<InviteUser, any>({
  url: () => `ProjectTeams/invite`,
  method: "POST",
});

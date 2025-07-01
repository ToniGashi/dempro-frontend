export interface Project {
  id: number;
  title: string;
  tags: string[];
  media: FileNode[];
  topic: string;
  subtitle: string;
}

export type FileNode = {
  id: string;
  name: string;
  folder: boolean;
  url: string | null;
  children: FileNode[];
};
export interface CreateProjectResponse {
  result: Project;
  success: boolean;
  message: string;
  error: string | null;
}
export type NewProjectFormValues = {
  title: string;
  subtitle: string;
  topic: string;
  tags: string[];
};

export interface Comment {
  id: number;
  content: string;
  createdById: string;
  postedByName: string;
  currentUserAlreadyLiked: boolean;
  createdAt: string; // ISO 8601 timestamp
  threadId: number;
  replyToId: number | null;
  replies: Comment[]; // nested replies
  numberOfReplies: number;
  likes: number;
}

export interface Thread {
  isResolved: boolean;
  createdById: string | null;
  createdAt: string; // ISO 8601 timestamp
  resolvedAt: string | null; // ISO 8601 timestamp
  resolvedById: string | null;
  comments: Comment[];
  numberOfComments: number;
  numberOfParticipants: number;
  lastComment: Comment;
  threadTime: string; // e.g. "4 days ago"
  id: number;
  title: string;
  description: string;
  projectId: string | null;
  category: string;
}

export type ThreadCategory = "Discussion" | "Question" | "Advice";

export interface CreateThread {
  title: string;
  description: string;
  projectId: number | null;
  category: ThreadCategory;
}

export interface ThreadSummary {
  mostPopularCategories: string[];
  topContributors: string[];
}

export interface FolderChild {
  id: string;
  url: string;
  name: string;
  folder?: boolean;
}
export interface FolderType {
  id: string;
  folder: boolean;
  name: string;
  children: FolderChild[];
}

export interface LikeComment {
  success: boolean;
  message: string;
  error: string | null;
}

export interface PostComment {
  threadId: string;
  content: string;
  replyToId: number | null;
}

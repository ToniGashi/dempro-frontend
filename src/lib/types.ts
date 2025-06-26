export interface Project {
  id: number;
  title: string;
  tags: string[];
  topic: string;
  subtitle: string;
}

export type ThreadCategory = "Discussion" | "Question" | "Advice";

export interface CreateThread {
  title: string;
  description: string;
  projectId: number | null;
  category: ThreadCategory;
}

export interface Thread extends CreateThread {
  isResolved: boolean;
  createdById: string | null;
  comments: string[];
  numberOfComments: number;
  threadTime: string;
  id: number;
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

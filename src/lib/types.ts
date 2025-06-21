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

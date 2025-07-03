export interface Project {
  id: number;
  title: string;
  tags: string[];
  media: FileNode[];
  team: TeamMember[];
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

export type CreateProject = {
  title: string;
  subtitle: string;
  topic: string;
  tags: string[];
};

export type InviteUser = {
  projectId: number;
  email: string;
  role: string; // e.g. "Viewer", "Admin"
};

export interface TeamMember {
  projectId: number;
  projectName: string;
  userEmail: string;
  userName: string;
  teamRole: string;
  invitedAt: string; // ISO timestamp
}

export type DeleteMediaInput = {
  projectId: string;
  mediaId: string;
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

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  signedInWith: string;
  profile: UserProfile;
}

export interface UserProfile {
  fullName: string;
  userCanBeDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  firstName: string;
  lastName: string;
  personalPhone: string;
  workPhone: string;
  email: string;
  note: string;
  isActivated: boolean;
}
export interface LimitedUserProfile {
  fullName: string;
  email: string;
  firstName: string;
  lastName: string;
  isActivated: boolean;
}

export interface AuthContextType {
  user: LimitedUserProfile | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

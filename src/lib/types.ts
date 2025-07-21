export interface Project {
  id: number;
  title: string;
  tags: string[];
  media: FileNode[];
  team: TeamMember[];
  topic: string;
  subtitle: string;
}

export type LicenseType =
  | "CC BY"
  | "CC BY-SA"
  | "CC BY-ND"
  | "CC BY-NC"
  | "CC BY-NC-SA"
  | "CC BY-NC-ND";

export type FileNode = {
  id: string;
  name: string;
  folder: boolean;
  url: string | null;
  children: FileNode[];
  licenseType?: LicenseType;
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
  isFlaggedByCurrentUser: boolean;
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

export interface FlagThread {
  contentId: number;
  contentType: "thread"; // TODO: Update to Thread when backend supports it
  reason: string;
  note?: string;
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
  threadId: number;
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
  location?: string;
  phone?: string;
  website?: string;
  avatarUrl?: string;
  isActivated: boolean;
}

export interface AuthContextType {
  user: LimitedUserProfile | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface FlagedContentResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  result: FlaggedItem[];
  success: boolean;
  message: string;
  error: string | null;
}

interface BaseFlag {
  id: number;
  contentType: "thread" | "comment";
  contentId: number;
  numberOfFlags: number;
  reasons: string[];
  notes: string[];
  content: any;
}

export interface CommentContent {
  id: number;
  content: string;
  createdById: string;
  postedByName: string | null;
  createdAt: string;
  threadId: number;
  replyToId: number | null;
  replies: unknown[];
  numberOfReplies: number;
  likes: number;
  currentUserAlreadyLiked: boolean;
}

/** Full flagged‐comment item */
export interface CommentFlaggedItem extends BaseFlag {
  contentType: "comment";
  content: CommentContent;
}
export interface ThreadContent {
  isResolved: boolean;
  createdById: string;
  createdAt: string; // ISO timestamp
  resolvedAt: string | null;
  resolvedById: string | null;
  comments: unknown[]; // empty array in example
  numberOfComments: number;
  numberOfParticipants: number;
  lastComment: unknown | null;
  threadTime: string; // e.g. "9 days ago"
  isFlaggedByCurrentUser: boolean;
  id: number;
  title: string;
  description: string;
  projectId: number;
  category: string;
}
export interface ThreadFlaggedItem extends BaseFlag {
  contentType: "thread";
  content: ThreadContent;
}

export type FlaggedItem = CommentFlaggedItem | ThreadFlaggedItem;

export interface FlagAction {
  contentId: number;
  contentType: "thread" | "comment";
}

export enum UserRole {
  ADMIN = "Administrator",
  REVIEWER = "Reviewer",
  CONTRIBUTOR = "Contributor",
  USER = "User",
}

export type RolePermissions = {
  canViewAllProjects: boolean;
  canCreateProjects: boolean;
  canResolveThread: boolean;
};

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  [UserRole.ADMIN]: {
    canViewAllProjects: true,
    canCreateProjects: true,
    canResolveThread: true,
  },
  [UserRole.REVIEWER]: {
    canViewAllProjects: true,
    canCreateProjects: true,
    canResolveThread: true,
  },
  [UserRole.CONTRIBUTOR]: {
    canViewAllProjects: true,
    canCreateProjects: true,
    canResolveThread: false,
  },
  [UserRole.USER]: {
    canViewAllProjects: false,
    canCreateProjects: false,
    canResolveThread: false,
  },
};

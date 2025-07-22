import { UserProfile } from "@/lib/types";
import { UserRole, ROLE_PERMISSIONS, RolePermissions } from "./roles";

export function getUserRole(user: UserProfile | null): UserRole {
  if (!user) return UserRole.USER;
  return (user.role as UserRole) || UserRole.USER;
}

export function hasRole(
  user: UserProfile | null,
  requiredRole: UserRole
): boolean {
  const userRole = getUserRole(user);
  const roleHierarchy = [
    UserRole.ADMIN,
    UserRole.REVIEWER,
    UserRole.CONTRIBUTOR,
    UserRole.USER,
  ];

  const userRoleIndex = roleHierarchy.indexOf(userRole);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

  return userRoleIndex >= requiredRoleIndex;
}

export function hasRoles(
  user: UserProfile | null,
  requiredRoles: UserRole[]
): boolean {
  const userRole = getUserRole(user);
  return requiredRoles.includes(userRole);
}

export function hasPermission(
  user: UserProfile | null,
  permission: keyof RolePermissions
): boolean {
  const userRole = getUserRole(user);
  return ROLE_PERMISSIONS[userRole][permission];
}

export function getUserPermissions(user: UserProfile | null): RolePermissions {
  const userRole = getUserRole(user);
  return ROLE_PERMISSIONS[userRole];
}

// Server-side role checking
export async function requireRole(
  user: UserProfile | null,
  requiredRole: UserRole
): Promise<boolean> {
  return hasRole(user, requiredRole);
}

export async function requirePermission(
  user: UserProfile | null,
  permission: keyof RolePermissions
): Promise<boolean> {
  return hasPermission(user, permission);
}

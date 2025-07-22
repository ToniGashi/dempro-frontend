"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserRole, RolePermissions } from "@/lib/roles";
import {
  hasRole,
  hasRoles,
  hasPermission,
  getUserRole,
  getUserPermissions,
} from "@/lib/role-utils";

export function useRoles() {
  const { user } = useAuth();

  return {
    user,
    userRole: getUserRole(user),
    permissions: getUserPermissions(user),
    hasRole: (role: UserRole) => hasRole(user, role),
    hasRoles: (roles: UserRole[]) => hasRoles(user, roles),
    hasPermission: (permission: keyof RolePermissions) =>
      hasPermission(user, permission),
    isAdmin: hasRole(user, UserRole.ADMIN),
    isReviewer: hasRole(user, UserRole.REVIEWER),
    isContributor: hasRole(user, UserRole.CONTRIBUTOR),
    isUser: getUserRole(user) === UserRole.USER,
  };
}

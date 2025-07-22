import { ReactNode } from "react";
import { getServerUser } from "@/lib/api-helpers";

import { UserRole, RolePermissions } from "@/lib/roles";
import { hasRole, hasRoles, hasPermission } from "@/lib/role-utils";

interface ServerRoleGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ServerRequireRoleProps extends ServerRoleGuardProps {
  role: UserRole;
}

interface ServerRequireRolesProps extends ServerRoleGuardProps {
  roles: UserRole[];
  bypass?: boolean;
}

interface ServerRequirePermissionProps extends ServerRoleGuardProps {
  permission: keyof RolePermissions;
  bypass?: boolean;
}

export async function ServerRequireRole({
  children,
  role,
  fallback = null,
}: ServerRequireRoleProps) {
  const { user } = await getServerUser();

  if (!hasRole(user, role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export async function ServerRequireRoles({
  children,
  roles,
  bypass,
  fallback = null,
}: ServerRequireRolesProps) {
  if (bypass) return <>{children}</>;
  const { user } = await getServerUser();

  if (!hasRoles(user, roles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export async function ServerRequirePermission({
  children,
  permission,
  bypass,
  fallback = null,
}: ServerRequirePermissionProps) {
  if (bypass) return <>{children}</>;

  const { user } = await getServerUser();

  if (!hasPermission(user, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

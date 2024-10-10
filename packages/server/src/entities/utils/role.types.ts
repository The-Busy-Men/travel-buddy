export enum UserRoles {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
  super_admin = 'super_admin',
}

// Role hierarchy mapping
export const roleHierarchy = {
  [UserRoles.user]: 1,
  [UserRoles.moderator]: 2,
  [UserRoles.admin]: 3,
  [UserRoles.super_admin]: 4,
};

// Utility function to check if one role is higher than another
export const isRoleHigherOrEqual = (
  userRole: UserRoles,
  requiredRole: UserRoles,
): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

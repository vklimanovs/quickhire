/**
 * Role Management Utilities
 *
 * This file provides utilities for handling user roles and role switching.
 * It's designed to work with both current localStorage approach and future backend role management.
 */

export type UserRole = "freelance" | "client";
export type AccountType = "provider" | "customer";

/**
 * Convert between internal role format and account type format
 */
export const roleToAccountType = (role: UserRole): AccountType => {
  return role === "freelance" ? "provider" : "customer";
};

export const accountTypeToRole = (accountType: AccountType): UserRole => {
  return accountType === "provider" ? "freelance" : "client";
};

/**
 * Check if a user can access a specific role
 */
export const canAccessRole = (
  userRoles: { isFreelance: boolean; isClient: boolean },
  targetRole: UserRole,
): boolean => {
  if (targetRole === "freelance") {
    return userRoles.isFreelance;
  }
  if (targetRole === "client") {
    return userRoles.isClient;
  }
  return false;
};

/**
 * Get available roles for a user
 */
export const getAvailableRoles = (userRoles: {
  isFreelance: boolean;
  isClient: boolean;
}): UserRole[] => {
  const roles: UserRole[] = [];
  if (userRoles.isFreelance) roles.push("freelance");
  if (userRoles.isClient) roles.push("client");
  return roles;
};

/**
 * Check if user has multiple roles (can switch between them)
 */
export const hasMultipleRoles = (userRoles: {
  isFreelance: boolean;
  isClient: boolean;
}): boolean => {
  return userRoles.isFreelance && userRoles.isClient;
};

/**
 * FUTURE: Backend role validation
 *
 * When backend adds role management, these functions will:
 * 1. Call backend APIs to validate role changes
 * 2. Handle role switching cooldowns
 * 3. Manage role permissions and restrictions
 */

export interface BackendRoleInfo {
  hasSelectedRole: boolean;
  selectedRole: UserRole | null;
  availableRoles: UserRole[];
  canSwitchRoles: boolean;
  roleSwitchCooldown: string | null;
}

/**
 * Validate if user can switch to a specific role
 */
export const canSwitchToRole = (
  backendRoleInfo: BackendRoleInfo,
  targetRole: UserRole,
): { canSwitch: boolean; reason?: string } => {
  // Check if role switching is allowed
  if (!backendRoleInfo.canSwitchRoles) {
    return { canSwitch: false, reason: "Role switching is disabled" };
  }

  // Check if target role is available
  if (!backendRoleInfo.availableRoles.includes(targetRole)) {
    return { canSwitch: false, reason: `Role ${targetRole} is not available` };
  }

  // Check if there's a cooldown
  if (backendRoleInfo.roleSwitchCooldown) {
    return {
      canSwitch: false,
      reason: `Role switching cooldown: ${backendRoleInfo.roleSwitchCooldown}`,
    };
  }

  // Check if user already has this role selected
  if (backendRoleInfo.selectedRole === targetRole) {
    return { canSwitch: false, reason: `Already selected as ${targetRole}` };
  }

  return { canSwitch: true };
};

/**
 * Get role display names for UI
 */
export const getRoleDisplayName = (
  role: UserRole,
  language: string = "en",
): string => {
  const displayNames = {
    en: {
      freelance: "Freelancer",
      client: "Client",
    },
    ru: {
      freelance: "Фрилансер",
      client: "Клиент",
    },
    et: {
      freelance: "Vabakutseline",
      client: "Klient",
    },
  };

  return displayNames[language as keyof typeof displayNames]?.[role] || role;
};

/**
 * Get role description for UI
 */
export const getRoleDescription = (
  role: UserRole,
  language: string = "en",
): string => {
  const descriptions = {
    en: {
      freelance: "Find work and manage projects",
      client: "Post tasks and hire freelancers",
    },
    ru: {
      freelance: "Найти работу и управлять проектами",
      client: "Размещать задачи и нанимать фрилансеров",
    },
    et: {
      freelance: "Leia tööd ja halla projekte",
      client: "Lisa ülesandeid ja palka vabakutselisi",
    },
  };

  return descriptions[language as keyof typeof descriptions]?.[role] || "";
};

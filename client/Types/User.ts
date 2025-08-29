// User-related type definitions

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string; // Full name (computed from firstName + lastName)
  accountType: "provider" | "customer";
  roles: {
    isFreelance: boolean;
    isClient: boolean;
  };
  subscription?: {
    status: "active" | "inactive" | "expired";
    plan?: string;
  };
  isEmailVerified: boolean;
  isPasswordSet?: boolean; // Whether user has set a password (missing = false)
  profileImage?: string; // URL to user's profile picture
}

export interface UserProfile {
  photo?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  memberSince?: string;
  rating?: number;
  reviewCount?: number;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: { isClient: boolean; isFreelance: boolean };
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Profile-related type definitions

export interface LanguageSkill {
  code: string; // ISO-639-1 code (en, et, ru, etc.)
  name: string;
  level: string; // e.g., "Native", "Fluent", "Intermediate", "Basic"
}

export interface CustomerProfile {
  photo: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  bio: string;
  languages: LanguageSkill[];
  linkedinUrl: string;
  websiteUrl: string;
  githubUrl: string;
  location: string;
  phoneNumber: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
}

export interface ProviderProfile {
  name: string;
  headline: string;
  bio: string;
  photo: string;
  location: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
  status: "available" | "busy" | "offline" | "inactive";
  availability: any; // Using any to match the Provider type
  skills: string[];
  languageSkills: any[]; // Using `any` for now to match existing code
  languages?: string[]; // Add this missing property
  company?: string;
  phone?: string;
  availableForConsultations: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  primaryCategory?: string;
  secondaryCategories?: string[];
}

export interface EditableProviderForm {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  memberSince?: string;
  // ... other form fields from ProviderDashboard.tsx
}

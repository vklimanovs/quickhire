// client/lib/api-utils.ts

// --- API Contracts vs. TypeScript Types ---

/**
 * Represents the User Data Transfer Object (DTO) received from the backend.
 * This should match the API documentation (e.g., in the README).
 */
export interface UserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  roles: {
    isClient: boolean;
    isFreelance: boolean;
  };
  subscription?: {
    status: "active" | "inactive" | "expired";
    plan?: string;
  };
  // Other fields from API...
  access?: { token: string; expires: string };
  refresh?: { token: string; expires: string };
}

/**
 * The primary, centralized definition for a Provider's profile.
 * All other parts of the app should import and use this type.
 */
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

/**
 * Represents the shape of the form model for editing a provider profile.
 */
export interface EditableProviderForm {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  memberSince?: string;
  // ... other form fields from ProviderDashboard.tsx
}

// --- Mapping: DTO to Form Model ---

/**
 * Maps a User DTO from the backend to the provider profile form model.
 * This ensures a consistent prefill flow.
 * @param dto - The User DTO from the API.
 * @returns An object matching the EditableProviderForm shape.
 */
export const mapUserDtoToProviderForm = (
  dto: UserDto,
): EditableProviderForm => {
  const formModel: EditableProviderForm = {
    // Always pre-fill email (should be read-only in the form)
    email: dto.email,

    // Format and store createdAt as "Member since"
    memberSince: dto.createdAt
      ? new Date(dto.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
        })
      : "",
  };

  // If the user registered with first/last name, pre-fill them.
  if (dto.firstName && dto.lastName) {
    formModel.firstName = dto.firstName;
    formModel.lastName = dto.lastName;
    formModel.company = dto.company || ""; // Company is optional
  }
  // If the user registered with only a company name, pre-fill that.
  else if (dto.company) {
    formModel.company = dto.company;
    formModel.firstName = "";
    formModel.lastName = "";
  }

  return formModel;
};
